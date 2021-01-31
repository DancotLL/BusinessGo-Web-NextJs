import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormLabel, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ListIcon from '@material-ui/icons/List';
import PropTypes from 'prop-types';

import { fieldShape } from '../../../utils/field';
import InputGroup from '../../InputGroup';

import { getLanguage } from './lang';

const Enum = props => {
  const { field, value } = props;
  const language = getLanguage(useSelector(store => store.language));
  const [stateValue, setStateValue] = useState(value || field.default_value);

  const handleChangeValue = (index, option, valueToChange) => {
    if (!valueToChange) return;

    const newValue = stateValue.map((currentValue, i) =>
      i === index ? { ...option, value: valueToChange } : currentValue
    );

    setStateValue(newValue);
    props.onChange(newValue.filter(_value => _value));
  };

  const handleAddValue = () => {
    setStateValue([...stateValue, '']);
  };

  const handleRemoveValue = indexToRemove => {
    const newValue = stateValue.filter((_, i) => i !== indexToRemove);

    setStateValue(newValue);

    if (!stateValue[indexToRemove]) return;

    props.onChange(newValue.filter(_value => _value));
  };

  return (
    <InputGroup>
      <FormLabel component="legend">{field.name}</FormLabel>
      {stateValue.map((option, i) => (
        <TextField
          key={i}
          label={`${field.enum_name} ${i + 1}`}
          value={option.value}
          variant="outlined"
          required={field.is_required}
          style={{ width: '100%', margin: '16px 0 5px 0', display: 'inline-block' }}
          size="small"
          onChange={({ target }) => handleChangeValue(i, option, target.value)}
          InputProps={{
            style: { width: '90%' },
            endAdornment: !props.readOnly && (
              <>
                <CloseIcon style={{ cursor: 'pointer' }} onClick={() => handleRemoveValue(i)} />
              </>
            )
          }}
        />
      ))}
      {!props.readOnly && (
        <Button onClick={handleAddValue} style={{ marginTop: 8 }}>
          {language.add} {field.enum_name}
        </Button>
      )}
    </InputGroup>
  );
};

Enum.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  field: fieldShape.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

Enum.defaultProps = {
  value: [],
  readOnly: false,
  onChange: () => {}
};

export default Enum;
