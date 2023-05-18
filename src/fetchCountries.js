export function fetchCountries(name) {
  return new Promise((resolve, reject) => {
    fetch(name)
      .then(response => {
        console.log(`response status: ${response.status}`, response);
        if (!response.ok) {
          reject(`Error code ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then(countries => {
        resolve(countries);
        // console.log(JSON.parse(data));
        // console.log('z fetch data', countries);
        // console.log('data[0]', countries[0]);
        // console.log(`Name: ${countries[0].name.official}`);
        // console.log(`Capital: ${countries[0].capital}`);
        // console.log(`Population: ${countries[0].population}`);
        // console.log(`Flag: ${countries[0].flags.svg}`);
        // console.log(`Language: ${countries[0].languages.value}`);
        // console.log(`Language: ${countries[0].languages}`);
      })
      .catch(err => {
        console.log('err', err);
      });
  });
}
