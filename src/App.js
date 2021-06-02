
import { useEffect, useMemo, useState } from 'react';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import { Container, Typography } from '@material-ui/core';

import { getCountries, getReportByCountry } from './api';

import { CountrySelector, HighLight, Summary } from './components';

import '@fontsource/roboto';
import 'moment/locale/vi';

moment.locale('vi');

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then(res => {
      const countriesSort = sortBy(res.data, 'Country');
      setCountries(countriesSort);
    });
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(country => country.ISO2.toLowerCase() === selectedCountryId);
      if (Slug) {
        getReportByCountry(Slug).then(res => {
          res.data.pop();
          setReport(res.data);
        });
      }
    }
  }, [countries, selectedCountryId]);

  const handleOnChange = event => {
    setSelectedCountryId(event.target.value);
  };

   const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 1];
      return [
        {
          title: 'Số ca nhiễm',
          count: latestData.Confirmed,
          type: 'confirmed',
        },
        {
          title: 'Khỏi',
          count: latestData.Recovered,
          type: 'recovered',
        },
        {
          title: 'Tử vong',
          count: latestData.Deaths,
          type: 'death',
        },
      ];
    }
    return [];
  }, [report]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant='h2' component='h2'>
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      />
      <HighLight summary={summary} />
      <Summary report={report} selectedCountryId={selectedCountryId} />
    </Container>
  );
}

export default App;
