import React, { useState, useEffect } from "react";
import Pool from "../UserPool";
import { useNavigate } from "react-router-dom";
import UploadImage from "./UploadImage";
import axios from "axios";

const Profile = () => {
    const [authenticated, setAuthenticated] = useState(null);
    const [name, setName] = useState(null);
    const [height, setHeight] = useState(null);
    const [gender, setGender] = useState(null);
    const [dob, setDob] = useState(null);
    const [userid, setUserid] = useState(null);

    const navigate = useNavigate();

    const user = Pool.getCurrentUser();

    useEffect(() => {
        setAuthenticated(user);
        const userid = Pool.getCurrentUser().getUsername();
        setUserid(userid);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userid = Pool.getCurrentUser().getUsername();
        setUserid(userid);

        // console.log(name);
        axios.post(process.env.REACT_APP_POST_URL,
            {
                UserId: userid,
                Name: name,
                Gender: gender,
                Height: height,
                DOB: dob,
                Operation: "post data",
            }
        ).then(() => {
            alert("Success");
        }).catch(() => {
            alert("Failure");
        });
    };

    const logout = () => {
        if (user) {
            user.signOut();
            navigate("/");
            window.localStorage.clear();
        }
    };

    if (authenticated) {
        return (
            <div>
                <h1>Set Profile Page</h1>
                <div>
                    <h3>Set your profile details</h3>

                    <div>
                        <label htmlFor="photo"> Profile Photo: </label>
                        <UploadImage />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name"> Name: </label>
                            <input
                                type="text"
                                id="name"
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="height"> Height (in cm): </label>
                            <input
                                type="number"
                                id="height" max="300" min="20"
                                onChange={(event) =>
                                    setHeight(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="gender"> Gender: </label>
                            <input
                                type="radio"
                                value="male"
                                id="male"
                                name="gender"
                                onChange={(event) =>
                                    setGender(event.target.value)
                                }
                                required
                            />
                            <label htmlFor="male"> Male </label>
                            <input
                                type="radio"
                                id="female"
                                value="female"
                                name="gender"
                                onChange={(event) =>
                                    setGender(event.target.value)
                                }
                            />
                            <label htmlFor="female"> Female </label>
                            <input
                                type="radio"
                                id="other"
                                value="other"
                                name="gender"
                                onChange={(event) =>
                                    setGender(event.target.value)
                                }
                            />
                            <label htmlFor="other"> Other </label>
                        </div>
                        <div>
                            <label htmlFor="date"> Date of birth: </label>
                            <input
                                type="date"
                                onChange={(event) => setDob(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div>
                    <button onClick={logout}> Logout </button>
                </div>
            </div>
        );
    }
};

export default Profile;
