import React, { useState, useEffect } from 'react';
import { SideMenu } from '../components/SideMenu.js';
import { Navbar } from '../components/Navbar.js';
import { Footer } from '../components/Footer.js';
import { SideChat } from '../components/SideChat.js';
import '../styles/pvpJackpot.css';

import sol from '../images/design/sol.png'

import { Wheel } from 'react-custom-roulette';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import { toast } from 'react-toastify';
import io from 'socket.io-client';

// const socket = io('http://localhost:4000/pvp-jackpot');
const socket = io('casino-server.fly.dev/pvp-jackpot');

function PVPJackpot() {

    const { width, height } = useWindowSize()

    const [mustSpin, setMustSpin] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {

        socket.on('connect', () => {
            toast.success('This game is working correctly!');
        });

        socket.on('get-data', (newData) => {
            toast.success('Data received!');

            if (Array.isArray(newData)) {
                setData(prevData => {
                    const totalBets = newData.reduce((total, item) => total + parseFloat(item.betted.$numberDecimal), 0);

                    let extendedData = [];

                    newData.forEach((item, index) => {
                        const betValue = parseFloat(item.betted.$numberDecimal);
                        const percentage = (betValue / totalBets) * 100;
                        const repetitions = Math.round(percentage);

                        for (let i = 0; i < repetitions; i++) {
                            extendedData.push({
                                option: item.option || '',
                                style: {
                                    backgroundColor: item.color || '',
                                    textColor: 'transparent',
                                },
                                bet: item.betted || {},
                            });
                        }

                        if (index < newData.length - 1 && item.color !== newData[index + 1].color) {
                            extendedData.push({
                                option: '',
                                style: {
                                    backgroundColor: '#131315',
                                    textColor: 'transparent',
                                },
                            });
                        }
                    });

                    if (newData.length > 0 && newData[0].color !== newData[newData.length - 1].color) {
                        extendedData.push({
                            option: '',
                            style: {
                                backgroundColor: '#131315',
                                textColor: 'transparent',
                            },
                        });
                    }
                    return [...prevData.slice(1), ...extendedData];
                });
            } else {
                console.error('Received data is not iterable:', newData);
            }
        });

        return () => {
            socket.off('connect');
            socket.off('get-data');
        };

    }, []);

    const [data, setData] = useState([
        { option: '1', style: { backgroundColor: '#0A0A0B', textColor: 'transparent' } },
    ]);

    toast(data);

    const prizeNumber = Math.floor(Math.random() * data.length);

    const handleSpin = () => {
        setMustSpin(true);
    };

    const handleSpinFinished = () => {
        setMustSpin(false);
        setShowConfetti(true);
        toast.success(`You won ${data[prizeNumber].option}!`);
    };

    useEffect(() => {
        if (showConfetti) {
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 4000);
        return () => clearTimeout(timer);
        }
    }, [showConfetti]);

    return (

        <div className='App'>
        
        {showConfetti && <Confetti width={width} height={height} />}
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
                                textColors={['transparent', 'transparent']}
                                onStopSpinning={handleSpinFinished}
                                innerRadius={75}
                                radiusLineWidth={0}
                                radiusLineColor={'transparent'}
                                outerBorderColor={'#0A0A0B'}
                                outerBorderWidth={4}
                                fontColor={'transparent'}
                                pointerProps={{
                                    className: 'pointer',
                                    src: 'https://raw.githubusercontent.com/InvestonerD/2023-CASINO/main/tid-puchinos-casino/src/images/design/wheel-arrow.png',
                                    alt: 'pointer',
                                }}
                                style={{ zIndex: 1 }}
                            />

                        </div>

                        <div className="bet-container">

                            <div className="bet-input-area">

                                <div className="bet-title">

                                    <h1>Amount</h1>

                                </div>

                                <div className="bet-input-amount">

                                    <div className="left-side-inputs">

                                            <img src={sol} alt="sol" />

                                            <input type="number" placeholder="0.00" id="crash-amount" />

                                    </div>

                                    <div className="right-side-inputs">

                                            <button className="mini-button">/2</button>

                                            <button className="mini-button">x2</button>

                                            <button className="mini-button">Max</button>

                                    </div>

                                </div>

                            </div>

                            <div className="bet-button-area">

                                <button className="bet-button" >Make Bet</button>

                            </div>

                        </div>

                    </div>

                    <div className="active-players-container">

                        <div className="title">

                            <span>Active Players</span>

                        </div>

                        <div className="content">
                        </div>

                    </div>

                    <button onClick={handleSpin} className="spin-button">Spin</button>

                </div>

                <Footer />

            </div>

            <SideChat />

        </div>

    );

}

export default PVPJackpot;
