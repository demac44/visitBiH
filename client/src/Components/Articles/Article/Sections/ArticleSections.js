import React from 'react'
import ArticleSection from '../Section/ArticleSection'
import "./style.css"


const ArticleSections = ({sections}) => {
  return (
    <div className='article-sections'>
        {sections.map(section => <ArticleSection section={section} key={section.section_title}/>)}
    </div>
  )
}

export default ArticleSections