import React, { useEffect, useState } from 'react'
import "./style.css"


const ImageSlider = ({images}) => {
    const [currentImage, setCurrentImage] = useState(0)

    
    const nextImage = () => {
        setTimeout(() => {
            if(currentImage===images.length-1) setCurrentImage(0)
            else setCurrentImage(currentImage+1)
        }, 100)
    }

    const prevImage = () => {
        setTimeout(() => {
            if(currentImage===0) setCurrentImage(images.length-1)
            else setCurrentImage(currentImage-1)
        }, 100)
    }

    useEffect(() => {
        window.addEventListener("keyup", (e) => {
            if(e.key==="ArrowRight") nextImage()
            else if(e.key==="ArrowLeft") prevImage()
        })
    }, [currentImage])

    return (
        <div className='image-slider'>
            <div className='preload-images'>
                {images.map(image => <img src={image.image} alt="" key={image.image}/>)}
            </div>
            <img src={images[currentImage].image} className="image-slider-image" alt="place"/>


            <div className='image-slider-control control-left' 
                onClick={prevImage}
            >
                    <i className='fas fa-chevron-left'></i>
            </div>
            <div className='image-slider-control control-right' 
                onClick={nextImage}
                >
                    <i className='fas fa-chevron-right'></i>
            </div>
        </div>
    )
}

export default ImageSlider