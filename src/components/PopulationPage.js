import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadUSAPopulation, usaPopulationLoaded, loadWorldPopulation, worldPopulationLoaded} from '../stores/Population/actions';

import 'semantic-ui-css/semantic.min.css';
import {Header, Segment, Statistic} from 'semantic-ui-react';

class PopulationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      population: ''
    }
  }

  componentDidMount() {
    this.props.loadUSAPopulation();
    this.props.loadWorldPopulation();
  }

  render() {

    return(
      <div>
        <Segment.Group horizontal >
          <Segment textAlign='center'>
            <Header as='h3'>
              World Population
              <Header.Subheader>As of Today</Header.Subheader>
            </Header>
            <Statistic size='tiny' color='blue' value={this.props.worldPopulation} />
          </Segment>
          <Segment textAlign='center'>
            <Header as='h3'>
              USA Population
              <Header.Subheader>As of Today</Header.Subheader>
            </Header>
            <Statistic size='tiny' color='blue' value={this.props.usaPopulation} />
          </Segment>
        </Segment.Group>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const population = state.get('population');
  return {
    usaPopulation: population.get('usaPopulation'),
    worldPopulation: population.get('worldPopulation'),
  };
};

const mapActionCreatorstoProps = (dispatch) => {
  return bindActionCreators({loadUSAPopulation, usaPopulationLoaded, loadWorldPopulation, worldPopulationLoaded}, dispatch);
};

export default connect(mapStateToProps, mapActionCreatorstoProps)(PopulationPage);
