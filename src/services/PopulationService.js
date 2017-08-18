import request from 'superagent-bluebird-promise';
import urljoin from 'url-join';

import countryService from './CountryService';

class PopulationServiceClass {

  getUSAPopulation = () => {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = yyyy + '-' + mm + '-' + dd;

    const url = 'http://api.population.io/1.0/population';
    const country = 'United States';

    return request
      .get(urljoin(url, country, today))
      .send()
      .then((response) => {
        return response.body.total_population.population;
      })
  }

  getWorldPopulation = (country, date) => {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = yyyy + '-' + mm + '-' + dd;

    const url = 'http://api.population.io/1.0/population';
    return Promise.resolve(
     request
        .get(urljoin(url, 'World', today))
        .send()
        .then((response) => {
          let population = response.body.total_population.population;
          return population;
        })
    );
  }
}

const PopulationService = new PopulationServiceClass();
export default PopulationService;
