import React, { useState, useEffect } from "react";
import Pool from "../UserPool";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AWS from "aws-sdk";

const ViewProfile = () => {
    const [name, setName] = useState(null);
    const [height, setHeight] = useState(null);
    const [gender, setGender] = useState(null);
    const [dob, setDob] = useState(null);
    // const [userid, setUserid] = useState(null);
    const [url, setUrl] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const userid = Pool.getCurrentUser().getUsername();
        const url = process.env.REACT_APP_POST_URL;

        axios
            .post(url,
                {
                    UserId: userid,
                    Operation: "get data",
                }
            )
            .then((res) => {
                setName(res.data.Item.Name);
                setGender(res.data.Item.Gender);
                setHeight(res.data.Item.Height);
                setDob(res.data.Item.DOB);
            })
            .catch((err) => {
                console.log(err);
            });

        var params = {
            Bucket: process.env.REACT_APP_BUCKET,
            Prefix: userid,
        };
        var s3 = new AWS.S3();
        const bucket_url = process.env.REACT_APP_BUCKET_URL;

        s3.listObjectsV2(params, function (err, data) {
            if (err) console.log(err, err.stack);
            else {
                setUrl(
                    `${bucket_url}${data.Contents[0].Key}`
                );
            }
        });
    }, []);

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
            navigate("/");
            window.localStorage.clear();
        }
    };
    return (
        <div>
            <h1>Profile Page</h1>
            {name ? (
                <>
                    <div>
                        <div>Photo: </div>
                        <img src={url} alt="profile pic" height="150" />
                    </div>
                    <div>
                        <div>Name: {name}</div>
                    </div>
                    <div>
                        <div>Gender: {gender}</div>
                    </div>
                    <div>
                        <div>Height (in cm): {height}</div>
                    </div>
                    <div>
                        <div>Date of birth: {dob}</div>
                    </div>
                </>
            ) : (
                <div>Please set the profile first</div>
            )}
            <div>
                <button onClick={logout}> Logout </button>
            </div>
        </div>
    );
};

export default ViewProfile;
