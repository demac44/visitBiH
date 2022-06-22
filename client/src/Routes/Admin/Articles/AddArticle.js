import React, { useState } from 'react'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import axios from "axios"
import ScreenLoader from "../../../Components/General/Loaders/ScreenLoader"

const AddArticle = () => {
  const [loading, setLoading] = useState(false)
  const [bannerImg, setBannerImg] = useState({})
  const [adImg, setAdImg] = useState(null)
  const [sections, setSections] = useState([{
    section_image: "",
    section_id: 0,
    english:{
      section_title: "",
      section_text: "",
      section_image_description: "",
    },
    bosnian:{
      section_title: "",
      section_text: "",
      section_image_description: "",
    }
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
    let adImageUrl = ""

    await uploadSections()

    if(adImg){
      adImageUrl = await uploadAd()
    }

    bannerLink = await uploadBanner()
    cardImgLink = await uploadCardImage()


    await axios({
      method: "POST",
      url: '/api/articles',
      data:{
        title: {
          english: e.target.title_en.value,
          bosnian: e.target.title_bs.value
        },
        intro_title: {
          english: e.target.intro_title_en.value,
          bosnian: e.target.intro_title_bs.value
        },
        intro_text: {
          english: e.target.intro_text_en.value,
          bosnian: e.target.intro_text_bs.value
        },
        banner: bannerLink,
        card_image: cardImgLink,  
        sections: sections,
        searchString: e.target.search_string.value,
        ad:{
          image: adImageUrl,
          owner: e.target.ad_owner.value,
          url: e.target.ad_url.value,
          showAd: e.target.show_ad.value === "hidden" ? false : true
        }
      },
      withCredentials: true
    })
    .then(() =>{setLoading(false); window.location.href = "/admin/articles"})
    .catch(err => console.log(err))
  }

  const onChange = (value, name, section, lang) => {
    let copy = sections
    let i = 0
    sections.forEach(s => {
      if(s.section_id === section.section_id){
        if(name === "section_title") copy[i][lang].section_title = value
        else if (name === "section_text") copy[i][lang].section_text = value
        else if (name === "img_desc") copy[i][lang].section_image_description = value
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
      if(s.section_id === section.section_id){
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
      if(copy[i].section_id===sectionID){
        copy = copy.filter(s => {return s.section_id !== sectionID})
        setSections(copy)
        return
      }
    }
  }

  const uploadAd = async () => {
    let data = new FormData()
    data.append("file", adImg)
    data.append("upload_preset", "visitbih-image")
    data.append("cloud_name", "de5mm13ux")
    data.append("folder", "visitBiH - Ads images")
    return await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
    .then(res => {return res.data.secure_url})
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

            <input required name='title_en' id='title_en' placeholder='Title (english)'/>    
            <input required name='title_bs' id='title_bs' placeholder='Title (bosnian)'/>                   

            <input required name='intro_title_en' id='intro_title_en' placeholder='Intro title (english)'/>     
            <input required name='intro_title_bs' id='intro_title_bs' placeholder='Intro title (bosnian)'/>        

            <input required name='intro_text_en' id='intro_text_en' placeholder='Intro text (english)'/>      
            <input required name='intro_text_bs' id='intro_text_bs' placeholder='Intro text (bosnian)'/>        

            <input type="text" required name='search_string' id='search_string' placeholder='Search string'/>                                      


            <label htmlFor='banner'>Add banner image: </label>
            <input required type="file" id='banner' name='banner' accept='image/*' multiple={false} onChange={(e)=>setBannerImg(e.target.files[0])}/>


            <label htmlFor='card_img'>Add sections: </label>



            {/* SECTIONS */}
            {sections.map((section) => <div key={section.section_id} className='admin_add_article_section'>

              <span onClick={() => removeSection(section.section_id)} className='remove-section-btn'><i className='fas fa-times'></i></span>

              <label >Section: </label>

              <input type="text" required name='section_title_en' id='section_title_en' onChange={(e) => onChange(e.target.value, "section_title", section, "english")} placeholder='Title (english)'/>    
              <input type="text" required name='section_title_bs' id='section_title_bs' onChange={(e) => onChange(e.target.value, "section_title", section, "bosnian")} placeholder='Title (bosnian)'/>      

              <textarea required name='section_text_en' onChange={(e) => onChange(e.target.value, "section_text", section, "english")} id='section_text_en' placeholder='Section text (english)'/>
              <textarea required name='section_text_bs' onChange={(e) => onChange(e.target.value, "section_text", section, "bosnian")} id='section_text_bs' placeholder='Section text (bosnian)'/>                                      



              <label htmlFor='section_img'>Add section image: </label>
              <input required type="file" id='section_img' name='section_img' accept='image/*' multiple={false} onChange={(e)=> onBannerImageChange(e.target.files[0], section)}/>

              <input required name='section_image_description_en' onChange={(e) => onChange(e.target.value, "img_desc", section, "english")} id='section_image_description_en' placeholder='Image description (english)'/>                                      
              <input required name='section_image_description_bs' onChange={(e) => onChange(e.target.value, "img_desc", section, "bosnian")} id='section_image_description_bs' placeholder='Image description (bosnian)'/>                                      
            
            </div>)}


            <div className='add-new-section-btn' onClick={() => setSections([...sections, {
                  section: sections.length+2,
                  section_image: "",
                  english:{
                    section_title: "",
                    section_text: "",
                    section_image_description: "",
                  },
                  bosnian:{
                    section_title: "",
                    section_text: "",
                    section_image_description: "",
                  }
            }])}><i className='fas fa-plus'></i> NEW SECTION</div>

          <div className='ad_box'>
            
            <label>ADD ADVERTISEMENT</label>

            <div className='show-ad-btn'>
                <select name="show_ad">
                  <option value="shown">Shown</option>
                  <option value="hidden">Hidden</option>
                </select>
            </div>


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

export default AddArticle