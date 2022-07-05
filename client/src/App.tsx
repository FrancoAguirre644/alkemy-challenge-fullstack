import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import Routes from './routes';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

axios.defaults.withCredentials = true;


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
