import React from 'react'
import "./style.css"
import axios from 'axios'

const ConfirmDelete = ({type, loadingCallback, id, exitConfirmBox}) => {


    const deleteArticle = () => {
        loadingCallback(true)
        axios({
          method: "POST",
          url: "/api/articles/article/delete",
          data: {
            id: id
          },
          withCredentials: true
        }).then(() =>{loadingCallback(false); window.location.href = "/admin/articles"})
    }


    const deletePlace = () => {
        loadingCallback(true)
        axios({
            method: "POST",
            url: "/api/places/delete",
            data:{
              id: id
            },
            withCredentials: true
        }).then(() => {loadingCallback(false); window.location.href = "/admin/places"})
    }

    const deleteAd = () => {
      loadingCallback(true)
      axios({
          method: "POST",
          url: "/api/ads/delete",
          data:{
            id: id
          },
          withCredentials: true
      }).then(() => {loadingCallback(false); window.location.href = "/admin/ads"})
    }


    return (
        <div className='confirm-delete-box'>
            <p>Are you sure you want to delete this {type}?</p>
            <span onClick={() => {
              if (type==="article") deleteArticle() 
              else if (type==="place") deletePlace()
              else if (type === "ad") deleteAd()
            }} className='delete-btn'>DELETE</span>
            <span onClick={() => exitConfirmBox()} className='go-back-btn'>GO BACK</span>
        </div>
    )
}

export default ConfirmDelete