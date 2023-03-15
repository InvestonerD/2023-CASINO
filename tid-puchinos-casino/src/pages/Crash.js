import React, { useEffect, useRef, useState } from "react";
import { SideMenu } from '../components/SideMenu.js'
import { Navbar } from '../components/Navbar.js'
import { Footer } from '../components/Footer.js';
import { SideChat } from '../components/SideChat.js';
import '../styles/crash.css'
import 'animate.css'

import green_circle from '../images/icons/green-circle.svg'
import ImTimToo from '../images/design/ImTimToo.png'
import blazed from '../images/design/blazed.png'

import io from 'socket.io-client';

function Crash() {

    const socket = io('http://localhost:4000/crash');

    const [ totalBets, setTotalBets ] = useState(0);

    const crashBetsRef = useRef(null);

    const handleMouseOver = (e) => {
        const crashBets = crashBetsRef.current;
        const containerRect = crashBets.getBoundingClientRect();
        const mouseY = e.clientY - containerRect.top;
        const containerHeight = containerRect.bottom - containerRect.top;
        const scrollHeight = crashBets.scrollHeight - containerHeight;

        const scrollAmount = (mouseY / containerHeight) * scrollHeight;
        crashBets.scrollTop = scrollAmount;

        crashBets.addEventListener('mouseleave', () => {
            crashBets.scrollTop = 0;
        })

        crashBets.style.scrollBehavior = 'smooth';
    }

    // useEffect(() => {

    //     setTimeout(() => {

    //         const totalBets = document.querySelectorAll('.user-bet');
    //         let totalBetAmount = 0;

    //         totalBets.forEach((bet) => {
    //             const betAmount = bet.innerHTML.replace('$', '').replace(/,/g, '');
    //             totalBetAmount += parseFloat(betAmount);
    //         });

    //         const totalBetAmountShow = document.querySelector('.user-bet-amount-total');

    //         totalBetAmountShow.innerHTML = totalBetAmount.toLocaleString('en-US', {
    //             style: 'currency',
    //             currency: 'USD',
    //         });

    //         setTotalBets(totalBetAmount);

    //     }, 1000);

    // }, []);

    socket.on('update-counter', (data) => {

        let output = document.getElementById('random-output');
        let border = document.querySelector('.left-side-content-random-number');
        let total_bets_container = document.querySelector('.user-bet-amount-total');

        total_bets_container.innerHTML = parseInt(totalBets * output.innerHTML).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            });

        output.innerHTML = parseFloat(data.counter).toFixed(2);
        output.style.fontSize = '100px';
        border.style.border = '4px solid #0A0A0B';
        output.style.color = '#EDEAE5';

        if (data.counter >= 2.00) {
            output.style.animationIterationCount = 'infinite';
            border.style.border = '4px solid #44CE6B';
        }

        if (data.counter >= 10.00) {
            border.style.border = '4px solid #4F44CE';
        }

        if (data.counter >= 50.00) {
            border.style.border = '4px solid #FFCC3F';
        }

    });

    socket.on('crashed', (data) => {
        let output = document.getElementById('random-output');
        let border = document.querySelector('.left-side-content-random-number');
        output.innerHTML = "CRASHED AT " + parseFloat(data.randomNumber).toFixed(2) + "x";
        output.style.fontSize = '64px';

        // setTotalBets(0);

        output.style.animationIterationCount = 'unset';
        border.style.border = '4px solid #DD4742';
        output.style.color = '#DD4742';
    });

    socket.on('countdown', (data) => {
        let countdown = document.getElementById('countdown');
        countdown.style.display = 'flex';
        countdown.innerHTML = 'Game starting in ' + data.countdown;

        if (data.countdown <= 1) {
            countdown.style.display = 'none';
        }
    });

    socket.on('round', (data) => {

        let parent_container = document.querySelector('.recent-crashes');

        data.crashes.forEach((crash) => {
            let recent_crash = document.createElement('div');
            recent_crash.classList.add('crash');
            recent_crash.classList.add('animate__animated', 'animate__fadeInLeft');
            // create a p element
            let crash_number = document.createElement('p');
            crash_number.innerHTML = crash.number;
            recent_crash.appendChild(crash_number);
            parent_container.appendChild(recent_crash);

            if (parent_container.childElementCount > 9) {
                parent_container.removeChild(parent_container.firstChild);
            }

            if (crash.number < 2.00) {
                crash_number.style.color = '#DD4742';
            }

            if (crash.number >= 2.00) {
                crash_number.style.color = '#44CE6B';
            }

            if (crash.number >= 10.00) {
                crash_number.style.color = '#4F44CE';
            }

            if (crash.number >= 50.00) {
                crash_number.style.color = '#FFCC3F';
            }

        }
        );
    });

    socket.on('active-bets', (data) => {
        // console.log(data);
    });

    return (
        <div className='App'>
            <title>TID Crash</title>

            <SideMenu />

            <div className='crash-container'>
                <Navbar />

                <div className='crash-content'>

                    <div className='crash-content-area'>

                        <div className='left-side'>

                            <div className='left-side-content'>

                                <div className='left-side-content-information'>

                                    <div className='bankroll'>

                                        <h3>Bankroll</h3>

                                        <p>$284,176,093</p>

                                    </div>

                                    <div className='recent-crashes'>

                                        <div className='crash animate__animated animate__fadeInLeft'>

                                            <p>0.00x</p>

                                        </div>

                                        <div className='crash animate__animated animate__fadeInLeft'>

                                            <p>0.00x</p>

                                        </div>

                                        <div className='crash animate__animated animate__fadeInLeft'>

                                            <p>0.00x</p>

                                        </div>

                                        <div className='crash animate__animated animate__fadeInLeft'>

                                            <p>0.00x</p>

                                        </div>

                                        <div className='crash animate__animated animate__fadeInLeft'>

                                            <p>0.00x</p>

                                        </div>

                                        <div className='crash animate__animated animate__fadeInLeft'>

                                            <p>0.00x</p>

                                        </div>

                                        <div className='crash animate__animated animate__fadeInLeft'>

                                            <p>0.00x</p>

                                        </div>

                                        <div className='crash animate__animated animate__fadeInLeft'>

                                            <p>0.00x</p>

                                        </div>

                                        <div className='crash animate__animated animate__fadeInLeft'>

                                            <p>0.00x</p>

                                        </div>

                                    </div>

                                </div>

                                <div className='left-side-content-random-number'>

                                    <p id="random-output">0.00</p>

                                    <p id="countdown"></p>

                                </div>

                            </div>

                        </div>

                        <div className='right-side'>

                            <div className='right-side-content'>

                                <div className='information'>

                                    <div className='information-players'>

                                        <div className='information-players-amount'>

                                            <img src={green_circle} alt='green_circle' />

                                            <div className="active-players">

                                                <p>0 / 0</p>

                                                <h1> Players</h1>

                                            </div>

                                        </div>

                                        <div className='information-players-total-bet-size'>

                                            <p className="user-bet-amount-total animate__animated animate__fadeIn">$0</p>

                                        </div>

                                    </div>

                                    <div className='information-descriptions'>

                                        <div className="player">

                                            <p>Player</p>

                                        </div>

                                        <div className="cash-out">

                                            <p>Cash Out</p>

                                        </div>

                                        <div className="amount">

                                            <p>Amount</p>

                                        </div>

                                        <div className="profit">

                                            <p>Profit</p>

                                        </div>

                                    </div>

                                </div>

                                <div className="crash-bets" ref={crashBetsRef} onMouseOver={handleMouseOver}>

                                    <div className='bet animate__animated animate__fadeInDown'>

                                        <div className='player-info'>

                                            <img src={ImTimToo} alt="logo" />

                                            <p>ImTimToo</p>

                                        </div>

                                        <div className='cash-out-info'>

                                            <p>betting</p>

                                        </div>

                                        <div className='amount-info'>

                                            <img src={blazed} alt="blazed" />

                                            <p className="user-bet">$13,279.06</p>

                                        </div>

                                        <div className='profit-info'>

                                            <p>0.00%</p>

                                        </div>

                                    </div>

                                    <div className='bet animate__animated animate__fadeInDown'>

                                        <div className='player-info'>

                                            <img src={ImTimToo} alt="logo" />

                                            <p>ImTimToo</p>

                                        </div>

                                        <div className='cash-out-info'>

                                            <p>betting</p>

                                        </div>

                                        <div className='amount-info'>

                                            <img src={blazed} alt="blazed" />

                                            <p className="user-bet">$13,279.06</p>

                                        </div>

                                        <div className='profit-info'>

                                            <p>0.00%</p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <Footer />

            </div>

            <SideChat />

        </div>
    );

}

export default Crash;