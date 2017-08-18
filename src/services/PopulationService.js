import urljoin from 'url-join';
import axios from 'axios';
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

    return axios
      .get(urljoin(url, country, today))
      .then((response) => {
        return response.data.total_population.population;
      })
      .catch(err => {
        throw err;
      });
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
    return axios
    .get(urljoin(url, 'World', today))
    .then((response) => {
      let population = response.data.total_population.population;
      return population;
    })
    .catch(err => {
      throw err;
    });
  }
}

const PopulationService = new PopulationServiceClass();
export default PopulationService;
