import { useContext } from 'react'
import '../styles/main.scss'
import { AppContext } from './AppContext'
import { motion, AnimatePresence } from "framer-motion"
import no_image from '../images/no_image.png'


export default function FullscreenSearch() {
  const {searchRes} = useContext(AppContext)

  const addDefaultSrc = ev => {
    ev.target.src = no_image
  }

  return (
    <div className='cardsContainer'>
      <div className='cards'>
        <AnimatePresence exitBeforeEnter>
          <motion.div 
            key={searchRes !== undefined && searchRes[0].Title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            className='row'
          > 
          {searchRes  
            ? searchRes.map((item) => 
              <div className='cardContainer col-xl-2 col-md-3 col-4'>
                <div className='card' key={item.Title}>
                  <img 
                    className='posterImage' 
                    src={item.Poster} 
                    onError={addDefaultSrc} // when Image from link doesn't exist
                    alt='poster image' 
                  />
                  <h1 className='cardTitle'>{item.Title}</h1>
                </div>
              </div>
            )
            : <p className='text'>no resluts</p>
          }
          </motion.div>
        </AnimatePresence>
      </div>
  </div>
  )
}