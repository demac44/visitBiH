import React from 'react'
import "./style.css"

const ArticleIntroText = ({text, title}) => {
  return (
    <div className='article-intro-box'>
        <div className='article-intro-text'>
            <h3>{title}</h3>
            <p>{text}</p>
            <hr/>
        </div>
    </div>
  )
}

export default ArticleIntroText