import React from 'react'
import ScrollDownBtn from '../../../Home/Helpers/ScrollDownBtn'
import "./style.css"

const ArticleBanner = ({banner, title}) => {
  return (
    <div className='article-banner'>
        <div className='overlay'></div>
        <img src={banner}/>
        <h1>{title}</h1>
        <ScrollDownBtn vh={1}/>
    </div>
  )
}

export default ArticleBanner