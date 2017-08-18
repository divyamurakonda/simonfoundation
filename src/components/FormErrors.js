import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Message, Icon } from 'semantic-ui-react';

const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      console.log('fieldName', fieldName);
      if(formErrors[fieldName].length > 0){
        return (
          <Message key={i} negative>
            <Icon name='warning' /> {fieldName.toUpperCase()} {formErrors[fieldName]}
          </Message>
        )
      } else {
        return '';
      }
    })}
  </div>

  export default FormErrors;
