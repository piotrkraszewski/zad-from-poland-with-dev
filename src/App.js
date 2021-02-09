import { useState, useEffect } from 'react'
import './styles/main.scss'
import { AppContext } from './AppFiles/AppContext'
import axios from 'axios'
import Cards from './AppFiles/Cards'
import SearchBar from './AppFiles/SearchBar'
import BgGreen from './images/BgGreen.jpg'

export default function App () {

// ==== Fetch onStart ====
  const [searchRes, setSearchRes] = useState()
  const [searchbarText, setSearchbarText] = useState('')
  
  async function fetchStartPage() {
    const response = await axios.get(`https://www.omdbapi.com/?s=star+wars&apikey=b4ce7e92`)
    setSearchRes(response.data.Search)
  }
  
  // if search is empty app display star wars results 
  // loads at page starup because searchbarText === '' at start
  // checks this condition every time
  useEffect(() => {
    if(searchbarText === '' ){fetchStartPage()} 
  }, [searchbarText])
// ==== END Fetch StartPage ====


// ==== Search state and functions ====

  const handleChange = e => {
    setSearchbarText(e.target.value)
    searchOMDB(e.target.value)
  }

  const searchOMDB = (value)=>{
    // prevents error of whitespace at the end of search str so you can write "star wars"
    while(value.lastIndexOf(" ") >= 0)
      value = value.substring(0, value.lastIndexOf(" "))
    
    console.log('value:' + value)

    if (value.length > 2) {
      const url = `https://www.omdbapi.com/?s=${value}&apikey=b4ce7e92`
      axios.get(url).then(response => {
        setSearchRes(response.data.Search)
      })
    } 
  }
// ==== END Search state and functions ====


// ==== Console log stuff ====

  useEffect(() => {
    console.log({searchRes})
  }, [searchRes])

  useEffect(() => {
    console.log(`searchbarText: ${searchbarText}`)
  }, [searchbarText])

// ==== END Console log stuff ====



return (
  <div>
    {/* I know that context is uncessary and I can just pass props but I thought that I show that I can use it */}
    <AppContext.Provider 
      value={{ searchbarText, searchRes, handleChange }}
    >
      <SearchBar/>
      <Cards/>
    </AppContext.Provider>

    <div className='BgGradient'/>
    <img src={BgGreen} className='BgImage'/>
  </div>
)
}