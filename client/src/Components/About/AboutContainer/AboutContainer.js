import React from 'react'
import "./style.css"
import bckg from "../../../Assets/Images/about-bckg.jpg"


const AboutContainer = () => {
  return (
    <div className='about-container'>
        <img src={bckg} alt="" className='about-flag-img'/>
        <div className='flag-overlay'>
            <div className='about-box'>
                <h2>ABOUT</h2>
                <p>This website is made to introduce the beautiful country of Bosnia and Herzegovina, it's breathtaking and diverse nature, rich history and kind and welcoming people. 
                    Bosnia and Herzegovina is not being promoted enough and is often being misrepresented, so I hope this website will make a difference in representing it in a way it should be.
                </p>
                <h3>CONTACT</h3>
                <p><i className='fas fa-envelope'></i> bihexplore@gmail.com</p>
            </div>
        </div>
    </div>
  )
}

export default AboutContainer