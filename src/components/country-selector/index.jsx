import { FormControl, FormHelperText, InputLabel, makeStyles, NativeSelect } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: `${theme.spacing(3)}px 0`,
    minWidth: 120,
  },
}));

const CountrySelector = ({ value, handleOnChange, countries }) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="country-selector" shrink>Quốc Gia</InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector'
                }}
            >
                {
                    countries.map(country => (
                        <option value={country.ISO2.toLowerCase()} key={country.ISO2}>
                            {country.Country}
                        </option>
                    ))
                }
            </NativeSelect>
            <FormHelperText>Lựa chọn quốc gia</FormHelperText>
        </FormControl>
    );
};

export default CountrySelector;
