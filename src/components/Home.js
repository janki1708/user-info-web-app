import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { Account } from './Account';
// import './Home.css';

const Home = () => {

    return (
        <Account>
            <div className="forms">
                <Login />
                <SignUp />
            </div>
        </Account>
    )
}

export default Home