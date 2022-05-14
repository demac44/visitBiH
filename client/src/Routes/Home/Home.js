import React, {useContext} from 'react'
import "./style.css"

import Navbar from '../../Components/General/Navbar/Navbar'
import Banner from '../../Components/Home/Banner/Banner'
import HomeIntroText from '../../Components/Home/Home intro text/HomeIntroText'
import Footer from '../../Components/General/Footer/Footer'
import ArticlesList from '../../Components/Articles/ArticlesList/ArticlesList'
import StartExploring from '../../Components/General/StartExploring/StartExploring'

import { LangContext }from "../../index"


const Home = () => {

  const lang = useContext(LangContext)

  return (
    <div className='home-container'>
      <Navbar/>
      <Banner lang={lang}/>
      <HomeIntroText lang={lang}/>
      <ArticlesList lang={lang}/>
      <StartExploring lang={lang}/>
      <Footer/>
    </div>
  )
}

export default Home