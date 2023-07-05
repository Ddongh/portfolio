import React, { useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import Axios from 'axios';

function LandingPage() {
    debugger;

    useEffect(() => {
        Axios.get('/api/landing')
        .then(response => {
        console.log(response.data);
         })
        .catch(error => {
            console.error('Error fetching data:', error);
        });    
    }, []);



    

    return (
        <>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
            </div>
            <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div>
        </>
    )
}

export default LandingPage
