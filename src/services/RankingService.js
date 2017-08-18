import axios from 'axios';
import urljoin from 'url-join';

class RankingServiceClass {

  getRanking = (form) => {
    const dob = form.dob;
    const gender = form.gender;
    const url = 'http://api.population.io/1.0/wp-rank/';
    return axios
      .get(urljoin(url, dob, gender, 'United States', 'today'))
      .then((response) => {
        let ranking = response.data;
        return ranking;
      })
      .catch(err => {
        throw err;
      });
  }
}
const RankingService = new RankingServiceClass();
export default RankingService;
