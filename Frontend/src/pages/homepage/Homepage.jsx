import React, {useEffect} from "react";
import Navbar from "../../components/Navbar";
import { testApi } from "../../apis/api";

const Homepage = () => {
    // Print Hello! when page loads (Automatically)
    useEffect(() => {
        console.log("HELLLOOOOOOOOOOOOO!!!!!!!!!")

        // Trigger testAPI
        testApi().then((res) => {
            console.log(res)        //Test Api is working
        })
    })

    return (
        <div>
           
           Homepage!!!!!!

        </div>
    )
}

export default Homepage; 