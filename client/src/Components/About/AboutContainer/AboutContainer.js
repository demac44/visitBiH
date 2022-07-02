import React, { useContext } from 'react'
import "./style.css"
import appLogo from "../../../Assets/Images/icon-pin-rounded.png"
import googlePlayBtn from "../../../Assets/Images/gp.png"

import { LangContext } from "../../../index"
import axios from 'axios'

const AboutContainer = () => {

  const lang = useContext(LangContext)


  const sendMessage = (e) => {
    e.preventDefault()

    const message = e.target.message.value

    if(message.trim() === ""){
      return;
    }

    axios({
      method: "POST",
      url: "/api/message/new",
      data: {
        msg: message
      }
    }).then(() => window.location.reload())
  }

  return (
    <div className='about-container'>
        <div className='flag-overlay'></div>
          {lang === "english" ?
            <div className='about-box'>
                {/* <h2 style={{textAlign: "center"}}>Download the app</h2>
                <a href="#" className='download-app-box'>
                  <span>
                    <img src={appLogo} alt=""/>
                    <h4>Visit BiH</h4>
                  </span>
                  <img src={googlePlayBtn} className="gp-logo" alt=""/>
                </a> */}
                <h2>About</h2>
                <p style={{textAlign: "justify"}}>This website is made to introduce the beautiful country of Bosnia and Herzegovina, it's breathtaking and diverse nature, rich history and kind and welcoming people. 
                    Bosnia and Herzegovina is not being promoted enough and is often being misrepresented, so I hope this website will make a difference in representing it in a way it should be.
                </p>
                <h2>Contact</h2>
                <p><i className='fas fa-envelope'></i> bihexplore@gmail.com</p>
                <p>Send a message or make a suggestion</p>
                <form onSubmit={sendMessage}>
                  <textarea placeholder='Message' className='message-input' name="message" id='message'></textarea>
                  <button type='submit' className='msg-btn'>SEND</button>
                </form>
            </div>
            :
            <div className='about-box'>
              <h2>O STRANICI</h2>
              <p>Ova web stranica je napravljena da predstavi prelijepu zemlju Bosnu i Hercegovinu, njenu prekrasnu i raznoliku prirodu, bogatu historiju i ljubazne i gostoljubive ljude.
                    Bosna i Hercegovina je nedovoljno ispromovirana i često se predstavlja na pogrešan način, pa se nadam da će ova stranica napraviti promjenu u tome da se predstavlja i promoviše na način na koji bi trebala biti.
              </p>
              <h3>KONTAKT</h3>
              <p><i className='fas fa-envelope'></i> bihexplore@gmail.com</p>
              <p>Pošalji poruku</p>
                <form onSubmit={sendMessage}>
                  <textarea placeholder='Poruka' className='message-input' name="message" id='message'></textarea>
                  <button type='submit' className='msg-btn'>POŠALJI</button>
                </form>
            </div>}
    </div>
  )
}

export default AboutContainer