import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';
import React, { FC, useEffect, useRef, useState } from 'react';
//Loading config highchart modules
highchartsMap(Highcharts);
const initOptions = {
  chart: {
    height: '500',
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, '#FFC4AA'],
      [0.4, '#FF8A66'],
      [0.6, '#FF392B'],
      [0.8, '#B71525'],
      [1, '	#7A0826'],
    ],
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
  },
  series: [
    {
      mapData: {}, //Object JSOn tuong ung vs each country
      name: 'Dân số',
      joinBy: ['hc-key', 'key'],
    },
  ],
};

interface HighMapProps {
  mapData: any;
}
interface ChartRef {
  current: any;
}
const HighMap: FC<HighMapProps> = ({ mapData }) => {
  const [options, setOptions] = useState({});
  const chartRef: ChartRef = useRef(null);
  const [configLoaded, setConfigLoaded] = useState(false);
  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const fakeData: any = mapData.features.map(
        (feature: any, index: any) => ({
          key: feature.properties['hc-key'],
          value: index,
        })
      );
      setOptions({
        ...initOptions,
        title: {
          text: mapData.title,
        },
        series: [
          { ...initOptions.series[0], mapData: mapData, data: fakeData },
        ],
      });
      if (!configLoaded) {
        setConfigLoaded(true);
      }
    }
  }, [mapData, configLoaded]);
  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData,
      });
    }
  }, [options, mapData]);

  if (!configLoaded) return null;
  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={cloneDeep(options)}
        constructorType={'mapChart'}
        ref={chartRef}
      />
    </>
  );
};

export default React.memo(HighMap);
