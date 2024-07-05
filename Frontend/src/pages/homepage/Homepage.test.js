import {render, screen, waitFor} from '@testing-library/react';
import Homepage from './Homepage';
import { getAllProducts } from '../../apis/api';
import productMockData from '../../__mock__/productMockData';

import { BrowserRouter } from 'react-router-dom';

// Mocking the api call api.js
jest.mock('../../apis/api');

// test case
describe(' Testing Homepage', () => {
    // Clearing all mocks before testing
afterEach(() => {
    jest.clearAllMocks();
});

// Test case 1 in res>data>products format (res.data.products)
it('Should display all products in homepage!', async () => {

    //config all 
    // render(<Homepage />);

    // Mock response format
    // const mock_data = {
    //     data: {
    //         'success': true,
    //         "message": "Products Fetched",
    //         'products': [{product1}, {product2}]
    //     }
    // }

    // copy from {getAllProducts} from Network in inspect in frontend web and use like above
        // but in clean architecture dont do thiis use : __mock__ in src
    const mock_data = productMockData;
    getAllProducts.mockResolvedValue({
        data:{
            products : mock_data
        }
    });

    //config all 
    render(<Homepage />);


    // if you want to use BrowserRouter when navigater used
    // render(<BrowserRouter>
    // <Homepage />
    // </BrowserRouter>
    // )

    // configures the mock data
    // await waitFor(() => {
    waitFor(() => {
        // check if the product is displayed
        mock_data.forEach((product) => {
            expect(screen.getByText(product.productName)).toBeInTheDocument();
            expect(screen.getByText(product.productPrice)).toBeInTheDocument();
            expect(screen.getByText(product.productCategory)).toBeInTheDocument();
            
        });
    });

});

})

