import React from 'react';
import { SideMenu } from '../components/SideMenu.js'
import { Navbar } from '../components/Navbar.js'
import { SideChat } from '../components/SideChat.js';
import { Footer } from '../components/Footer.js';
import { BigWins } from '../components/BigWins.js';
import '../styles/global.css'
import '../styles/home.css'




import left_arrow from '../images/icons/left-arrow.svg'
import right_arrow from '../images/icons/right-arrow.svg'

import { toast } from 'react-toastify';

function Home() {

    function moveRight() {
        const announcementsContainer = document.querySelector('.home-content-announcements-content');
        const scrollAmount = announcementsContainer.scrollWidth - announcementsContainer.clientWidth - announcementsContainer.scrollLeft;
        announcementsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });

        document.getElementById('left-arrow').style.filter = 'brightness(0) saturate(100%) invert(96%) sepia(4%) saturate(769%) hue-rotate(323deg) brightness(104%) contrast(86%)';
        document.getElementById('right-arrow').style.filter = 'brightness(0) saturate(100%) invert(48%) sepia(1%) saturate(3109%) hue-rotate(202deg) brightness(91%) contrast(100%)';

        document.getElementById('right-arrow').style.cursor = 'default';
        document.getElementById('left-arrow').style.cursor = 'pointer';

    }

    function moveLeft() {
        const announcementsContainer = document.querySelector('.home-content-announcements-content');
        announcementsContainer.scrollBy({ left: -announcementsContainer.scrollLeft, behavior: 'smooth' });

        document.getElementById('left-arrow').style.filter = 'brightness(0) saturate(100%) invert(48%) sepia(1%) saturate(3109%) hue-rotate(202deg) brightness(91%) contrast(100%)';
        document.getElementById('right-arrow').style.filter = 'brightness(0) saturate(100%) invert(96%) sepia(4%) saturate(769%) hue-rotate(323deg) brightness(104%) contrast(86%)';

        document.getElementById('left-arrow').style.cursor = 'default';
        document.getElementById('right-arrow').style.cursor = 'pointer';
    }


    return (
        <div className='App'>
            <title>TID Home</title>

            <SideMenu />

            <div className='home-container'>
                <Navbar />

                <div className='home-content'>

                    <div className='home-content-announcements'>

                        <div className='home-content-announcements-left-arrow' onClick={moveLeft}>

                            <img src={left_arrow} alt='left arrow' id='left-arrow' />

                        </div>

                        <div className='home-content-announcements-content'>

                            <div className='home-content-announcements-content-module'>
                            </div>

                            <div className='home-content-announcements-content-module'>
                            </div>

                            <div className='home-content-announcements-content-module'>
                            </div>

                            <div className='home-content-announcements-content-module'>
                            </div>

                            <div className='home-content-announcements-content-module'>
                            </div>

                            <div className='home-content-announcements-content-module'>
                            </div>

                            <div className='home-content-announcements-content-module'>
                            </div>

                            <div className='home-content-announcements-content-module'>
                            </div>

                        </div>

                        <div className='home-content-announcements-right-arrow' onClick={moveRight}>

                            <img src={right_arrow} alt='right arrow' id='right-arrow' />

                        </div>

                    </div>

                    <BigWins />

                    <div className='home-content-wheel'>

                    </div>

                </div>

                <Footer />

            </div>

            <SideChat />

        </div>
    );
}

export default Home;