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
  if (countryName === '') {
    return;
  }
  let countryPath = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
  console.log(countryName);
  console.log(countryPath);
  fetchCountries(countryPath)
    .then(countries => {
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
      console.log('z index data', countries);
      if (countries.length === 1) {
        countryInfo.innerHTML = '';
        countries.forEach((country, countryIndex) => {
          countryInfo.insertAdjacentHTML(
            'beforeend',
            `<img src="${countries[countryIndex].flags.svg}" alt="${
              countries[countryIndex].flags.alt
            }" width="90" height="57"/><span>${
              countries[countryIndex].name.official
            }</span>
          <p>Capital: ${countries[countryIndex].capital}</p>
          <p>Population: ${countries[countryIndex].population}</p>
          <p>Language: ${Object.values(countries[countryIndex].languages).join(
            ', '
          )}</p>

          `
          );
          console.log(`Name: ${countries[countryIndex].name.official}`);
          console.log(`Capital: ${countries[countryIndex].capital}`);
          console.log(`Population: ${countries[countryIndex].population}`);
          console.log(`Flag: ${countries[countryIndex].flags.svg}`);
          console.log(`Flag: ${countries.flags.svg}`);
          console.log(`Language: ${countries[countryIndex].languages.value}`);
          console.log(`Language: ${countries[countryIndex].languages}`);
          console.log(`countries length: ${countries.length}`);
        });
      } else if (countries.length > 9) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        countries.forEach((country, countryIndex) => {
          console.log(`Flag: ${countries[countryIndex].flags.svg}`);
          console.log(`Name: ${countries[countryIndex].name.official}`);
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
