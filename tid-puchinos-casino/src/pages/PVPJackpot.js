import React, { useState } from 'react';
import { SideMenu } from '../components/SideMenu.js';
import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { SideChat } from '../components/SideChat.js';
import '../styles/pvpJackpot.css';

import { Wheel } from 'react-custom-roulette';

import { toast } from 'react-toastify';

const data = [
    { option: '0', style: { backgroundColor: '#529EC7', textColor: 'transparent' }, id: "Blue" },
    { option: '1', style: { backgroundColor: '#44CE6B', textColor: 'transparent' }, id: "Green" },
    { option: '1', style: { backgroundColor: '#44CE6B', textColor: 'transparent' }, id: "Green" },
    { option: '1', style: { backgroundColor: '#44CE6B', textColor: 'transparent' }, id: "Green" },
    { option: '1', style: { backgroundColor: '#44CE6B', textColor: 'transparent' }, id: "Green" },
    { option: '1', style: { backgroundColor: '#44CE6B', textColor: 'transparent' }, id: "Green" },
    { option: '2', style: { backgroundColor: '#DD4742', textColor: 'transparent' }, id: "Red" },
    { option: '2', style: { backgroundColor: '#DD4742', textColor: 'transparent' }, id: "Red" },
    { option: '2', style: { backgroundColor: '#DD4742', textColor: 'transparent' }, id: "Red" },
    { option: '2', style: { backgroundColor: '#DD4742', textColor: 'transparent' }, id: "Red" },
    { option: '3', style: { backgroundColor: '#FFCC3F', textColor: 'transparent' }, id: "Yellow" },
    { option: '3', style: { backgroundColor: '#FFCC3F', textColor: 'transparent' }, id: "Yellow" },
    { option: '3', style: { backgroundColor: '#FFCC3F', textColor: 'transparent' }, id: "Yellow" },
    { option: '3', style: { backgroundColor: '#FFCC3F', textColor: 'transparent' }, id: "Yellow" },
    { option: '3', style: { backgroundColor: '#FFCC3F', textColor: 'transparent' }, id: "Yellow" },
    { option: '3', style: { backgroundColor: '#FFCC3F' }, id: "Yellow" },
];

function PVPJackpot() {
    const [mustSpin, setMustSpin] = useState(false);

    const prizeNumber = Math.floor(Math.random() * data.length);

    const handleSpinComplete = () => {
        setMustSpin(true);
    };

    const handleReset = () => {
        setMustSpin(false);
        toast.success(`You won ${data[prizeNumber].id}!`);
    };

    return (
        <div className='App'>
            <title>PVP Jackpot</title>
            <SideMenu />
            <div className='pvp-jackpot-container'>
                <Navbar />
                <div className='jackpot-content'>
                    <div className='wheel-container'>
                        <div className='wheel'>
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={data}
                            backgroundColors={['#3e3e3e', '#df3428']}
                            textColors={['transparent', 'transparent']}
                            onStopSpinning={handleReset}
                            innerRadius={75}
                            radiusLineWidth={0}
                            radiusLineColor={'transparent'}
                            outerBorderColor={'transparent'}
                            fontColor={'transparent'}
                            pointerProps={{
                                className: 'pointer',
                                src: 'https://i.imgur.com/9Z5QY9A.png',
                                alt: 'pointer',
                            }}
                        />
                        </div>
                    </div>
                    <button onClick={handleSpinComplete}>Spin Wheel</button>
                </div>
                <Footer />
            </div>
            <SideChat />
        </div>
    );
}

export default PVPJackpot;
