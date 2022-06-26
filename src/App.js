import CountryCard from './CountryCard';
import Header from './Header';
import Input from './Input';
import BackToTopBtn from './BackToTopBtn';
import { useEffect, useState } from 'react';

function App() {
  
  const [countries, setCountries] = useState([]);
  const [display_countries, setDisplayCountries] = useState([]);
  const [filtered_countries, setFilteredCountries] = useState(null);
  const [filtered_value, setFilteredValue] = useState('');
  const [search_value, setSearchValue] = useState(null);

  useEffect(() => {
    // first checks if the country list was already fetched
    const country_list = JSON.parse(localStorage.getItem('countries'));    

    // if there's a country list stored, then checks if a filter has been applied
    if (country_list) {
      setCountries(country_list);
      setUpFiltered(country_list);
    } else {
      fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
          setCountries(data);
          setDisplayCountries(data);
          localStorage.setItem('countries', JSON.stringify(data));
        });
    }

    
  }, []);

  // set filtered regions
  const setUpFiltered = (countries) => {
    const filtered_name = localStorage.getItem('filtered');

    if (!filtered_name) {
      setDisplayCountries(countries);
      setFilteredValue('');
      return;
    }

    if (filtered_name === 'All') {
      setDisplayCountries(countries);
      setFilteredValue('All');
    } else {
      const newArray = countries.filter(country => country.region === filtered_name);
      setDisplayCountries(newArray);
      setFilteredValue(filtered_name);
    }
    
  }

  // search function
  const searchRegion = (e) => {
    const value = e.target.value.trim().toLowerCase();

    if (!value) {
      // set to null to display filtered regions again
      setFilteredCountries(null);
      setSearchValue(value);
      return;
    }

    setSearchValue(value);    
    const newArray = display_countries.filter(country => country.name.common.toLowerCase().includes(value));
    setFilteredCountries(newArray);   
  }
  
  // select option function
  const changeRegion = (e) => {
    // if Filter by Region is chosen
    if (e.target.value === '') {
      localStorage.setItem('filtered', e.target.value);
      setFilteredValue(e.target.value);
      return;
    }

    if (e.target.value === 'All') {
      setDisplayCountries(countries);
      localStorage.setItem('filtered', e.target.value);
      setFilteredValue(e.target.value);
      return;
    }

    const newArray = countries.filter(country => country.region === e.target.value);
    localStorage.setItem('filtered', e.target.value);
    setDisplayCountries([...newArray]);
    setFilteredValue(e.target.value);
  }

  return (
    <div className="app">
      <Header />
      <main>
        <BackToTopBtn />
        <Input searchRegion={searchRegion} changeRegion={changeRegion} filteredValue={filtered_value}/>
        <div className='country-list grid-container'>
          {filtered_countries 
            ? filtered_countries.map((country, index) => {
                return <CountryCard key={index} country={country} searchVal={search_value} />
              })
            : display_countries.map((country, index) => {
                return <CountryCard key={index} country={country} searchVal={search_value} />
              })
          }
        </div>
      </main>
    </div>
  );
}

export default App;
