import React, { useState } from "react";
import { SideMenu } from "../components/SideMenu.js";
import { Navbar } from "../components/Navbar.js";
import { Footer } from "../components/Footer.js";
import { SideChat } from "../components/SideChat.js";
import { toast } from "react-toastify";
import "animate.css";
import "../styles/coinflip.css";

import headsImg from "../images/design/HEADS-CF.png";
import blazeImg from "../images/design/BLAZED-CF.png";
import sol from '../images/design/sol.png'

function Coinflip() {
    const [result, setResult] = useState(null);
    const [isFlipping, setIsFlipping] = useState(false);

    const flipCoin = () => {
        if (isFlipping) return;
        setIsFlipping(true);
        const randomNumber = Math.floor(Math.random() * 2);
        const result = randomNumber === 0 ? "HEADS" : "BLAZED";
        setTimeout(() => {
            setIsFlipping(false);
            setResult(result);
            const coinImage = document.querySelector(".coin-image");
            coinImage.classList.remove("flip");
            coinImage.style.animation = "flip-coin .2s linear infinite";
            setTimeout(() => {
                coinImage.classList.add("flip");
                coinImage.style.animation = "none";
                toast(`Coin side is ${result}`, { type: "info" });
            }, 500);
        }, 500);
    };

    return (
        <div className="App">

            <title>TID Coin Flip</title>

            <SideMenu />

            <div className="coinflip-container">

                <Navbar />

                <div className="coinflip-content">

                    <div className="coinflip-content-area">

                        <div className="coin-display">

                            <img className={isFlipping ? "coin-image rotate" : "coin-image"} src={result === "HEADS" ? headsImg : blazeImg} alt={result === "HEADS" ? "HEADS" : "BLAZED"} />

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

                                <button className="flip-button" onClick={flipCoin} >Flip Coin</button>

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

export default Coinflip;