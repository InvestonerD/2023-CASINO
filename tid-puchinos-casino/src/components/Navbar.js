import React, { useEffect, useState } from 'react';
import "../styles/navbar.css";

import chat from "../images/icons/chat.svg";
import user from "../images/icons/user.svg";
import cross from "../images/icons/cross.svg";
import sol from "../images/design/sol.png";
import deposit from "../images/icons/deposit.svg";
import default_image from "../images/design/default_image.png";
import unverified from "../images/icons/unverified-badge.svg";
import verified from "../images/icons/verified-badge.svg";
import edit from "../images/icons/edit.svg";
import badge from "../images/icons/badge.svg";
import arrow from "../images/icons/arrow.svg";
import back from "../images/icons/back.svg";
import statistics from "../images/icons/statistics.svg";
import raffles from "../images/icons/raffles.svg";
import dragon from "../images/icons/empty-dragon.svg";

import { AuthWrapper } from '../context/AuthContext.js';
import { useWallet } from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css';
import 'animate.css';

import io from "socket.io-client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("timd-puchinos-casino.fly.dev");

socket.on("user-data", (data) => {

    let balance = document.querySelector(".balance");

    balance.innerHTML = parseFloat(data.balance.$numberDecimal).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    let username = document.getElementById("username");
    username.innerHTML = data.username;

});

