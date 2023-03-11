import React, { useState, useEffect } from "react";
import "../styles/sidechat.css";
import "animate.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import emoji from "../images/icons/emoji.svg";
import send from "../images/icons/send.svg";
import rain from "../images/icons/rain.svg";
import command from "../images/icons/command.svg";
import tips from "../images/icons/tips.svg";
import gifs from "../images/icons/gif.svg";

const SideChat = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [buttonDisplay, setButtonDisplay] = useState("none");

    const handleEmojiSelect = (emoji) => {
        const newInputValue = inputValue + emoji.native;
        setInputValue(newInputValue);
        setShowPicker(false);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setInputValue(value);
    };

    useEffect(() => {
        if (inputValue !== "") {
            setButtonDisplay("flex");
        } else {
            setButtonDisplay("none");
        }
    }, [inputValue]);

    const emojiClass = showPicker ? "emoji-active" : "";

    return (

        <div className="side-chat close animate__animated animate__fadeInRight">

            <div className="side-chat-header">

                <div className="side-chat-header-title">

                    <p>Global Chat</p>

                </div>

            </div>

            <div className="side-chat-body">

                {showPicker && <Picker data={data} onEmojiSelect={handleEmojiSelect} />}

            </div>

            <div className="side-chat-footer">

                <div className="side-chat-footer-input-section">

                    <div className="side-chat-footer-input">

                        <input type="text" placeholder="Type a message..." value={inputValue} onChange={handleInputChange}/>

                        <img src={emoji} alt="emoji" onClick={() => setShowPicker(!showPicker)} className={emojiClass}/>

                    </div>

                    <div className="side-chat-footer-button animate__animated animate__fadeInRight" style={{ display: buttonDisplay }}>

                        <button> <img src={send} alt="" /> </button>

                    </div>

                </div>

                <div className="side-chat-footer-extras-section">

                    <div className="side-chat-footer-extras-left-side">

                        <img src={rain} alt="rain"/>

                        <img src={command} alt="/command"/>

                        <img src={tips} alt="tips"/>

                    </div>

                    <div className="side-chat-footer-extras-right-side">

                        <img src={gifs} alt="gifs"/>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default SideChat;
