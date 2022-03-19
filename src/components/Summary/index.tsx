import { Grid } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { getMapDataByCountryId } from '../../apis/countryApi';
import HighMap from '../Charts/HighMap';
import LineChart from '../Charts/LineChart';

interface SummaryProps {
  report: any;
  selectedCountryId: any;
}
const Summary: FC<SummaryProps> = ({ report, selectedCountryId }) => {
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (selectedCountryId) {
      getMapDataByCountryId(selectedCountryId)
        .then((res) => {
          setMapData(res);
        })
        .catch((err) => console.log({ err }));
    }
  }, [selectedCountryId]);
  return (
    <div style={{ marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMap mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Summary);
