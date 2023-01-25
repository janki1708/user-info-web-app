import React, { useState } from "react";
import UserPool from "../UserPool";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        UserPool.signUp(email, password, [], null, (err, data) => {
            if (err) console.log(err);
            else console.log(data);
        });
    };

    return (
        <>
            <div className="signup-page">
                {/* <div className="heading">SignUp Form</div> */}
                <h1>SignUp Form</h1>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="container">

                            <div>
                                <label htmlFor="email2"> Email </label>
                                <input
                                    type="email"
                                    id="email2"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password2"> Password </label>
                                <input
                                    type="password"
                                    id="password2"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <button type="submit"> Sign Up </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
