import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { testApi, getAllProducts } from "../../apis/api";

const Homepage = () => {
    // // Print Hello! when page loads (Automatically)
    // useEffect(() => {
    //     console.log("HELLLOOOOOOOOOOOOO!!!!!!!!!")

    //     // Trigger testAPI
    //     testApi().then((res) => {
    //         console.log(res)        //Test Api is working
    //     })
    // })


    /// ---  // Product Information from Admin Dashboard copied here -use effect
    // X.1. Use state for all fetched products from backend
    const [products, setProducts] = useState([]) // array[]



    // X.2. Call API initially (Page load) - Set all fetch products to state (X.1.)
    useEffect(() => {

        getAllProducts().then((res) => {

            // response : res.data.products (All Products)
            setProducts(res.data.products)


        }).catch((error) => {
            console.log(error)

        })
    }, []) // [] is dependencies of useEffect ie . useEffect works only when [] is supplied

    return (
        <>
            <div className="container">
                <div id="carouselExampleCaptions" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://static.ffx.io/images/$width_620%2C$height_349/t_crop_fill/q_86%2Cf_auto/6680bb14162def5f90ea71a6864c44dd87e5256b" class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="https://static.dezeen.com/uploads/2024/02/lenovo-thinkbook-transparent-display-laptop-concept-sq_dezeen_2364_hero.jpg" class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="https://www.carscoops.com/wp-content/uploads/2021/05/2018-alfa-romeo-4c-1.jpg" class="d-block w-100" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                <h2 className="mt-2">Available Products</h2>

                <div class="row row-cols-1 row-cols-md-4 g-4">

                    {/* <div class="col">
                    <ProductCard productInformation = {} color={}/> // sending product information
                    </div> */}

{/* // dynamic product card */}
                    {
                        products.map((singleProduct) => (
                            <div class="col">
                                <ProductCard productInformation={singleProduct} color={'red' } /> 
                                {/* // sending product information */}
                            </div>

                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default Homepage; 