import axios from 'axios'
import React, { useState } from 'react'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import ScreenLoader from '../../../Components/General/Loaders/ScreenLoader'

const AddAd = () => {
    const [loading, setLoading] = useState(false)
    const [adImg, setAdImg] = useState(null)
    const [adType, setAdType] = useState("articles-ad")

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

        const adImageUrl = await uploadAd()

        await axios({
            method: "POST",
            url: '/api/ads/add',
            data:{
                image: adImageUrl,
                owner: e.target.ad_owner.value,
                url: e.target.ad_url.value,
                type: adType,
                region: e.target?.region?.value || ""
            },
            withCredentials: true
          })
          .then(() =>{setLoading(false); window.location.href = "/admin/ads"})
          .catch(err => console.log(err))

    }


    return (
        <div className='admin_container'>
            <AdminNavbar/>
            {loading ? <ScreenLoader/> : 
            <div className='admin_main'>
                <div className='admin_section_title'>
                    <h2>
                    ADD NEW AD
                    </h2>
                </div>
                <form method='POST' onSubmit={onSubmit} className="admin_add_form">

                    <input required name='ad_url' id='ad_url' placeholder='Ad URL'/>    
                    <input required name='ad_owner' id='ad_owner' placeholder='Ad owner'/>    

                    <select name='ad_type' id='ad_type' onChange={(e) => setAdType(e.target.value)}>
                        <option value="articles-ad">Articles ad</option>
                        <option value="region-ad">Region ad</option>
                    </select>

                    {adType === "region-ad" && <select name='region' required>
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

                    <label htmlFor='banner'>Add ad image: </label>
                    <input required type="file" id='banner' name='banner' accept='image/*' multiple={false} onChange={(e)=>setAdImg(e.target.files[0])}/>


                    <button type='submit' className='admin_add_btn'>ADD</button>                                   
                </form>
            </div>}
        </div>  
        )
}

export default AddAd