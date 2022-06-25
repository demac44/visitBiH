import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import ConfirmDelete from '../../../Components/Admin/Confirmation box/ConfirmDelete'
import ScreenLoader from "../../../Components/General/Loaders/ScreenLoader"


const EditArticle = () => {
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true)
  const [bannerImg, setBannerImg] = useState(null)
  const [adImg, setAdImg] = useState(null)
  const [newSections, setNewSections] = useState([])
  const [oldSections, setOldSections] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(false)

  const params = useParams()


  useEffect(() => {
    setLoading(true)
    axios({
      method: "POST",
      url: "/api/articles/article",
      data:{
        id: params.id
      },
      withCredentials: true
    }).then(res => {setArticle(res.data); setOldSections(res.data.sections)})
    .then(() => setLoading(false))
  }, [params?.id])


  const uploadOldSections = async  () => {
    for(let i =0;i < oldSections.length;i++){
      if(oldSections[i].changed){
        let copy = oldSections
        let data = new FormData()
        data.append("file", oldSections[i].section_image)
        data.append("upload_preset", "visitbih-image")
        data.append("cloud_name", "de5mm13ux")
        data.append("folder", "visitBiH - Article section images")
        await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
        .then(res => {
          copy[i].section_image = res.data.secure_url
          copy[i].changed = false
          setOldSections(copy)
        })
        .catch(err => console.log(err))
      }
    }
  }

  const uploadNewSections = async () => {
    for(let i = 0; i<newSections.length;i++){
      let copy = newSections
      let data = new FormData()
      data.append("file", newSections[i].section_image)
      data.append("upload_preset", "visitbih-image")
      data.append("cloud_name", "de5mm13ux")
      data.append("folder", "visitBiH - Article section images")
      await axios.post("https://api.cloudinary.com/v1_1/de5mm13ux/image/upload", data)
      .then(res => {
        copy[i].section_image = res.data.secure_url
        setNewSections(copy)
      })
      .catch(err => console.log(err))
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
    let bannerLink
    let cardImgLink
    let adImageUrl = ""

    await uploadOldSections()
    await uploadNewSections()

    if(adImg){
      adImageUrl = await uploadAd()
    } else {
      adImageUrl = ""
    }

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
        card_image: cardImgLink,
        banner: bannerLink,
        sections: sections,
        searchString: e.target.search_string.value,
        ad:{
          owner: e.target.ad_owner.value,
          image: adImageUrl,
          url: e.target.ad_url.value,
          showAd: e.target.show_ad.value === "hidden" ? false : true
        }      },
      withCredentials: true
    })
    .then(() => {setLoading(false); window.location.reload()})
    .catch(err => console.log(err))
  }

  const onChangeOldSections = (value, name, section, lang) => {
    let copy = oldSections
    let i = 0
    oldSections.forEach(s => {
      if(s.section_id === section.section_id){
        if(name === "section_title") copy[i][lang].section_title = value
        else if (name === "section_text") copy[i][lang].section_text = value
        else if (name === "img_desc") copy[i][lang].section_image_description = value
        return
      }
      i++
    })
    setOldSections(copy)
  }

  const onChangeNewSections = (value, name, section, lang) => {
    let copy = newSections
    let i = 0
    newSections.forEach(s => {
      if(s.section_id === section.section_id){
        if(name === "section_title") copy[i][lang].section_title = value
        else if (name === "section_text") copy[i][lang].section_text = value
        else if (name === "img_desc") copy[i][lang].section_image_description = value
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
      if(s.section_id === section.section_id){
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
      if(s.section_id === section.section_id){
        copy[i].section_image = file
        return
      }
      i++
    })
    setNewSections(copy)
  }




  const removeOldSection = (sectionID) => {
    for(let i = 0;i < oldSections.length; i++){
      if(oldSections[i].section_id===sectionID){
        let copy = oldSections.filter(s => {return s.section_id !== sectionID})
        setOldSections(copy)
        return
      }
    }
  }

  const removeNewSection = (sectionID) => {
    for(let i = 0;i < newSections.length; i++){
      if(newSections[i].section_id===sectionID){
        let copy = newSections.filter(s => {return s.section_id !== sectionID})
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

            <input required name='title_en' id='title_en' placeholder='Title (english)' defaultValue={article?.title?.english}/>
            <input required name='title_bs' id='title_bs' placeholder='Title (bosnian)' defaultValue={article?.title?.bosnian}/>    
            <input required name='intro_title_en' id='intro_title_en' placeholder='Intro title (english)' defaultValue={article?.intro_title?.english}/>   
            <input required name='intro_title_bs' id='intro_title_bs' placeholder='Intro title (bosnian)' defaultValue={article?.intro_title?.bosnian}/>        
            <textarea required name='intro_text_en' id='intro_text_en' placeholder='Intro text (english)' defaultValue={article?.intro_text?.english}/>     
            <textarea required name='intro_text_bs' id='intro_text_bs' placeholder='Intro text (bosnian)' defaultValue={article?.intro_text?.bosnian}/>       
            <input type="text" required name='search_string' id='search_string' placeholder='Change search string' defaultValue={article?.searchString}/>                                      

            
            <label>Banner image</label>
            <input defaultValue={article.banner} readOnly/>
            <img src={article.banner} style={{width:"100%", marginTop:"10px"}} alt=""/>

            <label htmlFor='banner'>Change banner image: </label>
            <input type="file" id='banner' name='banner' accept='image/*' multiple={false} onChange={(e)=>setBannerImg(e.target.files[0])}/>


            <label htmlFor='card_img'>Sections: </label>



            {/* SECTIONS */}
            {oldSections.map(section => <div key={section.section_id} className='admin_add_article_section'>

              <span onClick={() => removeOldSection(section.section_id)} className='remove-section-btn'><i className='fas fa-times'></i></span>


              <label >Section: </label>

              <input required name='section_title_en' id='section_title_en' onChange={(e) => onChangeOldSections(e.target.value, "section_title", section, "english")} placeholder='Title (english)' defaultValue={section["english"]?.section_title}/>
              <input required name='section_title_bs' id='section_title_bs' onChange={(e) => onChangeOldSections(e.target.value, "section_title", section, "bosnian")} placeholder='Title (bosnian)' defaultValue={section["bosnian"]?.section_title}/>                                      

              
              <textarea required name='section_text_en' onChange={(e) => onChangeOldSections(e.target.value, "section_text", section, "english")} id='section_text_en' placeholder='Section text (english)' defaultValue={section["english"]?.section_text}/>                                      
              <textarea required name='section_text_bs' onChange={(e) => onChangeOldSections(e.target.value, "section_text", section, "bosnian")} id='section_text_bs' placeholder='Section text (bosnian)' defaultValue={section["bosnian"]?.section_text}/>                                      

              <label>Section image</label>
              <input defaultValue={section.section_image} readOnly/>
              <img src={section.section_image} style={{width:"100%", marginTop:"10px"}} alt=""/>

              <label htmlFor='section_img'>Change section image: </label>
              <input type="file" id='section_img' name='section_img' accept='image/*' multiple={false} onChange={(e)=> onOldSectionImageChange(e.target.files[0], section)}/>

              <input required name='section_image_description_en' onChange={(e) => onChangeOldSections(e.target.value, "img_desc", section, "english")} id='section_image_description_en' placeholder='Image description (english)' defaultValue={section["english"]?.section_image_description}/>                                      
              <input required name='section_image_description_bs' onChange={(e) => onChangeOldSections(e.target.value, "img_desc", section, "bosnian")} id='section_image_description_bs' placeholder='Image description (bosnian)' defaultValue={section["bosnian"]?.section_image_description}/>                                      
            
            </div>)}

            {newSections.map(section => <div key={section.section_id} className='admin_add_article_section'>

              <span onClick={() => removeNewSection(section.section_id)} className='remove-section-btn'><i className='fas fa-times'></i></span>


              <label >Section: </label>

              <input required name='section_title_en' id='section_title_en' onChange={(e) => onChangeNewSections(e.target.value, "section_title", section, "english")} placeholder='Title (english)'/>
              <input required name='section_title_bs' id='section_title_bs' onChange={(e) => onChangeNewSections(e.target.value, "section_title", section, "bosnian")} placeholder='Title (bosnian)'/>                                      

              <textarea required name='section_text_en' onChange={(e) => onChangeNewSections(e.target.value, "section_text", section, "english")} id='section_text' placeholder='Section text (english)'/> 
              <textarea required name='section_text_bs' onChange={(e) => onChangeNewSections(e.target.value, "section_text", section, "bosnian")} id='section_text' placeholder='Section text (bosnian)'/>                                      


              <label htmlFor='section_img'>Add section image: </label>
              <input required type="file" id='section_img' name='section_img' accept='image/*' multiple={false} onChange={(e)=> onNewSectionImageChange(e.target.files[0], section)}/>

              <input required name='section_image_description_en' onChange={(e) => onChangeNewSections(e.target.value, "img_desc", section, "english")} id='section_image_description_en' placeholder='Image description (english)'/>  
              <input required name='section_image_description_bs' onChange={(e) => onChangeNewSections(e.target.value, "img_desc", section, "bosnian")} id='section_image_description_bs' placeholder='Image description (bosnian)'/>                                      

            </div>)}


            <div className='add-new-section-btn' onClick={() => setNewSections([...newSections, {
                  section_id: oldSections.length+newSections.length+2,
                  section_image: "",
                  english: {
                    section_title: "",
                    section_text: "",
                    section_image_description: ""},
                  bosnian: {
                    section_title: "",
                    section_text: "",
                    section_image_description: ""},
            }])
            }><i className='fas fa-plus'></i> NEW SECTION</div>

            <div className='ad_box'>
              
              <label>ADVERTISEMENT</label>

              <div className='show-ad-btn'>
                <select name="show_ad" defaultValue={article?.ad?.showAd === true ? "shown" : "hidden"}>
                  <option value="shown">Shown</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>


              <input name='ad_owner' id='ad_owner' placeholder='Ad owner' defaultValue={article?.ad?.owner}/>

              <input name='ad_url' id='ad_url' placeholder='Ad URL' defaultValue={article?.ad?.url}/>

              <label htmlFor='ad_img'>Edit ad image:</label>
              <input defaultValue={article?.ad?.image}/>

              <img src={article?.ad?.image} style={{width:"100%", marginTop:"10px"}} alt=""/>

              <input type="file" id='ad_img' name='ad_img' accept='image/*' multiple={false} onChange={(e)=>setAdImg(e.target.files[0])}/>
            </div>


            <button type='submit' className='admin_add_btn'>SAVE</button>                                   
        </form>
        <button onClick={() => setConfirmDelete(true)} className='admin_add_btn'>DELETE</button>                                   
      </div>}
    </div>  
  )
}

export default EditArticle