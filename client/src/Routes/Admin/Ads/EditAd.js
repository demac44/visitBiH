import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import ConfirmDelete from '../../../Components/Admin/Confirmation box/ConfirmDelete'
import ScreenLoader from '../../../Components/General/Loaders/ScreenLoader'

const EditAd = (id) => {
    const [loading, setLoading] = useState(false)
    const [ad, setAd] = useState({})
    const [adImg, setAdImg] = useState(null)
    const [adType, setAdType] = useState("")
    const [confirmDelete, setConfirmDelete] = useState(false)


    const params = useParams()

    useEffect(() => {
      axios({
        method: "POST",
        url: "/api/ads/ad/id",
        data: {
          id: params.id
        },
        withCredentials: true
      }).then(res => {setAd(res.data);setAdType(res.data.type)})
    }, [])

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
        let adImageUrl = ""

        if(adImg){
          adImageUrl = await uploadAd()
        } else {
          adImageUrl = ad?.image
        }


        await axios({
            method: "POST",
            url: '/api/ads/edit',
            data:{
                image: adImageUrl,
                owner: e.target.ad_owner.value,
                url: e.target.ad_url.value,
                type: adType,
                region: e.target?.region?.value || "",
                id: params.id
            },
            withCredentials: true
          })
          .then(() =>{setLoading(false); window.location.reload()})
          .catch(err => console.log(err))

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
            {confirmDelete && <ConfirmDelete type="ad" id={params.id} loadingCallback={loadingCallback} exitConfirmBox={exitConfirmBox}/>}
            {loading ? <ScreenLoader/> : 
            <div className='admin_main'>
                <div className='admin_section_title'>
                    <h2>
                    EDIT AD
                    </h2>
                </div>
                <form method='POST' onSubmit={onSubmit} className="admin_add_form">

                    <input required name='ad_url' id='ad_url' placeholder='Ad URL' defaultValue={ad?.url}/>    
                    <input required name='ad_owner' id='ad_owner' placeholder='Ad owner' defaultValue={ad?.owner}/>    

                    <select name='ad_type' id='ad_type' onChange={(e) => setAdType(e.target.value)}>
                        <option selected={adType === "articles-ad"} value="articles-ad">Articles ad</option>
                        <option selected={adType === "region-ad"} value="region-ad">Region ad</option>
                    </select>

                    {adType === "region-ad" && <select name='region' defaultValue={ad?.region} required>
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
                    </select>  }

                    <img src={ad?.image} style={{width:"100%", marginTop:"10px"}} alt=""/>

                    <label htmlFor='banner'>Edit ad image: </label>
                    <input type="file" id='banner' name='banner' accept='image/*' multiple={false} onChange={(e)=>setAdImg(e.target.files[0])}/>


                    <button type='submit' className='admin_add_btn'>SAVE</button>                                   
                </form>
                <button onClick={() => setConfirmDelete(true)} className='admin_add_btn'>DELETE</button>                                   
            </div>}
        </div>  
        )
}

export default EditAd