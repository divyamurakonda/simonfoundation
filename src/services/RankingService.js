import request from 'superagent-bluebird-promise';
import urljoin from 'url-join';

class RankingServiceClass {

  getRanking = (form) => {
    const dob = form.dob;
    const gender = form.gender;
    const url = 'http://api.population.io/1.0/wp-rank/';
    return Promise.resolve(
     request
        .get(urljoin(url, dob, gender, 'United States', 'today'))
        .send()
        .then((response) => {
          console.log('result', response.body);
          let ranking = response.body;
          return ranking;
        })
    );
  }
}
const RankingService = new RankingServiceClass();
export default RankingService;
