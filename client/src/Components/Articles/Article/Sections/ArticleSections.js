import React from 'react'
import ArticleSection from '../Section/ArticleSection'
import "./style.css"


const ArticleSections = ({sections, lang}) => {
  return (
      <div className='article-sections'>
        <div className='articles-overlay'></div>
          {sections.map(section => <ArticleSection section={section[lang]} image={section.section_image} key={section.section_id}/>)}
      </div>
  )
}

export default ArticleSections