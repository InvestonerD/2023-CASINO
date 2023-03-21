import React, { useState, useEffect } from "react";
import { SideMenu } from '../components/SideMenu.js'
import { Navbar } from '../components/Navbar.js'
import { Footer } from '../components/Footer.js';
import { SideChat } from '../components/SideChat.js';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

import { toast } from 'react-toastify';
import '../styles/raffles.css'



const prizes = [
  {
    "id": "02",
    "image": "https://i.ibb.co/ZLHZgKf/good-0.png",
    "text": "0.2 x"
  },
  {
    "id": "00",
    "image": "https://i.ibb.co/6Z6Xm9d/good-1.png",
    "text": "0 x"
  },
  {
    "id": "05",
    "image": "https://i.ibb.co/T1M05LR/good-2.png",
    "text": "0.5 x"
  },
  {
    "id": "02",
    "image": "https://i.ibb.co/ZLHZgKf/good-0.png",
    "text": "0.2 x"
  },
  {
    "id": "00",
    "image": "https://i.ibb.co/6Z6Xm9d/good-1.png",
    "text": "0 x"
  },
  {
    "id": "05",
    "image": "https://i.ibb.co/T1M05LR/good-2.png",
    "text": "0.5 x"
  },
  {
    "id": "02",
    "image": "https://i.ibb.co/ZLHZgKf/good-0.png",
    "text": "0.2 x"
  },
  {
    "id": "00",
    "image": "https://i.ibb.co/6Z6Xm9d/good-1.png",
    "text": "0 x"
  },
  {
    "id": "05",
    "image": "https://i.ibb.co/T1M05LR/good-2.png",
    "text": "0.5 x"
  },
  {
    "id": "02",
    "image": "https://i.ibb.co/ZLHZgKf/good-0.png",
    "text": "0.2 x"
  },
  {
    "id": "00",
    "image": "https://i.ibb.co/6Z6Xm9d/good-1.png",
    "text": "0 x"
  },
  {
    "id": "05",
    "image": "https://i.ibb.co/T1M05LR/good-2.png",
    "text": "0.5 x"
  },
  {
    "id": "02",
    "image": "https://i.ibb.co/ZLHZgKf/good-0.png",
    "text": "0.2 x"
  },
  {
    "id": "00",
    "image": "https://i.ibb.co/6Z6Xm9d/good-1.png",
    "text": "0 x"
  },
  {
    "id": "05",
    "image": "https://i.ibb.co/T1M05LR/good-2.png",
    "text": "0.5 x"
  },
  {
    "id": "02",
    "image": "https://i.ibb.co/ZLHZgKf/good-0.png",
    "text": "0.2 x"
  },
  {
    "id": "00",
    "image": "https://i.ibb.co/6Z6Xm9d/good-1.png",
    "text": "0 x"
  },
  {
    "id": "05",
    "image": "https://i.ibb.co/T1M05LR/good-2.png",
    "text": "0.5 x"
  },
  {
    "id": "02",
    "image": "https://i.ibb.co/ZLHZgKf/good-0.png",
    "text": "0.2 x"
  },
  {
    "id": "00",
    "image": "https://i.ibb.co/6Z6Xm9d/good-1.png",
    "text": "0 x"
  },
  {
    "id": "05",
    "image": "https://i.ibb.co/T1M05LR/good-2.png",
    "text": "0.5 x"
  },
  {
    "id": "02",
    "image": "https://i.ibb.co/ZLHZgKf/good-0.png",
    "text": "0.2 x"
  },
  {
    "id": "00",
    "image": "https://i.ibb.co/6Z6Xm9d/good-1.png",
    "text": "0 x"
  },
  {
    "id": "05",
    "image": "https://i.ibb.co/T1M05LR/good-2.png",
    "text": "0.5 x"
  },
  {
    "id": "02",
    "image": "https://i.ibb.co/ZLHZgKf/good-0.png",
    "text": "0.2 x"
  },
  {
    "id": "00",
    "image": "https://i.ibb.co/6Z6Xm9d/good-1.png",
    "text": "0 x"
  },
  {
    "id": "05",
    "image": "https://i.ibb.co/T1M05LR/good-2.png",
    "text": "0.5 x"
  },
  {
    "id": "02",
    "image": "https://i.ibb.co/ZLHZgKf/good-0.png",
    "text": "0.2 x"
  },
  {
    "id": "00",
    "image": "https://i.ibb.co/6Z6Xm9d/good-1.png",
    "text": "0 x"
  },
  {
    "id": "05",
    "image": "https://i.ibb.co/T1M05LR/good-2.png",
    "text": "0.5 x"
  },
  
];

const winPrizeIndex = 0;

const reproductionArray = (array = [], length = 0) => [
  ...Array(length)
    .fill('_')
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

const reproducedPrizeList = [
  ...prizes,
  ...reproductionArray(prizes, prizes.length * 3),
  ...prizes,
  ...reproductionArray(prizes, prizes.length),
];

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

const prizeList = reproducedPrizeList.map((prize) => ({
  ...prize,
  id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
}));


function Jackpot () {

  const [start, setStart] = useState(false);

  // const prizeIndex = prizes.length * 4 + winPrizeIndex;
  const prizeIndex = Math.floor(Math.random() * prizeList.length);

  const handleStart = () => {
    setStart((prevState) => !prevState);
  };

  const handlePrizeDefined = () => {
    // get the id of the prize
    // console.log(prizeList[prizeIndex].id);
    toast.success('You won ' + prizeList[prizeIndex].text);
  };

  return (
    <div className="App">
      
      <SideMenu />

      <div className="raffles-container">

        <Navbar />

        <div className="raffles-content">

          <RoulettePro
            prizes={prizeList}
            prizeIndex={prizeIndex}
            start={start}
            onPrizeDefined={handlePrizeDefined}
            spinningTime={5}
            onSpinStart={handleStart}
            winPrizeIndex={winPrizeIndex}

            options={{
              stopInCenter: false,
            }}
          />

          <button onClick={handleStart}>Start</button>

        </div>

        <Footer />

      </div>

      <SideChat />
    </div>
  );
}

export default Jackpot;