import React, { useState, useEffect} from 'react'
import ScreenLoader from '../../../Components/General/Loaders/ScreenLoader'
import axios from 'axios'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import { Link } from 'react-router-dom'
import ArticleItem from '../../../Components/Admin/ItemsList/Item/ArticleItem'

const AllArticles = () => {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState(articles)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios({
      method: "GET",
      url: "/api/articles/all"
    })
    .then(res => {setArticles(res.data);setFilteredArticles(res.data)})
    .then(() => setLoading(false))
  }, [])


  const search = (query) => {
    if(query.length===0){ setFilteredArticles(articles);return}
    const filtered = articles.filter(article => {
      return article.title["bosnian"].toLowerCase().includes(query) || article.title["english"].toLowerCase().includes(query)
    })
    setFilteredArticles(filtered)
  }


  return (
    <div className='admin_container'>
      <AdminNavbar/>
      {loading ? <ScreenLoader/> 
          : 
          <>
            <div className='items-grid'>
              <Link to="/admin/articles/add" className='add-place-link'><i className='fas fa-plus'></i><p>NEW</p></Link>
              <input className='search-items' onChange={(e) => search(e.target.value)} placeholder='Search'/>
              {filteredArticles.map(article => <ArticleItem item={article} key={article._id}/>)}
            </div>
          </>}
    </div>
  )
}

export default AllArticles