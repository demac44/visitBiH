import React from 'react'
import ArticleAd from '../../../Ads/ArticleAd'
import DownloadTheAppStripe from '../../../Download the app/DownloadTheAppStripe'
import ArticleSection from '../Section/ArticleSection'
import "./style.css"


const ArticleSections = ({sections, lang, ad}) => {
  return (
      <div className='article-sections'>
          <div className='articles-overlay'></div>
          <ArticleAd ad={ad}/>
          {sections.map(section => <ArticleSection section={section[lang]} image={section.section_image} key={section.section_id}/>)}
      </div>
  )
}

export default ArticleSections