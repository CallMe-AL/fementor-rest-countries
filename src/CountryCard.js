import React from 'react';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country, searchVal }) => {

  const [load, setLoad] = useState(false);
  const card = useRef(null);

  useEffect(() => {

    // setting up intersection observer
    let options = {
      root: null, // browser viewport
      rootMargin: '50px',
      threshold: 1.0
    }

    // setting up the callback
    const loadCountry = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // once intersection occurs, set the load to true so content renders within the card
          setLoad(true);
          observer.disconnect();
        }
      })
    }

    let observer = new IntersectionObserver(loadCountry, options);
    observer.observe(card.current);

  }, []);

  const checkMatch = (name) => {
    // functionality from here:
    // https://stackoverflow.com/questions/39171718/highlight-matched-letters-words-in-a-search-list-using-reactjs
    let regex = new RegExp(searchVal, "gi");
    let match = name.match(regex);

    if (match != null) {
      // splits name into two substrings, taking out the matched string
      // array with two indices: first is substring before the match, second is substring after the match
      // each index can be "" if the matched term is the beginning/end of the name
      // ex: match = "Ger" in Germany
      // parts array: ["", "many"]
      let parts = name.split(match[0], 2)

      return <div>{parts[0]}<mark>{match[0]}</mark>{parts[1]}</div>
    } else {
      return name;
    }
  }

  return (
    <article className='country-card' ref={card}>
      {
        load &&
        <Link to={`/country/${country.cca3}`} state={{ country: country }} className="country-link">
          <div className='country-img-container'>
            <img className="country-img" src={country.flags.svg ? country.flags.svg : country.flags.png} alt={`Flag of ${country.name.common}`}/>
          </div>
          <div className="card-content">
            <h2>{searchVal 
                  ? checkMatch(country.name.common)
                  : country.name.common
                }
            </h2>
            <p>Population: <span className="population">{country.population}</span></p>
            <p>Region: <span className="region">{country.region}</span></p>
            <p>Capital: <span className="capital">{country.capital ? country.capital[0] : 'No capital listed'}</span></p>
          </div>
        </Link>
      }
    </article>
  )
}

export default CountryCard