import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const searchBoxText = searchBox.value.trim(); //nie działa !!
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

console.log(countryInfo);
console.log(countryList);

function handleInput() {
  let countryName = 'Poland';
  countryName = searchBox.value;
  let countryPath = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
  console.log(countryName);
  console.log(countryPath);
  fetchCountries(countryPath)
    .then(countries => {
      console.log('z index data', countries);
      countries.forEach((country, countryIndex) => {
        console.log(`Name: ${countries[countryIndex].name.official}`);
        console.log(`Capital: ${countries[countryIndex].capital}`);
        console.log(`Population: ${countries[countryIndex].population}`);
        console.log(`Flag: ${countries[countryIndex].flags.svg}`);
        console.log(`Language: ${countries[countryIndex].languages.value}`);
        console.log(`Language: ${countries[countryIndex].languages}`);
        // console.log(country, countryIndex);
      });
    })
    .catch(err =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}
searchBox.addEventListener(
  'input',
  debounce(() => {
    //  console.log(searchBoxText); // nie działa !!
    handleInput();
    console.log(document.querySelector('#search-box').value.trim());
  }, DEBOUNCE_DELAY)
);

// fetchCountries(searchBoxText); //wyświetla tablicę krajów

console.log(
  Notiflix.Notify.failure('Oops, there is no country with that name')
);

console.log(
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  )
);

// console.log(Notiflix.Notify.success('GREEN'));
// console.log(Notiflix.Notify.warning('YELLOW'));
