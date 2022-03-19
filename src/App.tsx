import { Container, Typography } from '@material-ui/core';
import { sortBy } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './apis/countryApi';
import CountrySelector from './components/CountrySelector';
import Highlight from './components/Highlight';
import Summary from './components/Summary';
import { ICountry } from './models/Country';
import 'moment/locale/vi';

moment.locale('vi');

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]); //Du lieu report cua each country
  useEffect(() => {
    getCountries().then((response) => {
      const countriesSort: any = sortBy(response.data, 'Country');
      setCountries(countriesSort);
      setSelectedCountryId('vn');
    });
  }, []);

  const handleOnChange = React.useCallback((e: any) => {
    setSelectedCountryId(e.target.value);
  }, []);
  useEffect(() => {
    const country = countries.find(
      (country: ICountry) => country.ISO2.toLowerCase() === selectedCountryId
    );
    if (!country) return;
    if (selectedCountryId) {
      const { Slug } = country;
      getReportByCountry(Slug).then((response) => {
        //Remove item cuoi vi item cuoi la newest updated day, chưa confirm đủ
        response.data.pop();
        setReport(response.data);
      });
    }
  }, [countries, selectedCountryId]);
  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant='h2' component='h2'>
        Số liệu Covid 19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      />
      <Highlight report={report} />
      <Summary report={report} selectedCountryId={selectedCountryId} />
    </Container>
  );
}

export default App;
