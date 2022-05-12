import React, { useState } from 'react'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import axios from "axios"
import ScreenLoader from "../../../Components/General/Loaders/ScreenLoader"

const AddArticle = () => {
  const [loading, setLoading] = useState(false)
  const [bannerImg, setBannerImg] = useState({})
  const [sections, setSections] = useState([{
    sectionID: 0,
    section_title: "",
    section_image: "",
    section_text: "",
    section_image_description: "",
  }])


  const uploadSections = async () => {
    for(let i = 0;i < sections.length;i++){
      let copy = sections
      let data = new FormData()
      data.append("file", sections[i].section_image)
      data.append("upload_preset", "visitbih-image")
      data.append("cloud_name", "de5mm13ux")
      data.append("folder", "visitBiH - Article section images")
      await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
      .then(res => {
        copy[i].section_image = res.data.secure_url
        setSections(copy)
      })
    }
  }

  const uploadBanner = async () => {
    let data = new FormData()
    data.append("file", bannerImg)
    data.append("upload_preset", "z8oybloj")
    data.append("cloud_name", "de5mm13ux")
    data.append("folder", "visitBiH - Article banner images")
    return await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
    .then(res => {
      return res.data.secure_url
    })
  }

  const uploadCardImage = async () => {
    let data = new FormData()
    data.append("file", bannerImg)
    data.append("upload_preset", "card_image")
    data.append("cloud_name", "de5mm13ux")
    data.append("folder", "visitBiH - Article card images")
    return await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
    .then(res => {
      return res.data.secure_url
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let bannerLink
    let cardImgLink

    await uploadSections()


    bannerLink = await uploadBanner()
    cardImgLink = await uploadCardImage()


    await axios({
      method: "POST",
      url: '/api/articles',
      data:{
        title: e.target.title.value,
        intro_title: e.target.intro_title.value,
        intro_text: e.target.intro_text.value,
        banner: bannerLink,
        card_image: cardImgLink,  
        sections: sections
      },
      withCredentials: true
    })
    .then(() =>{setLoading(false); window.location.href = "/admin/articles"})
    .catch(err => console.log(err))
  }

  const onChange = (value, name, section) => {
    let copy = sections
    let i = 0
    sections.forEach(s => {
      if(s.sectionID === section.sectionID){
        if(name === "section_title") copy[i].section_title = value
        else if (name === "section_text") copy[i].section_text = value
        else if (name === "img_desc") copy[i].section_image_description = value
        return
      }
      i++
    })
    setSections(copy)
  }

  const onBannerImageChange = (file, section) => {
    let copy = sections
    let i = 0
    sections.forEach(s => {
      if(s.sectionID === section.sectionID){
        copy[i].section_image = file
        return
      }
      i++
    })
    setSections(copy)
  }

  const removeSection = (sectionID) => {
    let copy = sections
    for(let i = 0; i < sections.length; i++){
      if(copy[i].sectionID===sectionID){
        copy = copy.filter(s => {return s.sectionID !== sectionID})
        setSections(copy)
        return
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
              ADD NEW ARTICLE
            </h2>
          </div>
          <form method='POST' onSubmit={onSubmit} className="admin_add_form">

            <input required name='title' id='title' placeholder='Title'/>                   
            <input required name='intro_title' id='intro_title' placeholder='Intro title'/>        
            <input required name='intro_text' id='intro_text' placeholder='Intro text'/>        

            <label htmlFor='banner'>Add banner image: </label>
            <input required type="file" id='banner' name='banner' accept='image/*' multiple={false} onChange={(e)=>setBannerImg(e.target.files[0])}/>


            <label htmlFor='card_img'>Add sections: </label>



            {/* SECTIONS */}
            {sections.map((section) => <div key={section.sectionID} className='admin_add_article_section'>

              <span onClick={() => removeSection(section.sectionID)} className='remove-section-btn'><i className='fas fa-times'></i></span>

              <label >Section: </label>

              <input required name='section_title' id='section_title' onChange={(e) => onChange(e.target.value, "section_title", section)} placeholder='Title'/>                                      
              <textarea required name='section_text' onChange={(e) => onChange(e.target.value, "section_text", section)} id='section_text' placeholder='Section text'/>                                      


              <label htmlFor='section_img'>Add section image: </label>
              <input required type="file" id='section_img' name='section_img' accept='image/*' multiple={false} onChange={(e)=> onBannerImageChange(e.target.files[0], section)}/>

              <input required name='section_image_description' onChange={(e) => onChange(e.target.value, "img_desc", section)} id='section_image_description' placeholder='Image description'/>                                      
            </div>)}


            <div className='add-new-section-btn' onClick={() => setSections([...sections, {
                  sectionID: sections.length+2,
                  section_title: "",
                  section_image: "",
                  section_text: "",
                  section_image_description: "",
            }])}><i className='fas fa-plus'></i> NEW SECTION</div>


            <button type='submit' className='admin_add_btn'>ADD</button>                                   
        </form>
      </div>}
    </div>
  )
}

export default AddArticle