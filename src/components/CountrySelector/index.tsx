import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  NativeSelect,
} from '@material-ui/core';
import { FC } from 'react';
import { ICountry } from '../../models/Country';

interface CountrySelectorProps {
  countries: any;
  handleOnChange: any;
  value: string;
}

const CountrySelector: FC<CountrySelectorProps> = ({
  handleOnChange,
  countries,
  value,
}) => {
  return (
    <FormControl>
      <InputLabel htmlFor='country-selector' shrink>
        Country
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleOnChange}
        inputProps={{ name: 'country', id: 'country-selector' }}
      >
        {countries.map((country: ICountry) => {
          return (
            <option value={country.ISO2.toLowerCase()} key={country.ISO2}>
              {country.Country}
            </option>
          );
        })}
      </NativeSelect>
      <FormHelperText>Please choose country option</FormHelperText>
    </FormControl>
  );
};

export default CountrySelector;
