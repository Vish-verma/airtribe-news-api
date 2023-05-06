# airtribe-task-manager

The functionalities supported

1. Register a User
2. Sign in a user
3. Update user Preference
4. Get User Preference
5. Get News

packages to be installed

body-parser cors express axios bcrypt jsonwebtoken

Commands to be run

Installing the packages - <strong>npm install</strong>

Starting the server - <strong>npm start</strong>

The Curls to see the functionalities

1. Register a User : 
<code>curl --location 'http://localhost:3000/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fullName": "Clark",
    "email": "Clark@gotham.com",
    "id": 1,
    "password": "Batman",
    "preferences": "Crime"
}'</code> 
    
2. Sign in a user :  <code>curl --location 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "Clark@gotham.com",
    "password": "Batman"
}'</code> 
3. Update user Preference:  <code>curl --location 'http://localhost:3000/preferences' \
--header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgyNzA0MDE5LCJleHAiOjE2ODI3OTA0MTl9.bn6HICW9h8x5zBPHLyN8oGvq0uKtBmALiDkUvFinNpc' \
--header 'Content-Type: application/json' \
--data '{
    "preferences":"Batman"
}'</code> 
4. Get User Preference :  <code>curl --location 'http://localhost:3000/preferences' \
--header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgyNzA0MDE5LCJleHAiOjE2ODI3OTA0MTl9.bn6HICW9h8x5zBPHLyN8oGvq0uKtBmALiDkUvFinNpc'</code> 
5. Get News :  <code>curl --location 'http://localhost:3000/news' \
--header 'Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgyNzA0MDE5LCJleHAiOjE2ODI3OTA0MTl9.bn6HICW9h8x5zBPHLyN8oGvq0uKtBmALiDkUvFinNpc'</code> 
