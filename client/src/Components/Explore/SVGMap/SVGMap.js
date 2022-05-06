import React, { useState } from 'react'
import "./style.css"
import paths from "../../../Assets/Paths/paths.js"
import { Link } from 'react-router-dom'
import bckg from "../../../Assets/Images/old-bridge.jpg"

const SVGMap = () => {
    const [regionName, setRegionName] = useState("Choose on map")


    return  (
        <div className='svg-map-container'>
            <div className='display-region-name'><p>{regionName}</p></div>
            <img src={bckg} className="svg-map-bckg"/>
            <div className='overlay'></div>

            <div className='svg-map-box'>
                <svg version="1.2" viewBox="0 0 1000 970" width='1000' xmlns="http://www.w3.org/2000/svg" className='svg-map'>
                    {paths.map(path => 
                    <Link 
                        to={`/explore/${path.region_name}`} 
                        key={path._id}
                        onMouseEnter={() => setRegionName(path.region_name)}
                        onMouseLeave={() => setRegionName("Choose on map")}
                    >
                        <path 
                            d={path.d} 
                            name={path.region_name}>
                        </path>
                    </Link>)}

                    <circle id='0' cx='295.8' cy='442.8'></circle>
                    <circle id='1' cx='298.5' cy='442.5'></circle>
                    <circle id='2' cx='293' cy='440.8'></circle>
                </svg>
            </div>
        </div>
    )
}


export default SVGMap