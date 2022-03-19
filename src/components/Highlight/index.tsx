import { Grid } from '@material-ui/core';
import React, { FC, useMemo } from 'react';
import HighlightCard from './HighlightCard';
interface HighlightProps {
  report: any;
}
const Highlight: FC<HighlightProps> = ({ report }) => {
  const dataNewestDay =
    report && report.length ? report[report.length - 1] : [];
  const summary = useMemo(() => {
    if (report && report.length) {
      return [
        {
          title: 'Số ca nhiễm',
          count: dataNewestDay.Confirmed,
          type: 'confirmed',
        },
        {
          title: 'Khỏi',
          count: dataNewestDay.Active,
          type: 'recovered',
        },
        {
          title: 'Tử vong',
          count: dataNewestDay.Deaths,
          type: 'death',
        },
      ];
    }
    return [];
  }, [report]);
  return (
    <Grid container spacing={3}>
      {summary.map((item) => {
        return (
          <Grid item sm={4} xs={12} key={item.type}>
            <HighlightCard
              title={item.title}
              count={item.count}
              type={item.type}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default React.memo(Highlight);
