import React, { useContext } from 'react'
import "./style.css"
import bckg from "../../../Assets/Images/about-bckg.jpg"


import { LangContext } from "../../../index"

const AboutContainer = () => {

  const lang = useContext(LangContext)


  return (
    <div className='about-container'>
        <img src={bckg} alt="" className='about-flag-img'/>
        <div className='flag-overlay'>
          {lang === "english" ?
            <div className='about-box'>
                <h2>ABOUT</h2>
                <p>This website is made to introduce the beautiful country of Bosnia and Herzegovina, it's breathtaking and diverse nature, rich history and kind and welcoming people. 
                    Bosnia and Herzegovina is not being promoted enough and is often being misrepresented, so I hope this website will make a difference in representing it in a way it should be.
                </p>
                <h3>CONTACT</h3>
                <p><i className='fas fa-envelope'></i> bihexplore@gmail.com</p>
            </div>
            :
            <div className='about-box'>
              <h2>O STRANICI</h2>
              <p>Ova web stranica je napravljena da predstavi prelijepu zemlju Bosnu i Hercegovinu, njenu prekrasnu i raznoliku prirodu, bogatu historiju i ljubazne i gostoljubive ljude.
                    Bosna i Hercegovina je nedovoljno ispromovirana i često se predstavlja na pogrešan način, pa se nadam da će ova stranica napraviti promjenu u tome da se predstavlja i promoviše na način na koji bi trebala biti.
              </p>
              <h3>KONTAKT</h3>
              <p><i className='fas fa-envelope'></i> bihexplore@gmail.com</p>
            </div>}
        </div>
    </div>
  )
}

export default AboutContainer