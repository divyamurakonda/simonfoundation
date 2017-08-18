import React, { Component } from 'react';
import './App.css';
import PopulationPage from './components/PopulationPage';
import ShortestCountryNames from './components/ShortestCountryNames';
import Ranking from './components/Ranking';

import 'semantic-ui-css/semantic.min.css';
import {Container, Header, Segment} from 'semantic-ui-react';

class App extends Component {

  render() {

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

    today = mm + '/' + dd + '/' + yyyy;

    return (
      <Container>
        <Segment textAlign='center' color='black' inverted>
          <Header as='h2' >World Population Application</Header>
        </Segment>
        <PopulationPage />
        <ShortestCountryNames />
        <Ranking today={today} />
      </Container>
    );
  }
}

export default App;
