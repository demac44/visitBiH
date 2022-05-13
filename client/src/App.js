import './App.css';
import { Routes, Route} from "react-router-dom"
import Home from './Routes/Home/Home';
import Explore from './Routes/Explore/Explore';
import Places from './Routes/Places/Places';
import Place from './Routes/Place/Place';
import Article from './Routes/Article/Article';
import Articles from './Routes/Articles/Articles';
import About from './Routes/About/About';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  function getCookie(name) {
    let a = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`);
    return a ? a[1] : '';
  }

  useEffect(() => {
    if(!getCookie) axios({
      method: "POST",
      url: "/api/lang",
      data:{
        lang: "english"
      },
      withCredentials: true
    }).then(() => window.location.reload())
  }, [])


  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/explore/:region' element={<Places/>}/>
        <Route path='/explore/:region/:id/:place' element={<Place/>}/>
        <Route path='/article/:title' element={<Article/>}/>
        <Route path='/articles' element={<Articles/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
  );
}

export default App;
