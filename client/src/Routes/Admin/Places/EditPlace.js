import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import ScreenLoader from "../../../Components/General/Loaders/ScreenLoader"

const EditPlace = () => {
  const [place, setPlace] = useState({})
  const [loading, setLoading] = useState(true)
  const [oldImages, setOldImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const [filesLength, setFilesLength] = useState(0)
  const [cardImg, setCardImg] = useState(null)


  const params = useParams()

  useEffect(() => {
    setLoading(true)
    axios({
      method:"POST",
      url: "/api/places/place/_id",
      data: {
        id: params.id
      },
      withCredentials:true
    })
    .then(res => { 
      setPlace(res.data[0]); 
      setOldImages(res.data[0].images)
    })
    .then(() => setLoading(false))
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault() 
    setLoading(true)
    let imgURLs = []
    let cardImgURL = ""


    // Upload images
    for(let i = 0;i < filesLength; i++){
      let data = new FormData()
      data.append("file", newImages[i])
      data.append("upload_preset", "z8oybloj")
      data.append("cloud_name", "de5mm13ux")
      data.append("folder", "visitBiH - Places images")
      await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
      .then(res => imgURLs.push({image: res.data.secure_url}))
    }
    
    imgURLs = imgURLs.concat(oldImages)

    // Upload card image
    
    if(cardImg){
      let data = new FormData()
      data.append("file", cardImg)
      data.append("upload_preset", "card_image")
      data.append("cloud_name", "de5mm13ux")
      data.append("folder", "visitBiH - Places card images")
      await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
      .then(res => {cardImgURL = res.data.secure_url;})
    } else cardImgURL = place.card_img

    
    axios({
      method:"POST",
      url: '/api/places/edit',
      data:{
        id: params.id,
        name: e.target.name.value,
        region: e.target.region.value,
        city: e.target.city.value,
        description: e.target.description.value,
        gm_iframe: e.target.google_maps_iframe.value,
        gm_link: e.target.google_maps_link.value,
        images: imgURLs,
        card_img: cardImgURL
      },
      withCredentials: true
    })
    .then(() =>{setLoading(false); window.location.reload()})
  }


  const deletePlace = () => {
    setLoading(true)
    axios({
        method: "POST",
        url: "/api/places/delete",
        data:{
          id: params.id
        },
        withCredentials: true
    }).then(() => {setLoading(false); window.location.href = "/admin/places"})
  }

  const removeImage = (link) => {
    for(let i = 0; i<oldImages.length; i++){
      if(oldImages[i].image===link){
        setOldImages(() => {
          return oldImages.filter(img => {return img.image !== link})
        })
      }
    }
  }

  return (
    <div className='admin_container'>
      <AdminNavbar/>
      {loading ? <ScreenLoader/> : 
      <div className='admin_main'>
          <div className='admin_section_title'>
            <h2>
              Edit {place.name}
            </h2>
          </div>
          <form method='POST' onSubmit={onSubmit} className="admin_add_form">
            <input required name='name' id='name' placeholder='Name' defaultValue={place.name}/>
            <select name='region' required defaultValue={place.region}>
              <option value="Sarajevo">Sarajevo</option>
              <option value="West Bosnia">West Bosnia</option>
              <option value="Krajina">Krajina</option>
              <option value="Central Bosnia" >Central Bosnia</option>
              <option value="West Herzegovina">West Herzegovina</option>
              <option value="Herzegovina-Neretva">Herzegovina-Neretva</option>
              <option value="Tuzla">Tuzla</option>
              <option value="Zenica-Doboj">Zenica-Doboj</option>
              <option value="Podrinje">Podrinje</option>
              <option value="Posavina">Posavina</option>
              <option value="Doboj">Doboj</option>
              <option value="Banja Luka">Banja Luka</option>
              <option value="Brčko">Brčko</option>
              <option value="Bijeljina">Bijeljina</option>
              <option value="Eastern Bosnia">Eastern Bosnia</option>
              <option value="Romanija">Romanija</option>
              <option value="Foča">Foča</option>
              <option value="Trebinje">Trebinje</option>
            </select>                                       
            <input required name='city' id='city' placeholder='City' defaultValue={place.city}/>                                        
            <textarea required name='description' id='description' placeholder='Description' defaultValue={place.description}/>    

            <label>Location</label>
            <input required name='google_maps_iframe' id='google_maps_iframe' placeholder='Google maps iframe' defaultValue={place.location.google_maps_iframe}/> 
            <input required name='google_maps_link' id='google_maps_link' placeholder='Google maps link' defaultValue={place.location.google_maps_link}/>    

            <label>Card image</label>
            <input defaultValue={place.card_img} readOnly/> 
            <img src={place.card_img} style={{width:"100%", marginTop:"10px"}}/>

            <label htmlFor='card_img'>Change card image:</label>
            <input type="file" id='card_img' name='card_img' accept='image/*' multiple={false} onChange={(e)=>setCardImg(e.target.files[0])}/>


            <label>Images</label>
            {oldImages.map(image => 
                <div className='old-image-box' key={image.image}>
                    <span className='old-image-link'>
                      <input defaultValue={image.image} placeholder="Image" readOnly/>
                      <i className='fas fa-times' onClick={() => removeImage(image.image)}></i>
                    </span>
                    <img src={image.image}/>
                </div>
              )}

            <label htmlFor='images'>Add new images:</label>
            <input type="file" name='images' id='images' accept='image/*' onChange={(e)=>{setNewImages(e.target.files);setFilesLength(e.target.files.length)}} multiple={true}/>

            <button type='submit' className='admin_add_btn'>SAVE</button> 
          </form>
          <button onClick={deletePlace} className='admin_add_btn'>DELETE</button>                                   
        </div>}
    </div>
  )
}

export default EditPlace