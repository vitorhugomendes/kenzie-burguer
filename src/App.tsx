import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from './routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <>
    <GlobalStyles />
    <ToastContainer />
    <Router />
  </>
);

export default App;
