import React from 'react'
import { useNavigate } from 'react-router-dom'
import Pool from '../UserPool';

const Profile = () => {
    const navigate = useNavigate();
    const user = Pool.getCurrentUser();

    const goToSetProfile = (event) => {
        event.preventDefault();
        navigate('/setProfile');
    };

    const goToViewProfile = (event) => {
        event.preventDefault();
        navigate('/viewProfile');
    };

    const logout = () => {
        if (user) {
            user.signOut();
            navigate('/');
            window.localStorage.clear();
        }
    };

    return (
        <div className="page">
            <div className="btn">
                <button onClick={goToSetProfile}>
                    Set Profile
                </button>
            </div>
            <div>
                <button onClick={goToViewProfile}>
                    View Profile
                </button>
            </div>
            <div>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Profile