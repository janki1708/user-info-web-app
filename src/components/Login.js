import React, { useState, useContext } from "react";
import { AccountContext } from "./Account";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { authenticate } = useContext(AccountContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        authenticate(email, password)
            .then(data => {
                // console.log("Logged in: ", data);
                if (email === process.env.REACT_APP_ADMIN_EMAIL) {
                    navigate('/users')
                }
                else {
                    navigate('/profile');
                }
            })
            .catch(err => {
                console.log("Error ", err);
            });
    }

    return (
        <>
            <div className="login-page">

                {/* <div className="heading">Login Form</div> */}
                <h1>Login Form</h1>
                <div className="form">

                    <form onSubmit={handleSubmit}>
                        <div className="container">

                            <div>
                                <label htmlFor="email"> Email </label>
                                <input type="email" id="email" value={email}
                                    onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password"> Password </label>
                                <input type="password" id="password" value={password}
                                    onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            <button type="submit"> Login </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login;
