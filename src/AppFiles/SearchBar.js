import { useContext } from 'react'
import '../styles/main.scss'
import { AppContext } from './AppContext'

export default function StartPageSearch() {
  const {searchbarText, handleChange} = useContext(AppContext)

  return (
    <div className={'col-lg-6 col-md-8 col-sm-9 col-12 searchBar '}>
      <div className='row'>
        <div className='col-12' >
          <form onSubmit={e => { e.preventDefault()}}>
            <input
              onChange={handleChange}
              className={'myForm'}
              type='text'
              placeholder='Search Movie Title...'
              value={searchbarText}
            />
          </form>
        </div>
      </div>
    </div>
  )
}