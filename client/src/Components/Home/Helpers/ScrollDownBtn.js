import React from 'react'

const ScrollDownBtn = ({vh}) => {


    const scroll100vh = () => {
        window.scroll({
            top: window.innerHeight*vh,
            behavior: "smooth"
        })
    }


    return (
        <span onClick={scroll100vh} className='home-banner-arrow-down'><i className='fas fa-arrow-down'></i></span>
    )
}

export default ScrollDownBtn