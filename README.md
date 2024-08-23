# vtalix-assesment
# Note: replace MONOOSE_URL, JWT_SECRET_KEY in .env file 
 1. install the packages by using this command: npm install
 2. run the application by using this command: npm start
 3. open your postman and use this url http://localhost:8080/ and end-point
 4. generate the with generate-token endpoint and take that token for further reference
 5. for any endpoint to use we need to give that generated token in header with key: x-access-token, value should be token

# without token all secured endpoints will give error saying that token not provided.

 generate token given expiry time 2 mins for testing purpose
# for referece added the screenshots please check
 endpoints are 
 http://localhost:8080/generate-token ==> post method, in body you can give any payload to generate token;
 http://localhost:8080/create-employee ==> payload: 
{
    "username": "test user 3",
    "password": "1234",
    "email": "testuser3@gmail.com",
    "phoneNo": 910000000,
    "address": "hyd"
},
x-acess-token: token
 http://localhost:8080/get-employee ==> to get the employee
 http://localhost:8080/update-employee/id(replace actual id here) ==> to update the employee
 http://localhost:8080/delete ==> to delete the employee
 http://localhost:8080/all-employees ==> to get all employees

 http://localhost:8080/get-employee/id(replace actual id here)