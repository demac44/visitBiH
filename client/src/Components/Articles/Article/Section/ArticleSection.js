import React from 'react'
import "./style.css"


const ArticleSection = ({section, image}) => {
  return (
    <div className='article-section'>
        <h2>{section.section_title}</h2>
        <p>{section.section_text}</p>
        <hr/>
        <p>{section.section_image_description}</p>
        <img src={image} alt=""/>
        <hr/>
    </div>
  )
}

export default ArticleSection