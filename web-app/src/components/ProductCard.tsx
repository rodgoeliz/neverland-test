import React from 'react';

import { Card, styled, Chip, Box, Typography, CardContent, CardMedia } from '@material-ui/core';
import PriceTag from './PriceTag';

const StyledChip = styled(Chip)({
  backgroundColor: '#D8D2C9',
  borderRadius: '4px',
  minWidth: '40px',
  minHeight: '12px',
});

const StyledChipContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 'auto',
  marginBottom: 'auto',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1),

  width: '17rem',
  height: '20rem',

  backgroundColor: '#FAF6F0',

  '& .MuiCardMedia-root': {
    backgroundSize: 'contain',
    height: '10rem',
    borderRadius: '14px',
  },
}));

interface ProductCardProps {
  price: { value: number; currency: string };
  plant: {
    title: string;
    subtitle: string;
    imageURL?: string;
    light: string;
    difficulty: string;
    petToxicity: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ price, plant }) => {
  return (
    <StyledCard>
      <CardContent>
        <CardMedia image={plant.imageURL} title={`image of ${plant.title}`} />
        <Typography variant="h6">{plant.title}</Typography>
        <Typography variant="caption">{plant.subtitle}</Typography>
        <StyledChipContainer>
          <StyledChip key={plant.light} label={plant.light} />
          <StyledChip key={plant.difficulty} label={plant.difficulty} />
          <StyledChip key={plant.petToxicity} label={plant.petToxicity} />
        </StyledChipContainer>
        <PriceTag currency={price.currency} value={price.value} />
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
