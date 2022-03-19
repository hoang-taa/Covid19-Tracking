import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import CountUp from 'react-countup';
interface HighlightCardProps {
  title: string;
  count: number;
  type: string;
}

const useStyles = makeStyles({
  wrapper: (props: any) => {
    if (props.type === 'confirmed') return { borderLeft: '5px solid red' };
    if (props.type === 'recovered') return { borderLeft: '5px solid green' };
    else return { borderLeft: '5px solid gray' };
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  count: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const HighlightCard: FC<HighlightCardProps> = ({ title, count, type }) => {
  const styles = useStyles({ type });
  return (
    <Card className={styles.wrapper}>
      <CardContent>
        <Typography component='p' variant='body2' className={styles.title}>
          {title}
        </Typography>
        <Typography component='span' variant='body2' className={styles.count}>
          <CountUp end={count} duration={2} separator=' ' />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HighlightCard;
