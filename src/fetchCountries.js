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
      .then(data => {
        resolve(data);
        // console.log(JSON.parse(data));
        console.log('data', data);
        console.log('data[0]', data[0]);
        console.log(`Name: ${data[0].name.official}`);
        console.log(`Capital: ${data[0].capital}`);
        console.log(`Population: ${data[0].population}`);
        console.log(`Flag: ${data[0].flags.svg}`);
        console.log(`Language: ${data[0].languages}`);
        console.log(`Language: ${data[0].languages}`);
      })
      .catch(err => {
        console.log('err', err);
      });
  });
}
