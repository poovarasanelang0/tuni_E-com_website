import React, { useState, useEffect } from 'react';

const SaleTimeRunning = () => {
    const [countDown, setCountDown] = useState(''); 

    useEffect(() => {
        
        const countDownDate = new Date("May 10, 2024 15:37:25").getTime();

        
        const intervalId = setInterval(() => {
           
            const now = new Date().getTime();

           
            const distance = countDownDate - now;

           
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            
            setCountDown(`${days}D ${hours}H ${minutes}M ${seconds}S`);
        }, 1000);

        
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <p
                id="demo"
                className='rounded-4 w-75 mx-5  text-center py-1'
                style={{
                    color: '#2A27E9',
                    
                }}
            >
                {countDown}
            </p>
        </>
    );
};

export default SaleTimeRunning;
