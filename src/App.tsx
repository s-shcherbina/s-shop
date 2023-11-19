import { createContext, useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from './pages/admin';
import Layout from './components/layout';
import { pages } from './common/moks';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AdminRoute, AuthRoute } from './utils/private-routes';
import axios from 'axios';
import { API_URL } from './utils/axios';
import { useAppDispatch } from './utils/hooks';
import { IAuthResponse } from './common/types';
import { login } from './store/slices/authSlice';
// import OrderData from './pages/order-data';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  // const auth = useAuth();
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  // const checkAuth = async () => {
  //   try {
  //     const user = await axios.get<IAuthResponse>(`${API_URL}auth/refresh`, {
  //       withCredentials: true,
  //     });
  //     console.log(user.data.userData.phone);
  //     localStorage.setItem('token', user.data.accessToken);
  //     dispatch(login(user.data));
  //   } catch (e: any) {
  //     console.log(e.response?.data?.message);
  //   }
  // };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        try {
          const user = await axios.get<IAuthResponse>(
            `${API_URL}auth/refresh`,
            {
              withCredentials: true,
            }
          );
          console.log(user.data.userData.phone);
          localStorage.setItem('token', user.data.accessToken);
          dispatch(login(user.data));
        } catch (e: any) {
          console.log(e.response?.data?.message);
        }
      })();
    }
    // checkAuth();
  }, [dispatch]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            {/* {auth ? (
              <> */}
            <Route element={<AuthRoute />}>
              <Route path='admin' element={<Admin />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path='admin' element={<Admin />} />
            </Route>{' '}
            {/* </>
            ) : (
              <Route element={<OrderData />} />
            )} */}
            {pages.map((page) => (
              <Route key={page.path} path={page.path} element={page.element} />
            ))}
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
