import React, { useState } from 'react'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import axios from 'axios'
import ScreenLoader from '../../../Components/General/Loaders/ScreenLoader'

const AddPlace = () => {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [filesLength, setFilesLength] = useState(0)
  const [cardImg, setCardImg] = useState({})
  const [adImg, setAdImg] = useState({})

  const uploadAd = async () => {
    let data = new FormData()
    data.append("file", adImg)
    data.append("upload_preset", "visitbih-image")
    data.append("cloud_name", "de5mm13ux")
    data.append("folder", "visitBiH - Ads images")
    return await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
    .then(res => {return res.data.secure_url})
  }


  const onSubmit = async (e) => {
    e.preventDefault() 
    setLoading(true)
    let imgURLs = []
    let cardImgURL = ""


    // Upload images
    for(let i = 0;i < filesLength; i++){
      let data = new FormData()
      data.append("file", images[i])
      data.append("upload_preset", "visitbih-image")
      data.append("cloud_name", "de5mm13ux")
      data.append("folder", "visitBiH - Places images")
      await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
      .then(res => imgURLs.push({image: res.data.secure_url}))
    }
    
    // Upload card image
    let data = new FormData()
    data.append("file", cardImg)
    data.append("upload_preset", "card_image")
    data.append("cloud_name", "de5mm13ux")
    data.append("folder", "visitBiH - Places card images")
    await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
    .then(res => {cardImgURL = res.data.secure_url;})

    let adImageUrl = await uploadAd()

    
    axios({
      method: 'POST',
      url: '/api/places',
      data:{
        name: {
          english: e.target.name_en.value,
          bosnian: e.target.name_bs.value,
          arabic: e.target.name_ar.value,
        },        
        region: e.target.region.value,
        city: e.target.city.value,
        description: {
          english: e.target.desc_en.value,
          bosnian: e.target.desc_bs.value,
          arabic: e.target.desc_ar.value,
        },        
        gm_iframe: e.target.google_maps_iframe.value,
        gm_link: e.target.google_maps_link.value,
        images: imgURLs,
        card_img: cardImgURL,
        ad: {
          image: adImageUrl,
          url: e.target.ad_url.value,
          owner: e.target.ad_owner.value
        }
      },
      withCredentials: true
    })
    .then(() => {setLoading(false); window.location.href = "/admin/places"})
    .catch(err => console.log(err))
  }

  return (
    <div className='admin_container'>
        <AdminNavbar/>
        {loading ? <ScreenLoader/> :
        <div className='admin_main'>
          <div className='admin_section_title'>
            <h2>
              ADD NEW PLACE
            </h2>
          </div>
          <form method='POST' onSubmit={onSubmit} className="admin_add_form">
            <input required name='name_en' id='name' placeholder='Name (english)'/>
            <input required name='name_bs' id='name' placeholder='Name (bosnian)'/>
            <input required name='name_ar' id='name' placeholder='Name (arabic)'/>
            <select name='region' required>
              <option value="Sarajevo">Sarajevo</option>
              <option value="West Bosnia">West Bosnia</option>
              <option value="Krajina">Krajina</option>
              <option value="Central Bosnia">Central Bosnia</option>
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
            <input required name='city' id='city' placeholder='City'/>                                        
            <textarea required name='desc_en' id='description' placeholder='Description (english)'/>   
            <textarea required name='desc_bs' id='description' placeholder='Description (bosnian)'/>    
            <textarea required name='desc_ar' id='description' placeholder='Description (arabic)'/>                
            <input required name='google_maps_iframe' id='google_maps_iframe' placeholder='Google maps iframe'/> 
            <input required name='google_maps_link' id='google_maps_link' placeholder='Google maps link'/>     


            <label htmlFor='card_img'>Add card image:</label>
            <input required type="file" id='card_img' name='card_img' accept='image/*' multiple={false} onChange={(e)=>setCardImg(e.target.files[0])}/>

            <label htmlFor='images'>Add images:</label>
            <input required type="file" name='images' id='images' accept='image/*' onChange={(e)=>{setImages(e.target.files);setFilesLength(e.target.files.length)}} multiple={true}/>

          <div className='ad_box'>
  
            <label>ADD ADVERTISEMENT</label>
            <input name='ad_owner' id='ad_owner' placeholder='Ad owner'/>

            <input name='ad_url' id='ad_url' placeholder='Ad URL'/>

            <label htmlFor='ad_img'>Add ad image:</label>
            <input type="file" id='ad_img' name='ad_img' accept='image/*' multiple={false} onChange={(e)=>setAdImg(e.target.files[0])}/>
          </div>


            <button type='submit' className='admin_add_btn'>ADD</button>                                   
          </form>
        </div>}
      </div>
  )
}

export default AddPlace