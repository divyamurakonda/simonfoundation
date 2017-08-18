import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Header, Segment, Form, Select, Input, Button, Grid, Statistic} from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadRanking} from '../stores/Ranking/actions';

import FormErrors from './FormErrors';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dob: '',
      gender: '',
      formErrors: {dob: '', gender: ''},
      dobValid: false,
      genderValid: false,
      formValid: false,
      showErrors: false
    }
  }

  handleInputChange = (e, data) => {
    const key = data.name;
    this.setState({[key]: data.value},
                () => { this.validateField(key, data.value) });
  }

  validateField(fieldName, value) {

    let fieldValidationErrors = this.state.formErrors;
    let showErrors = this.state.showErrors;
    let dobValid = this.state.dobValid;
    let genderValid = this.state.genderValid;
    let maxDate = new Date(this.props.today).getTime();
    let givenDate = new Date(value).getTime();

    switch(fieldName) {
      case 'dob':
        dobValid = givenDate <= maxDate ? true : false;
        fieldValidationErrors.dob = dobValid ? '' : ' is invalid';
        break;
      case 'gender':
        genderValid = value.length > 0;
        fieldValidationErrors.gender = genderValid ? '': 'is required';
        break;
      default:
        break;
    }
    showErrors = !dobValid;
    this.setState({
      formErrors: fieldValidationErrors,
      dobValid: dobValid,
      genderValid: genderValid,
      showErrors: showErrors
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.dobValid && this.state.genderValid
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = {};
    const {dob, gender} = this.state;
    form.dob = dob;
    form.gender = gender;
    console.log('This is the form being submitted', form);
    this.props.loadRanking(form);
  }

  handleClear = () => {
    this.setState({
      dob: '',
      gender: '',
      showErrors: false,
      formErrors: {dob: '', gender: ''},
      dobValid: false,
      genderValid: false,
      formValid: false,
    });
  }

  render() {

    const genderOptions = [
      {key: 1, value: 'female', text: 'Female'},
      {key: 2, value: 'male', text: 'Male'},
      {key: 3, value: 'unisex', text: 'Unisex'}
    ];

    const gridRow = {
      marginBottom: '10px'
    };

    return (
      <Segment.Group>
        <Segment textAlign='center' >
          <Header as='h3'>
            Check Your Ranking
            <Header.Subheader>Enter your information to check where you rank</Header.Subheader>
          </Header>
        </Segment>
        {this.state.showErrors ?
          <Segment>
            <FormErrors formErrors={this.state.formErrors} />
          </Segment>
          :<div></div>
        }
        <Segment >
          <Form >
            <Form.Group widths='equal'>
              <Form.Field
                required
                label='Date of Birth'
                name='dob'
                control={Input}
                value={this.state.dob}
                onChange={this.handleInputChange}
                type='date'
                max={this.props.today}
              />
              <Form.Field
                required
                label='Gender'
                name='gender'
                control={Select}
                value={this.state.gender}
                onChange={this.handleInputChange}
                options={genderOptions}
              />
            </Form.Group>
            <div style={{textAlign: 'center', marginBottom: '10px'}}>
              <Button positive onClick={this.handleSubmit} disabled={!this.state.formValid}> Submit </Button>
            </div>
          </Form>
          <div style={{textAlign: 'center'}}>
            <Button negative onClick={this.handleClear}>Clear</Button>
          </div>
        </Segment>
        {this.props.ranking ?
          <Segment>
            <Grid padded relaxed columns={2}>
              <Grid.Column stretched>
                <Grid.Row style={gridRow}>
                  <label>DOB: </label>
                  {this.props.ranking.dob}
                </Grid.Row>
                <Grid.Row style={gridRow}>
                  <label>Gender:</label>
                  {this.props.ranking.sex}
                </Grid.Row>
              </Grid.Column>
              <Grid.Column stretched>
                <Grid.Row style={gridRow}>
                  <Header as='h3'> Your rank in the world</Header>
                </Grid.Row>
                <Grid.Row style={gridRow}>
                  <label>Your are ranked </label>
                  <Statistic size='mini' color='blue'>
                    <Statistic.Value>{this.props.ranking.rank}</Statistic.Value>
                  </Statistic>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Segment>
          : <div></div>
        }
      </Segment.Group>
    );
  }
}

function mapStateToProps (state){
  const ranking = state.get('ranking').toJS();
  return {
    ranking: ranking.rank
  };
};

function mapActionCreatorstoProps(dispatch) {
  return bindActionCreators({loadRanking}, dispatch);
};

export default connect(mapStateToProps, mapActionCreatorstoProps)(Ranking);
