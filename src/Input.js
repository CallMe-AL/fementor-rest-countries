import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Input = ({ searchRegion, changeRegion, filteredValue }) => {

  return (
    <div className='input-section'>
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <div className="search-field">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
          <label htmlFor="country" className='sr-only'>Search for a country</label>
          <input 
            className='search-input'
            type="search" 
            id='country' 
            name='country' 
            placeholder='Search for a country...'
            onChange={searchRegion}
          />
        </div>
      </form>
      <form className="select-form" onSubmit={(e) => e.preventDefault()}>
        <div className="select-field">
          <FontAwesomeIcon icon={faChevronDown} className="chevron-icon"/>
          <label htmlFor="region" className='sr-only'>Filter by Region</label>
          <select 
            className='select-region'
            type="search" 
            id='region' 
            name='region' 
            onChange={changeRegion}
            value={filteredValue}
          >
            <option value="">Filter by Region</option>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Input