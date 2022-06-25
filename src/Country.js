import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const Country = () => {

  const [current_country, setCurrentCountry] = useState(null);
  const [currencies, setCurrency] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [border_countries, setBorderCountries] = useState(null);
  const [params, setParams] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  let parameters = useParams();

  useEffect(() => {
    setParams(parameters);
    setError(false);
  }, []);

  useEffect(() => {
    if (!params) return;

    // if someone enters the page without selecting a country first
    if (params.countryName) {
      console.log('ok!')
      fetch(`https://restcountries.com/v3.1/alpha/${params.countryName}`)
        .then(res => {
            if (res.status === 500) {
              setError(true);
              return;
            } else {
              return res.json();
            }
          })
        .then(data => {
          // returns an array, takes first value
          updateCountry(data[0]);
        });
    } 

  }, [params]);

  useEffect(() => {
    if (!location.state) return;

    const { country, border } = location.state;
    console.log('country: ', country)
    if (!country) {
      fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then(res => res.json())
        .then(data => {
          // returns an array, takes first value
          updateCountry(data[0]);
        });
    } else {
      updateCountry(country);
    }
    
    // ***TODO SETUP LOCAL STORAGE***    

  }, [location]);

  const updateCountry = (region) => {
    // retrieving the native name (depends on language, so we use object.key)
    // console.log(country.name.nativeName[Object.keys(country.name.nativeName)[0]].official)

    // Determining currency length
    // console.log('currency: ', Object.keys(country.currencies).length)

    // Set up the current country
    setCurrentCountry(region);

    // Setting currency/currencies
    let currencyArray = [];
    for (let key of Object.keys(region.currencies)) {
      currencyArray.push(region.currencies[key].name);
    }
    setCurrency(currencyArray.join(', '));

    // Determining languages
    let langArray = [];
    for (let lang of Object.keys(region.languages)) {
      langArray.push(region.languages[lang]);
    }
    setLanguages(langArray.join(', '));

    // Border countries
    setBorderCountries(region.borders);
  }

  if (error) {
    return (
      <>
        <Header />
        <div>No country :(</div>  
        <Link to='/' className='border-link link-styles back-link flex'>
          <FontAwesomeIcon icon={faArrowLeftLong} />
          Back
        </Link>    
      </>
    )
  }

  return (
    <>
      <Header />      
      {
        current_country && 
          <div className="main-country-wrap">
            <Link to='/' className='back-link link-styles flex'>
              <FontAwesomeIcon icon={faArrowLeftLong} className='back-arrow'/>
              Back
            </Link>
            <div className='inner-country-wrap grid-container'>
              <img 
                src={current_country.flags.svg ? current_country.flags.svg : current_country.flags.png} 
                alt={`Flag of ${current_country.name.common}`} 
              />
              <article>
                <h2>{current_country.name.common}</h2>
                <div className="country-info-wrap flex">
                  <div className="country-info info-left">
                    <p><span>Native name: </span>{current_country.name.nativeName[Object.keys(current_country.name.nativeName)[0]].official}</p>
                    <p><span>Population: </span>{current_country.population}</p>
                    <p><span>Region: </span>{current_country.region}</p>
                    <p><span>Sub region: </span>{current_country.subregion}</p>
                    <p><span>Capital: </span>{current_country.capital ? current_country.capital[0] : 'No capital listed'}</p>
                  </div>
                  <div className="country-info info-right">
                    <p><span>Top Level Domain: </span>{current_country.tld[0]}</p>
                    <p><span>{Object.keys(current_country.currencies).length === 1 ? 'Currency: ' : 'Currencies: '}</span>{currencies && currencies}</p>
                    <p><span>{Object.keys(current_country.languages).length === 1 ? 'Language: ' : 'Languages: '}</span>{languages}</p>
                  </div>
                </div>
                <div className="border-countries">
                  <h3>Border Countries: 
                    <span className='border-link-container'>
                      {
                        border_countries  
                          ? border_countries.map(border => {
                              return <Link 
                                        to={`/country/${border}`} 
                                        state={{ border: border }} 
                                        key={border}
                                        className='border-link link-styles'
                                      >                                      
                                      {border}
                                      </Link>
                            })
                          : 'None'
                      }
                    </span>
                  </h3>
                </div>
              </article>
            </div>
          </div>
      }
    </>
    
  )
}

export default Country