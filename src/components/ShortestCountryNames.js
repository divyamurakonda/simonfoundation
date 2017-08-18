import React, {Component} from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadShortCountryNames, selectItem} from '../stores/Country/actions';

import 'semantic-ui-css/semantic.min.css';
import {Header, Segment, Button, List, Grid, Statistic} from 'semantic-ui-react';

class ShortestCountryNames extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadShortNames: false,
      namesLoaded: false,
      selectedItems: this.props.selectedItems,
    };
  }

  handleClick = () => {
    this.props.loadShortCountryNames();
    this.setState({ shortCountryNames: this.props.shortCountryNames, namesLoaded: true });
  }

  handleItemClick = (e, data) => {
    let isItem = this.props.selectedItems.length > 0 && _.filter(this.props.selectedItems, (item) => {
      return item.country === data.value;
    });
    let isSelected = isItem.length === 1 && true;
    if(this.props.selectedItems.length > 0) {
      !isSelected && this.props.selectItem(data.value);
    } else if(this.props.selectedItems.length === 0){
      this.props.selectItem(data.value)
    }
  }

  makeList = (country, i) => {
    let isItem = this.props.selectedItems.length > 0 && _.filter(this.props.selectedItems, (item) => {
      return item.country === country;
    });
    let isSelected = isItem.length === 1 && true;

    const itemStyle = {
      border: 'solid 1px #eee',
      color: 'black'
    };
    const gridRow = {
      marginBottom: '10px'
    };

    return <List.Item key={i} value={country} onClick={this.handleItemClick} style={itemStyle}>
              <Grid padded relaxed columns={2}>
                <Grid.Column stretched>
                  <Grid.Row style={gridRow}>
                    {country}
                  </Grid.Row>
                  {isSelected ?
                    <Grid.Row>
                      Total Population: {isItem[0].total}
                    </Grid.Row>
                  : <Grid.Row></Grid.Row>}
                </Grid.Column>
                {isSelected ?
                  <Grid.Column stretched >
                    <Grid.Row style={gridRow}>
                      Male Population: {isItem[0].males}
                    </Grid.Row>
                    <Grid.Row>
                      Female Population: {isItem[0].females}
                    </Grid.Row>
                  </Grid.Column>
                  : <div></div>
                }
              </Grid>
            </List.Item>
  }

  render() {
    let countries = this.props.shortCountryNames;
    let {selectedItems} = this.props;

    let list = [];
    countries && countries.map((country, i) => {
      list.push(this.makeList(country, i));
    });

    let totalPopulation = 0;
    let count = 0;
    selectedItems.length !== 0 && selectedItems.forEach(item => {
      totalPopulation +=item.total;
      count++;
    });

    const statistic = {
      marginLeft: '18px'
    };

    return (
      <div>
        <Segment >
          <Header textAlign='center' as='h3'>
            Shortest Country Names
            <Header.Subheader>Populations of countries with shortest names</Header.Subheader>
          </Header>
          <div style={{ textAlign: 'center' }}>
            <Button primary onClick = {this.handleClick} >Fetch</Button>
          </div>
          {this.state.namesLoaded ?
              <div>
                <Segment.Group horizontal>
                  <Segment>
                    Total Population of Countries:
                    <Statistic size='mini' value={totalPopulation} color='blue' style={statistic} />
                  </Segment>
                  <Segment>
                    Number of Countries:
                    <Statistic size='mini' value={count} color='blue' style={statistic} />
                  </Segment>
                </Segment.Group>
              {
                countries &&
                (<List animated selection relaxed>
                  {list}
                </List>)
              }
              </div>
            : <div></div>
          }

        </Segment>
      </div>
    );
  }
}

function mapStateToProps (state){
  const country = state.get('country').toJS();
  return {
    shortCountryNames: country.shortCountryNames,
    selectedItems: country.selectedItems,
  };
};

function mapActionCreatorstoProps(dispatch) {
  return bindActionCreators({loadShortCountryNames, selectItem}, dispatch);
};

export default connect(mapStateToProps, mapActionCreatorstoProps)(ShortestCountryNames);
