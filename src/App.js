import './App.css';
import DashBoard from './Components/Dashboard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Provider } from 'react-redux';
import store from './Redux/store';



function App() {
  return (
    <div className="App">
      <Provider store={store}>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DashBoard/>
       </LocalizationProvider>
      </Provider>
    </div>
  );
}

export default App;
