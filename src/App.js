import { Provider } from 'react-redux';
import AppRoutes from './appRoutes';
import myStore from './redux/myStore';
import './App.css';

function App() {
  return (
    <Provider store={myStore}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
