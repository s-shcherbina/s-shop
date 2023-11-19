import { FC, useState } from 'react';
import {
  AppBar,
  Box,
  Typography,
  IconButton,
  ClickAwayListener,
  Button,
} from '@mui/material';
import {
  AdminPanelSettingsSharp,
  Description,
  Grass,
  Phone,
  Search,
  Telegram,
  WhatsApp,
} from '@mui/icons-material';
import { blue, yellow } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Between, Flex } from '../../helpers';
import SearchInput from '../../helpers/search-input';

const SearchBar: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  const admin = true;

  return (
    <AppBar
      position='static'
      sx={{ p: 0.5, bgcolor: yellow[500], color: blue[700] }}
    >
      <Between sx={{ px: { sm: 1, lg: 2 }, height: '2.4rem' }}>
        <Flex sx={{ overflow: 'hidden' }}>
          <IconButton onClick={() => navigate('/')}>
            <Grass fontSize='large' sx={{ color: blue[700] }} />
          </IconButton>
          <Typography
            noWrap
            variant='h6'
            sx={{
              mt: 0.7,
              ml: 1,
              fontFamily: "'Lobster', cursive",
            }}
          >
            РАЙСЬКИЙ САД
          </Typography>
        </Flex>
        <Box
          sx={{
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        >
          <IconButton
            sx={{ color: blue[700] }}
            onClick={() => navigate('/contacts')}
          >
            <Telegram />
          </IconButton>
          <IconButton
            sx={{ color: blue[700] }}
            onClick={() => navigate('/contacts')}
          >
            <WhatsApp />
          </IconButton>
          <Button
            startIcon={<Phone />}
            sx={{ borderRadius: 5, color: blue[700] }}
          >
            <Typography variant='h6' noWrap>
              (066) 611 74 29
            </Typography>
          </Button>
        </Box>
        <Typography
          noWrap
          variant='h6'
          sx={{ mt: 0.5, display: { xs: 'none', lg: 'flex' } }}
        >
          Працюємо 8:00 - 21:00
        </Typography>
        <Flex sx={{ gap: 1 }}>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {buttonVisible && (
              <IconButton
                color='primary'
                onClick={() => {
                  setButtonVisible(false);
                  setSearchVisible(true);
                }}
              >
                <Search sx={{ color: blue[700] }} />
              </IconButton>
            )}
            {searchVisible && (
              <ClickAwayListener
                onClickAway={() => {
                  setSearchVisible(false);
                  setButtonVisible(true);
                }}
              >
                <Box>
                  <SearchInput />
                </Box>
              </ClickAwayListener>
            )}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <SearchInput />
          </Box>
          {admin && (
            <IconButton
              sx={{ color: blue[700] }}
              onClick={() => navigate('/admin')}
            >
              <AdminPanelSettingsSharp fontSize='small' />
            </IconButton>
          )}
          <IconButton
            sx={{ color: blue[700] }}
            onClick={() => navigate('/order-data')}
          >
            <Description fontSize='small' />
          </IconButton>
        </Flex>
      </Between>
    </AppBar>
  );
};

export default SearchBar;
