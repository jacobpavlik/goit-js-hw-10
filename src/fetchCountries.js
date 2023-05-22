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
      })
      .catch(err => {
        console.log('err', err);
      });
  });
}
