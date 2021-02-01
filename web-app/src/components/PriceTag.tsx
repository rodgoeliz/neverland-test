import React from 'react';

import { Typography } from '@material-ui/core';

interface PriceTagProps {
  value: number;
  currency: string;
}

const SINGS: { [key: string]: string } = { usd: '$' };

const PriceTag: React.FC<PriceTagProps> = ({ value, currency }) => {
  const priceSign = SINGS[currency] || '?';
  return <Typography variant="h4">{`${priceSign}${value.toLocaleString('en-US')}`}</Typography>;
};

export default PriceTag;
