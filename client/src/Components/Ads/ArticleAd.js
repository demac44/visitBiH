import React from 'react'

const ArticleAd = ({ad}) => {
  return (
    <>
      {ad?.image && ad?.showAd ?
        <div className='article-ad'>
          <p className='ad-tag'>AD</p>
          <img src={ad?.image} alt=""/>
        </div>
        :
        <></>}
    </>
  )
}

export default ArticleAd