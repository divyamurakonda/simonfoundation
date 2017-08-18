import urljoin from 'url-join';
import axios from 'axios';

class CountryServiceClass {

  getACountryPopulationAtGivenAge = (country, age, year) => {
    const url = 'http://api.population.io/1.0/population';

      return axios
        .get(urljoin(url, year, country, age))
        .then(response => {
          let data = response.data[0];
          return data;
        })
        .catch(err => {
          throw err;
        });
  }

  getCountries = () => {

    const url = 'http://api.population.io/1.0/countries';
    const request = axios.get(url);
    return request
      .then((response) => {
        return response.data.countries;
      })
      .catch(err => {
        console.log('Error', err);
        throw err;
      })
  }
}
const CountryService = new CountryServiceClass();
export default CountryService;
