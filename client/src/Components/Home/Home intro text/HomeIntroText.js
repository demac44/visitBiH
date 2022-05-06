import React from 'react'
import "./style.css"
import bckg from "../../../Assets/Images/heart-shaped-land.jpg"
import ScrollDownBtn from '../Helpers/ScrollDownBtn'

const HomeIntroText = () => {
  return (
    <div className='home-intro-text-container'>
        <img src={bckg} className="home-intro-text-bckg"/>
        <div className='overlay'></div>
        <span className='home-intro-text'>
            <h1>The Heart-Shaped Land: Bosnia and Herzegovina</h1>
            <p>Bosnia and Herzegovina lies in the heart of Southeast Europe. It is here that eastern and western civilizations met, sometimes clashed, but more often enriched and reinforced each other throughout its long and fascinating history. Here, the most interesting and attractive sites are a wonderful mix of this tiny country's cultural and natural heritage.</p>
            <p>Perhaps what is most important for the visitor to know today, though, is that Bosnia and Herzegovina is a stunningly beautiful country with a vast array of landscapes, cultures, traditions and people. And as the old cliche goes "people make the place" - and BiH prides itself on its hospitality and treating our guests as if they were family members. And family we take to heart.</p>
        </span>
        <ScrollDownBtn vh={2}/>
    </div>
  )
}

export default HomeIntroText