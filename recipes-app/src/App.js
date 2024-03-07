import './App.css';
import Menu from './components/Menu';
import data from './data/recipes.json'


function App() {
  return (
    <div className="App">
      <Menu recipes={data} />
    </div>
  );
}

export default App;
