import React, { createContext } from 'react'
import Pool from "../UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useNavigate } from 'react-router-dom';

const AccountContext = createContext();

const Account = (props) => {
    const navigate = useNavigate();

    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser();

            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(session);
                    }
                });
            }
            else {
                reject();
            }
        });
    }

    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool,
            });

            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    resolve(data);
                    // console.log("Success: ", data)
                },
                onFailure: (err) => {
                    reject(err);
                    // console.error("Failure: ", err)
                },
                newPasswordRequired: (data) => {
                    console.log("New Password required")
                },
            });
        })

    }

    const logout = () => {
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
            navigate('/');
            window.localStorage.clear();
        }
    }

    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    )
}

export { Account, AccountContext };