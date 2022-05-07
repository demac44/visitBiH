import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import ConfirmDelete from '../../../Components/Admin/Confirmation box/ConfirmDelete'
import ScreenLoader from "../../../Components/General/Loaders/ScreenLoader"


const EditArticle = () => {
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true)
  const [bannerImg, setBannerImg] = useState(null)
  const [newSections, setNewSections] = useState([])
  const [oldSections, setOldSections] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(false)

  const params = useParams()


  useEffect(() => {
    setLoading(true)
    axios({
      method: "POST",
      url: "/api/articles/article/_id",
      data:{
        id: params.id
      },
      withCredentials: true
    }).then(res => {setArticle(res.data); setOldSections(res.data.sections)})
    .then(() => setLoading(false))
  }, [])


  const uploadOldSections = async  () => {
    for(let i =0;i < oldSections.length;i++){
      if(oldSections[i].changed){
        let copy = oldSections
        let data = new FormData()
        data.append("file", oldSections[i].section_image)
        data.append("upload_preset", "z8oybloj")
        data.append("cloud_name", "de5mm13ux")
        data.append("folder", "visitBiH - Article section images")
        await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
        .then(res => {
          copy[i].section_image = res.data.secure_url
          setOldSections(copy)
        })
      }
    }
  }

  const uploadNewSections = async () => {
    for(let i = 0; i<newSections.length;i++){
      let copy = newSections
      let data = new FormData()
      data.append("file", newSections[i].section_image)
      data.append("upload_preset", "z8oybloj")
      data.append("cloud_name", "de5mm13ux")
      data.append("folder", "visitBiH - Article section images")
      await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
      .then(res => {
        copy[i].section_image = res.data.secure_url
        setNewSections(copy)
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

    await uploadOldSections()
    await uploadNewSections()

    // check if banner changed an upload it
    if(bannerImg){
      bannerLink = await uploadBanner()
      cardImgLink = await uploadCardImage()    
    } else {
      bannerLink = article.banner
      cardImgLink = article.card_image 
    }

    const sections = oldSections.concat(newSections)

    await axios({
      method: "POST",
      url:'/api/articles/article/edit',
      data:{
        id: params.id,
        title: e.target.title.value,
        intro_title: e.target.intro_title.value,
        intro_text: e.target.intro_text.value,
        card_image: cardImgLink,
        banner: bannerLink,
        sections: sections
      },
      withCredentials: true
    })
    .then(() => {setLoading(false); window.location.reload()})
    .catch(err => console.log(err))
  }

  const onChangeOldSections = (value, name, section) => {
    let copy = oldSections
    let i = 0
    oldSections.forEach(s => {
      if(s.sectionID === section.sectionID){
        if(name === "section_title") copy[i].section_title = value
        else if (name === "section_text") copy[i].section_text = value
        else if (name === "img_desc") copy[i].section_image_description = value
        return
      }
      i++
    })
    setOldSections(copy)
  }

  const onChangeNewSections = (value, name, section) => {
    let copy = newSections
    let i = 0
    newSections.forEach(s => {
      if(s.sectionID === section.sectionID){
        if(name === "section_title") copy[i].section_title = value
        else if (name === "section_text") copy[i].section_text = value
        else if (name === "img_desc") copy[i].section_image_description = value
        return
      }
      i++
    })
    setNewSections(copy)
  }

  const onOldSectionImageChange = (file, section) => {
    let copy = oldSections
    let i = 0
    oldSections.forEach(s => {
      if(s.sectionID === section.sectionID){
        copy[i].section_image = file
        copy[i].changed = true
        return
      }
      i++
    })
    setOldSections(copy)
  }
  const onNewSectionImageChange = (file, section) => {
    let copy = newSections
    let i = 0
    newSections.forEach(s => {
      if(s.sectionID === section.sectionID){
        copy[i].section_image = file
        return
      }
      i++
    })
    setNewSections(copy)
  }




  const removeOldSection = (sectionID) => {
    for(let i = 0;i < oldSections.length; i++){
      if(oldSections[i].sectionID===sectionID){
        let copy = oldSections.filter(s => {return s.sectionID !== sectionID})
        setOldSections(copy)
        return
      }
    }
  }

  const removeNewSection = (sectionID) => {
    for(let i = 0;i < newSections.length; i++){
      if(newSections[i].sectionID===sectionID){
        let copy = newSections.filter(s => {return s.sectionID !== sectionID})
        setNewSections(copy)
        return
      }
    }
  }

  const loadingCallback = useCallback(val => {
    setLoading(val)
  }, [setLoading])

  const exitConfirmBox = useCallback(() => {
    setConfirmDelete(false)
  }, [setConfirmDelete])

  return (
    <div className='admin_container'>
      <AdminNavbar/>
      {confirmDelete && <ConfirmDelete type="article" id={params.id} loadingCallback={loadingCallback} exitConfirmBox={exitConfirmBox}/>}
      {loading ? <ScreenLoader/> : 
      <div className='admin_main'>
          <div className='admin_section_title'>
            <h2>
              CHANGE ARTICLE
            </h2>
          </div>
          <form method='POST' onSubmit={onSubmit} className="admin_add_form">

            <input required name='title' id='title' placeholder='Title' defaultValue={article.title}/>                   
            <input required name='intro_title' id='intro_title' placeholder='Intro title' defaultValue={article.intro_title}/>        
            <textarea required name='intro_text' id='intro_text' placeholder='Intro text' defaultValue={article.intro_text}/>       
            
            <label>Banner image</label>
            <input defaultValue={article.banner} readOnly/>
            <img src={article.banner} style={{width:"100%", marginTop:"10px"}}/>

            <label htmlFor='banner'>Change banner image: </label>
            <input type="file" id='banner' name='banner' accept='image/*' multiple={false} onChange={(e)=>setBannerImg(e.target.files[0])}/>


            <label htmlFor='card_img'>Sections: </label>



            {/* SECTIONS */}
            {oldSections.map(section => <div key={section.sectionID} className='admin_add_article_section'>

              <span onClick={() => removeOldSection(section.sectionID)} className='remove-section-btn'><i className='fas fa-times'></i></span>


              <label >Section: </label>

              <input required name='section_title' id='section_title' onChange={(e) => onChangeOldSections(e.target.value, "section_title", section)} placeholder='Title' defaultValue={section.section_title}/>                                      
              <textarea required name='section_text' onChange={(e) => onChangeOldSections(e.target.value, "section_text", section)} id='section_text' placeholder='Section text' defaultValue={section.section_text}/>                                      

              <label>Section image</label>
              <input defaultValue={section.section_image} readOnly/>
              <img src={section.section_image} style={{width:"100%", marginTop:"10px"}}/>

              <label htmlFor='section_img'>Change section image: </label>
              <input type="file" id='section_img' name='section_img' accept='image/*' multiple={false} onChange={(e)=> onOldSectionImageChange(e.target.files[0], section)}/>

              <input required name='section_image_description' onChange={(e) => onChangeOldSections(e.target.value, "img_desc", section)} id='section_image_description' placeholder='Image description' defaultValue={section.section_image_description}/>                                      
            </div>)}

            {newSections.map(section => <div key={section.sectionID} className='admin_add_article_section'>

              <span onClick={() => removeNewSection(section.sectionID)} className='remove-section-btn'><i className='fas fa-times'></i></span>


              <label >Section: </label>

              <input required name='section_title' id='section_title' onChange={(e) => onChangeNewSections(e.target.value, "section_title", section)} placeholder='Title'/>                                      
              <textarea required name='section_text' onChange={(e) => onChangeNewSections(e.target.value, "section_text", section)} id='section_text' placeholder='Section text'/>                                      

              <label htmlFor='section_img'>Add section image: </label>
              <input required type="file" id='section_img' name='section_img' accept='image/*' multiple={false} onChange={(e)=> onNewSectionImageChange(e.target.files[0], section)}/>

              <input required name='section_image_description' onChange={(e) => onChangeNewSections(e.target.value, "img_desc", section)} id='section_image_description' placeholder='Image description'/>                                      
            </div>)}


            <div className='add-new-section-btn' onClick={() => setNewSections([...newSections, {
                  sectionID: oldSections.length+newSections.length+2,
                  section_title: "",
                  section_image: "",
                  section_text: "",
                  section_image_description: "",
            }])}><i className='fas fa-plus'></i> NEW SECTION</div>


            <button type='submit' className='admin_add_btn'>SAVE</button>                                   
        </form>
        <button onClick={() => setConfirmDelete(true)} className='admin_add_btn'>DELETE</button>                                   
      </div>}
    </div>  
  )
}

export default EditArticle