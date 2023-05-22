import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const searchBoxText = searchBox.value.trim();
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function handleInput() {
  let countryName = 'Poland';
  countryName = searchBox.value;
  if (countryName === '') {
    return;
  }
  let countryPath = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
  fetchCountries(countryPath)
    .then(countries => {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      if (countries.length === 1) {
        countryInfo.innerHTML = '';
        countries.forEach((country, countryIndex) => {
          countryInfo.insertAdjacentHTML(
            'beforeend',
            `<img src="${countries[countryIndex].flags.svg}" alt="${
              countries[countryIndex].flags.alt
            }" width="180" height="110"/><span class=country-info__name>${
              countries[countryIndex].name.official
            }</span>
          <p><span class="country-info__title">Capital:</span> ${
            countries[countryIndex].capital
          }</p>
          <p><span class="country-info__title">Population:</span> ${
            countries[countryIndex].population
          }</p>
          <p><span class="country-info__title">Language:</span> ${Object.values(
            countries[countryIndex].languages
          ).join(', ')}</p>

          `
          );
        });
      } else if (countries.length > 9) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        countries.forEach((country, countryIndex) => {
          countryList.insertAdjacentHTML(
            'beforeend',
            `<li class="country-list__item">
                     <img class="country-list__image" src="${countries[countryIndex].flags.svg}" alt="${countries[countryIndex].flags.alt}" width="90" height="57"/>
            <span class="country-list__name">${countries[countryIndex].name.official}</span> 
            </li>
          `
          );
        });
      }
    })
    .catch(err =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}
searchBox.addEventListener(
  'input',
  debounce(() => {
    handleInput();
  }, DEBOUNCE_DELAY)
);
