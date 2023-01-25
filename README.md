# User Information Web App

Description:
- Users can SignIn / SignUp to the application. 
- Users can upload their profile image and set other personal details.
- Users can view their own Profile information on successful Login.
- Admin user can view all users Profile information on successful Login.

Tech Stack:
- Frontend - React
- Backend - AWS (S3, Lambda, API Gateway, DynamoDB)

To clone the repo
> git clone https://github.com/janki1708/user-info-web-app

To install the dependencies
> npm install

Add .env file in the root folder containing all personal AWS credentials like Access key, Secret Access key, etc. with naming convention starting with REACT_APP_ (ex: REACT_APP_ACCESS_KEY)

To run on localhost 
> npm start
