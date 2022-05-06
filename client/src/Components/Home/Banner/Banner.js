import React, { useEffect, useState } from 'react'
import "./style.css"

import image1 from "../../../Assets/Images/Home banner slides/banner-image-1.jpeg"
import image2 from "../../../Assets/Images/Home banner slides/banner-image-2.jpg"
import image3 from "../../../Assets/Images/Home banner slides/banner-image-3.jpeg"
import image4 from "../../../Assets/Images/Home banner slides/banner-image-4.jpg"
import image5 from "../../../Assets/Images/Home banner slides/banner-image-5.jpg"
import image6 from "../../../Assets/Images/Home banner slides/banner-image-6.jpg"
import image7 from "../../../Assets/Images/Home banner slides/banner-image-7.jpg"
import image8 from "../../../Assets/Images/Home banner slides/banner-image-8.jpg"
import BannerText from './BannerText'
import ScrollDownBtn from '../Helpers/ScrollDownBtn'


const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0)


    const slides = [
        {image: image1, text: "Land of history", welcome: "Dobro došli"},
        {image: image2, text: "Land of history", welcome: "Welcome"},
        {image: image3, text: "The blue heart of Europe", welcome: "أهلا بك"},
        {image: image5, text: "The blue heart of Europe", welcome: "Добро пожаловать"},
        {image: image4, text: "Where east meets west", welcome: "Willkommen"},
        {image: image6, text: "Where east meets west", welcome: "Hoşgeldiniz"},
        {image: image7, text: "Land of mountains", welcome: "欢迎"},
        {image: image8, text: "Land of mountains", welcome: "Benvenuto"},
    ]

    useEffect(()=>{
        setTimeout(()=>{
            if(currentImage===7) setCurrentImage(0)
            else setCurrentImage(currentImage+1)
        }, 3000)
    }, [currentImage])



  return (
      <>
        <div className='image-preload'>
            <img src={image1} className="banner-image" alt=""/>
            <img src={image2} className="banner-image" alt=""/>
            <img src={image3} className="banner-image" alt=""/>
            <img src={image4} className="banner-image" alt=""/>
            <img src={image5} className="banner-image" alt=""/>
            <img src={image6} className="banner-image" alt=""/>
            <img src={image7} className="banner-image" alt=""/>
            <img src={image8} className="banner-image" alt=""/>
        </div>
        <div className='home-banner'>
            <ScrollDownBtn vh={1}/>
            <div className='home-banner-overlay'></div>
            <img src={slides[currentImage].image} className="banner-image" alt="Banner"/>
            <BannerText text={slides[currentImage].text} welcome={slides[currentImage].welcome}/>
        </div>
      </>
  )
}

export default Banner