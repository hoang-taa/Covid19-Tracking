import { ICountry } from './../models/Country';
import axios from 'axios';

export const getCountries = () => {
  return axios.get('https://api.covid19api.com/countries');
};
export const getReportByCountry = (country: any) => {
  return axios.get(`https://api.covid19api.com/dayone/country/${country}`);
};

export const getMapDataByCountryId = (countryId: any) =>
  import(
    `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
  );
