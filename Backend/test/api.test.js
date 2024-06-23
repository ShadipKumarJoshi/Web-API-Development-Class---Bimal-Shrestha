const request = require('supertest') // import by using require - supertest;

// Importing server file
const app = require('../index') // import by using require - index;
const { response } = require('express')

// Test token for Admin
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjkyOTU5ZDMyNmM2ODljYTI4NzQ3MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxOTExNjc3NH0.ZBxUkKPx4z_APyweNGYFJZCi1I1wi_lFWC0C57rIw68'

// describe (List of test cases) shortcut ==> desc
describe('Testing API', () => {

    // testing '/test' api // get test and response witht text // 
    it('GET /test | Response with text', async () => {
        // send request => we get response,// request app makes server active ie api endpoints are active, in get method test is hit
        const response = await request(app).get('/test')

        // if it successful, status code is 200
        expect(response.statusCode).toBe(200)

        // Compare received text
        expect(response.text).toEqual("Test API is working!...")
    });

    // Get all products
    // it('GET Products | Fetch all products', async () => {
    //     const response = await request(app).get('/api/product/get_all_products')

    //     // if it successful, status code is 201
    //     expect(response.statusCode).toBe(201)

    //     expect(response.body).toBeDefined()

    //     // Compare received text
    //     expect(response.body.message).toEqual("Product Fetched Successfully!")
    // })

    // get all product with authorisation
    it('GET Products | Fetch all products', async () => {
        const response = await request(app).get('/api/product/get_all_products').set('authorization', `Bearer ${token}`)

        // if it successful, status code is 201
        expect(response.statusCode).toBe(201)

        expect(response.body).toBeDefined()

        // Compare received text
        expect(response.body.message).toEqual("Product Fetched Successfully!")
    })

    // Registration testing
    // 1. sending request (with data)
    // 2. expect : 201
    // 3. if user already exists : handle accordingly
    // 4. if success registration

    it('POST api/user/create |Response with body', async () => {
        const response = await request(app).post('/api/user/create').send({
            "firstName": "John",
            "lastName": "Shah",
            "email": "John@gmail.com",
            "password": "@John&1"

        })

        // if condition
        if (!response.body.success) {
            expect(response.body.message).toEqual("User Already Exists!")
        } else { expect(response.body.message).toEqual("User created Successfully!") }
    })

    // Login
    // login with "email" : "John@gmail.com",
    // "password": "@John&1"

    // expect: token (length)
    //expect : userData
    // expect: userdata.firstname == John
    // expect : message
    // expect : Incorrect password


    // it('POST /api/user/login | Successful login should return token and user data', async () => {
    //     const response = await request(app).post('/api/user/login').send({
    //         email: 'rashford@gmail.com',
    //         password: 'rashford10',
    //     });

    //     expect(response.status).toBe(200);
    //     expect(response.body.success).toBe(true);
    //     expect(response.body.message).toEqual("User Login Successful");
    //     expect(response.body.token).toBeDefined();
    //     expect(response.body.token.length).toBeGreaterThan(0);
    //     expect(response.body.userData).toBeDefined();
    //     expect(response.body.userData.email).toEqual('rashford@gmail.com');
    //     expect(response.body.userData.firstName).toEqual('Marcus');
    // });

    // it('POST /api/user/login | Incorrect password should return error message', async () => {
    //     const response = await request(app).post('/api/user/login').send({
    //         email: 'rashford@gmail.com',
    //         password: 'wrongpassword',
    //     });

    //     expect(response.status).toBe(200);
    //     expect(response.body.success).toBe(false);
    //     expect(response.body.message).toEqual(" {Password is wrong}!");
    // });

    // it('POST /api/user/login | Non-existent user should return error message', async () => {
    //     const response = await request(app).post('/api/user/login').send({
    //         email: 'nonexistent@gmail.com',
    //         password: 'somepassword',
    //     });

    //     expect(response.status).toBe(200);
    //     expect(response.body.success).toBe(false);
    //     expect(response.body.message).toEqual(" User doesn't exist!");
    // });


})
