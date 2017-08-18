import request from 'superagent-bluebird-promise';
import urljoin from 'url-join';

class CountryServiceClass {

  getACountryPopulationAtGivenAge = (country, age, year) => {
    const url = 'http://api.population.io/1.0/population';
    return Promise.resolve(
      request
        .get(urljoin(url, year, country, age))
        .send()
        .then(response => {
          let data = response.body[0];
          return data;
        })
    );
  }

  getCountries = () => {

    const url = 'http://api.population.io/1.0';

    return request
      .get(urljoin(url, '/countries'))
      .send()
      .then((response) => {
        return response.body.countries;
      })
      .catch(err => {
        console.log('Error', err);
      })
  }
}
const CountryService = new CountryServiceClass();
export default CountryService;
