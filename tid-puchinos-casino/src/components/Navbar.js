import React, { useEffect, useState } from 'react';
import "../styles/navbar.css";
import chat from "../images/icons/chat.svg";
import user from "../images/icons/user.svg";
import cross from "../images/icons/cross.svg";
import sol from "../images/design/sol.png";
import deposit from "../images/icons/deposit.svg";
import { AuthWrapper } from '../context/AuthContext.js';
import { useWallet } from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css';
import 'animate.css';

import io from "socket.io-client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {

    const socket = io("http://localhost:4000/");

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

    useEffect(() => {

        if (publicKey) {
            setIsConnected(true);

        } else {
            setIsConnected(false);
        }

    }, [publicKey, socket]);


    return (
        <div className="navbar">
            <div className="left-row">
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>

            <div className="right-row">

                <div className={isConnected ? "user-balance connected" : "user-balance"} >

                    <img src={sol} alt="sol" className="sol-logo" />

                    <p className="balance">0.00</p>

                    <div className="deposit-icon" >

                        <img src={deposit} alt="deposit" className="deposit" />

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

                <div className="user-profile-card">

                    <div className="user-profile-card-header">

                        <div className="user-profile-card-header-left">

                            <h1>Profile</h1>

                        </div>

                        <div className="user-profile-card-header-right">

                            <button onClick={handleUserClick}> <img src={cross} alt="x" /> </button>

                        </div>

                    </div>

                    <div className="user-profile-card-content">
                    </div>

                </div>

            </div>

        </div>
    );
};




