import { FC } from 'react';

import { items } from '../common/moks';
// import SliderFade from '../components/sliders/slider-fade';
import { Box, Grow } from '@mui/material';
import SliderFade from '../sliders/slider-fade';
const HomePage: FC = (): JSX.Element => {
  return (
    <Grow in={true}>
      <Box>
        <SliderFade items={items} />
      </Box>
    </Grow>
  );
};

export default HomePage;
