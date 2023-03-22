import React, { useState, useEffect } from "react";
import { SideMenu } from '../components/SideMenu.js'
import { Navbar } from '../components/Navbar.js'
import { Footer } from '../components/Footer.js';
import { SideChat } from '../components/SideChat.js';
import { useParams } from "react-router-dom";
import io from "socket.io-client";

import '../styles/raffledetails.css'

function RaffleDetails() {
  const [raffle, setRaffle] = useState(null);
  const { id } = useParams();

  const [raffles_info, setRafflesInfo] = useState([]);

  const socket = io('casino-server.fly.dev/raffles');
  // const socket = io("http://localhost:4000/raffles");

  useEffect(() => {

    socket.emit("raffle-details", { id });

    socket.on("raffle-details", (data) => {
      setRaffle(true);
      setRafflesInfo(data.raffle);
    });

    return () => {
      socket.disconnect();
    }
  }, [id]);

  if (raffle === null) {
    return (
      <div className='App'>
        <title>TID Crash</title>

        <SideMenu />

        <div className='raffle-details-container'>

          <Navbar />

          <div className='raffle-details-content loading'>

            <span class="loader"></span>

          </div>

          <Footer />

        </div>

        <SideChat />

      </div>
    );
  }

  return (
    <div className='App'>
      <title>TID Crash</title>

      <SideMenu />

      <div className='raffle-details-container'>

        <Navbar />

        <div className='raffle-details-content'>

          <div className='raffles-content-title'>

            <h2>Raffles</h2>

          </div>

          <div className='raffles-content-area'>

            <div className='raffle-information'>

              <img src={raffles_info.image} alt='Raffle' />

            </div>

          </div>

        </div>

        <Footer />

      </div>

      <SideChat />

    </div>
  );
}

export default RaffleDetails;
