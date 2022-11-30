import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import  restaurantSlice  from './featchers/restaurantSlice'
import AppRoutes from './appRoutes';
import './App.css';

function App() {

  const myStore = configureStore({
    reducer: {
      restaurantSlice
    }
  })
  return (
    <Provider store={myStore}>
      <AppRoutes/>
    </Provider>
  );
}

export default App;
