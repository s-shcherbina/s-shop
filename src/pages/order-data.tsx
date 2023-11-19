import { Box, Button, Stack, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { Center } from '../helpers';
import $instance from '../utils/axios';
import { useAppDispatch, useAppSelector, useAuth } from '../utils/hooks';
import { login, logout } from '../store/slices/authSlice';
import { IAuthResponse, IUser } from '../common/types';
import { useNavigate } from 'react-router-dom';

const OrderData: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAuth();
  const user = useAppSelector((state) => state.auth.user);
  // console.log(user.userData?.phone);
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

  const onSubmitAuth = async (e: any) => {
    // ): Promise<AxiosResponse<IAuthResponse>> => {
    e.preventDefault();
    try {
      const user = await $instance.post<IAuthResponse>('auth/login', { phone });
      // console.log(user.data.userData.phone);
      localStorage.setItem('token', user.data.accessToken);
      dispatch(login(user.data));
      // console.log(localStorage.getItem('token'));
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };

  console.log(isAuth);

  return (
    <form onSubmit={onSubmitAuth}>
      <Center sx={{ height: '100vh' }}>
        <Stack>
          <h1>
            {isAuth
              ? `Авторизован ${user.userData.phone} ${user.userData.role}`
              : 'Авторизуйтесь'}
            {/* {console.log(userData)} */}
          </h1>
          {isAuth ? (
            <Button
              onClick={async () => {
                try {
                  await $instance.post('auth/logout');
                  localStorage.removeItem('token');
                  dispatch(logout());
                  setUsers([]);
                  navigate('/order-data');
                } catch (e: any) {
                  console.log(e.response?.data?.message);
                }
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <TextField
                sx={{ width: 300, m: 4 }}
                label='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button type='submit'>Login</Button>
            </>
          )}
          {/* <TextField
            sx={{ width: 300, m: 4 }}
            label='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button type='submit'>Login</Button>
          {useAuth() && (
            <Button
              onClick={async () => {
                try {
                  await $instance.post('auth/logout');
                  localStorage.removeItem('token');
                  dispatch(logout());
                } catch (e: any) {
                  console.log(e.response?.data?.message);
                }
              }}
            >
              Logout
            </Button>
          )} */}
          <Button
            onClick={async () => {
              try {
                // if (isAuth) {
                const response = await $instance.get<IUser[]>('users');
                console.log(response.data);
                setUsers(response.data);
                // console.log(users);
                // } else {
                //   setUsers([]);
                // }
                // {isAuth ? setUsers(response.data) : setUsers([])}
              } catch (e: any) {
                dispatch(logout());
                setUsers([]);
                console.error(e.response?.data?.message);
              }
            }}
          >
            List of users
          </Button>
          <Button onClick={() => navigate('/')}>На головну</Button>
          {users &&
            users.map((user) => (
              <Box key={user.phone}>{`${user.phone} | ${user.role}`}</Box>
            ))}
        </Stack>
      </Center>
    </form>
  );
};

export default OrderData;
