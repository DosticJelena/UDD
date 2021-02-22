import './App.css';

import Nav from './components/Nav/Nav';
import Main from './components/Main/Main';

import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Main/>
      
      <NotificationContainer/>
    </div>
  );
}

export default App;
