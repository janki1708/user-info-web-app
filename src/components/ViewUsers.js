import React, { useState, useEffect } from "react";
import Pool from "../UserPool";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewUsers = () => {
    const [info, setInfo] = useState([]);
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    const user = Pool.getCurrentUser();
    const userid = user.getUsername();

    const fetchData = async () => {
        const response = await axios.post(process.env.REACT_APP_POST_URL,
            {
                Operation: "get all data",
            }
        );
        setInfo(await response.data);
    };

    useEffect(() => {
        fetchData();

        if (userid === process.env.REACT_APP_ADMIN_USERNAME)
            setAdmin(true);
    }, []);

    const logout = () => {
        if (user) {
            user.signOut();
            navigate("/");
            window.localStorage.clear();
        }
    };

    return (
        <div>
            {info.length === 0 || admin === false ? (
                <div>
                    <div>
                        {admin === false ? (
                            <div>Unauthenticated User</div>
                        ) : (
                            <div>loading...</div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <h1>ViewUsers</h1>
                    <table>
                        <thead>
                            <tr>
                                <th> Username </th>
                                <th> Name </th>
                                <th> Gender </th>
                                <th> DOB </th>
                                <th> Height </th>
                            </tr>
                        </thead>
                        <tbody>
                            {info.map((ele, i) => {
                                return (
                                    <tr key={i}>
                                        <td> {ele.UserId}</td>
                                        <td> {ele.Name}</td>
                                        <td> {ele.Gender}</td>
                                        <td> {ele.DOB}</td>
                                        <td> {ele.Height}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={logout}> Logout </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewUsers;
