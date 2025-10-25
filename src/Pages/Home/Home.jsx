import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import hero from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play from '../../assets/play_icon.png'
import info from '../../assets/info_icon.png'
import TitleCards from '../../Components/TitleCards/TitleCards.jsx'
import Footer from '../../Components/Footer/Footer.jsx'

const Home = () => {
  return (
    <div className='Home'>
      <Navbar />
      <div className="hero">
        <img src={hero} alt="" className='banner-img'/>
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img'/>
          <p >Discovering his ties to a secret ancient order, a young 
            man living in modern Istanbul embarks on a quest to save the
             city from an immortal enemy</p>
             <div className="hero-btns">
              <button className='btn'><img src={play} alt="" />Play</button>
              <button className='btn dark' ><img src={info} alt="" />More Info</button>
             </div>
             <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
      <TitleCards title={'Blockbuster Movies'}/>
      <TitleCards title={'Only on Netflix'}/>
      <TitleCards title={'Upcoming'} />
      <TitleCards title={'Top Pics for You'} />
      </div>
      <Footer/>
    </div>
  )
}

export default Home