export const Navbar = () => {

    const { publicKey } = useWallet();

    const [isConnected, setIsConnected] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [isUserOpen, setIsUserOpen] = useState(false);

    const handleChatClick = () => {

        setIsOpen(!isOpen)

        if (isOpen) {
            document.querySelector('.side-chat').classList.toggle('close');
            document.querySelector('.navbar').style.borderRight = '4px solid #0A0A0B';
            document.querySelector('.side-chat').classList.add('animate__fadeInRight');
            document.querySelector('.icon-container').classList.toggle('open');
        } else if (!isOpen) {
            document.querySelector('.side-chat').classList.remove('animate__fadeInRight');
            document.querySelector('.side-chat').classList.toggle('close');
            document.querySelector('.navbar').style.borderRight = 'none';
        }

        if (isOpen && document.querySelector('.side-menu').classList.contains('open')) {
            document.querySelector('.home-container').style.width = 'calc(100% - 620px)';
        } else if (!isOpen && document.querySelector('.side-menu').classList.contains('open')) {
            document.querySelector('.home-container').style.width = 'calc(100% - 260px)';
        } else if (!isOpen && !document.querySelector('.side-menu').classList.contains('open')) {
            document.querySelector('.home-container').style.width = 'calc(100% - 64px)';
        }
    }

    const handleUserClick = () => {
        setIsUserOpen(+!isUserOpen)
    }

    const handleUsernameClick = () => {

        document.querySelector('.user-username-change').classList.toggle('closed');

        document.querySelector('.user-profile-card').classList.toggle('open');

    }

    const handleUsernameClickBack = () => {

        document.querySelector('.user-username-change').classList.toggle('closed');

        document.querySelector('.user-profile-card').classList.toggle('open');

    }

    const changeUsername = () => {

        let username = document.getElementById("username-input").value;

        if (username.length > 0) {

            socket.emit("change-username", { username: username, publicKey: publicKey.toString() });

            const usernamePromise = new Promise((resolve, reject) => {
                socket.on("username-changed", (data) => {
                    if (data === "success") {
                        resolve("Username changed successfully!");

                        setTimeout(() => {

                            window.location.reload();

                        }, 5000);

                    } else if (data === "error") {
                        reject("Username already taken!");
                    }
                });
            });

            toast.promise(usernamePromise, {
                pending: "Changing username...",
                success: "Username changed successfully!",
                error: "Username already taken!",
            });

        } else {

            toast.error("Please enter a username");

        }

    }

    const handleDepositClick = () => {

        document.querySelector('.user-deposit').classList.toggle('closed');

        document.querySelector('.user-profile').classList.toggle('close');

        document.querySelector('.user-profile-card').classList.toggle('open');

    }

    const handleDepositClickBack = () => {

        document.querySelector('.user-deposit').classList.toggle('closed');

        document.querySelector('.user-profile').classList.toggle('close');

        document.querySelector('.user-profile-card').classList.toggle('open');

    }

    useEffect(() => {

        if (publicKey) {
            setIsConnected(true);
            socket.emit("wallet-connected", publicKey.toString());
        } else {
            setIsConnected(false);
        }

    }, [publicKey]);


    return (
        <div className="navbar">
            <div className="left-row">
            </div>

            <div className="right-row">

                <div className={isConnected ? "user-balance connected" : "user-balance"} >

                    <img src={sol} alt="sol" className="sol-logo" />

                    <p className="balance">0.00</p>

                    <div className="deposit-icon" >

                        <img src={deposit} alt="deposit" className="deposit" onClick={handleDepositClick} />

                    </div>

                </div>

                <AuthWrapper />
                <div className={isConnected ? "icon-container connected" : "icon-container"} onClick={handleUserClick}>
                    <img src={user} alt="chat-icon" />
                </div>
                <div className={isOpen ? "icon-container open" : "icon-container"} onClick={handleChatClick}>
                    <img src={chat} alt="chat-icon" />
                </div>
            </div>

            <div className={isUserOpen ? "user-profile" : "user-profile close"}>

                <div className="user-profile-card open animate__animated animate__fadeIn">

                    <div className="user-profile-card-header">

                        <div className="user-profile-card-header-left">

                            <h1>Profile</h1>

                        </div>

                        <div className="user-profile-card-header-right">

                            <button onClick={handleUserClick}> <img src={cross} alt="x" /> </button>

                        </div>

                    </div>

                    <div className="user-profile-card-content">

                        <div className="user-data">

                            <div className="image">

                                <img src={default_image} alt="user" />

                                <img src={unverified} alt="unverified" className="unverified" />

                            </div>

                            <div className="information">

                                <h1 id='username'>Username</h1>

                                <img src={edit} alt="edit" className="edit" onClick={handleUsernameClick} />

                            </div>

                        </div>

                        <div className="user-badges">

                            <div className="badges-header">

                                <div className='left-side'>

                                    <img src={badge} alt="badge" />

                                    <h1>Badges</h1>

                                </div>

                                <div className='right-side'>

                                    <p>Show</p>

                                    <img src={arrow} alt="arrow" />

                                </div>

                            </div>

                        </div>

                        <div className="user-statistics">

                            <div className="statistics-header">

                                <div className='left-side'>

                                    <img src={statistics} alt="badge" />

                                    <h1>Statistics</h1>

                                </div>

                                <div className='right-side'>

                                    <p>Show</p>

                                    <img src={arrow} alt="arrow" />

                                </div>

                            </div>

                            <div className='statistics-content'>

                                <div className="statistics-container">

                                    <h1>Total Wins</h1>

                                    <p>0</p>

                                </div>

                                <div className="statistics-container">

                                    <h1>Total Bets</h1>

                                    <p>0</p>

                                </div>

                                <div className="statistics-container">

                                    <h1>Total Wagered</h1>

                                    <p>0</p>

                                </div>

                            </div>

                        </div>

                        <div className="user-badges">
                        </div>

                        <div className="user-tickets">

                            <div className="tickets-header">

                                <div className='left-side'>

                                    <img src={raffles} alt="tickets" />

                                    <h1>Raffle Tickets</h1>

                                </div>

                                {/* <div className='right-side'>

                                    <p>Show</p>

                                    <img src={arrow} alt="arrow" />

                                </div> */}

                            </div>

                            <div className="tickets-content">

                                <img src={dragon} alt="empty-dragon" />

                                <p>There's nothing here...</p>

                            </div>

                        </div>

                        <div className="user-since">

                            <p id="user-since">Member since 03/14/2023</p>

                        </div>


                    </div>

                </div>

                <div className='user-username-change closed animate__animated animate__fadeIn'>

                    <div className="user-username-card-header">

                        <div className="user-username-card-header-left">

                            <button onClick={handleUsernameClickBack}> <img src={back} alt="x" /> </button>

                        </div>

                        <div className="user-username-card-header-right">

                            <h1>Username</h1>

                        </div>

                    </div>

                    <div className="user-username-card-content">

                        <div className="username-input">

                            <input type="text" placeholder="Enter new username" id='username-input' />

                        </div>

                        <div className="username-button">

                            <button id='change-username' onClick={changeUsername}>Change</button>

                        </div>

                    </div>

                </div>

                <div className='user-deposit closed animate__animated animate__fadeIn'>

                    <div className="user-deposit-card-header">

                        <div className="user-deposit-card-header-left">

                            <h1>Bank</h1>

                        </div>

                        <div className="user-deposit-card-header-right">

                            <button onClick={handleDepositClickBack}> <img src={cross} alt="x" /> </button>

                        </div>

                    </div>

                    <div className="user-deposit-card-content">

                        <div className="deposit-input">

                            <h1>Deposit</h1>

                            <div className='input-container'>

                                <input type="number" placeholder="Enter amount" id='deposit-input' />

                                <button id='deposit-button' >Deposit</button>

                            </div>

                        </div>

                        <div className="extra-promotions">

                            <svg width="120" height="50">

                                <path fill="#1C1D21" fillRule="evenodd" stroke="#6E6E78" strokeWidth="2"
                                    d="M107.21.36a1.076 1.076 0 0 1 .996.664L118.152 25l-9.946 23.976a1.076 1.076 0 0 1-.995.665H1.436A1.074 1.074 0 0 1 .36 48.564V1.436A1.074 1.074 0 0 1 1.436.36Z">
                                </path>

                            </svg>

                            <svg width="120" height="50">

                                <path fill="#1C1D21" fillRule="evenodd" stroke="#6E6E78" strokeWidth="2"
                                    d="M107.812.718 117.997 25l-9.518 23.83-106.129.452a.716.716 0 0 1-.718-.718L10.988 25 1.683 1.703a.716.716 0 0 1 .4-.934l105.73-.05Z">
                                </path>

                            </svg>

                            <svg width="120" height="50">

                                <path fill="#1C1D21" fillRule="evenodd" stroke="#6E6E78" strokeWidth="2"
                                    d="M116.564.36a1.074 1.074 0 0 1 1.077 1.076v47.128a1.074 1.074 0 0 1-1.077 1.077H1.619a1.074 1.074 0 0 1-1.077-1.077L10.327 25 .626 1.853a1.074 1.074 0 0 1 .577-1.41Z">
                                </path>

                            </svg>

                        </div>

                        <div className="withdraw-input">

                            <h1>Withdraw</h1>

                            <div className='input-container'>

                                <input type="number" placeholder="Enter amount" id='withdraw-input' />

                                <button id='withdraw-button' >Withdraw</button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};