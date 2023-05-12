import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import Routes from './routes';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { getOperations } from './redux/slices/operationSlice';
import { refreshToken } from './redux/slices/authSlice';
import Notify from './components/alert/Notify';

axios.defaults.baseURL = 'https://alkemy-challenge-fullstack.onrender.com';

axios.defaults.withCredentials = true;

function App() {

  const dispatch = useDispatch<AppDispatch>();

  const { auth } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch])

  useEffect(() => {
    if (auth.access_token) dispatch(getOperations(auth.access_token));
  }, [dispatch, auth.access_token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
      <Notify />
    </ThemeProvider>
  );
}

export default App;
