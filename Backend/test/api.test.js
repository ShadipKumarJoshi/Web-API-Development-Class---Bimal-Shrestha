const request = require('supertest') // import by using require - supertest;

// Importing server file
const app = require('../index') // import by using require - index;
const { response } = require('express')

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
    it('GET Products | Fetch all products', async () => {
        const response = await request(app).get('/api/product/get_all_products')

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



})
