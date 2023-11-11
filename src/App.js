import './App.css';
import ButtonAppBar from './components/Appbar';
import DayEditor from './components/DayEditor';
import moment from 'moment';

function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <DayEditor day={moment()}/>
    </div>
  );
}

export default App;
