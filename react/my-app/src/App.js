
import React, {useState, useEffect} from 'react';
import './App.css';

const loadJson = key => 
  key && JSON.parse(localStorage.getItem(key));
const saveJson = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

function GitHubUser ({login}) {
  const [data, setData] = useState(
    loadJson(`user:${login}`)
  );

  useEffect(() => {
    if (!data) return;
    if (data.login === login) return;
    const {name, avatar_url, location} = data;
    saveJson(`user:${login}`, {
      name,
      login,
      avatar_url,
      location
    });
  }, [data])

  useEffect(() => {
    if (!login) return;

    fetch(`https://api.github.com/users/${login}`)
      .then(response => response.json())
      .then(setData)
      .catch(console.error);
  }, [login])

  if (data)
    return <pre>{JSON.stringify(data, null, 2)}</pre>
  
  return null;
}

function App() {
  return (
    <GitHubUser login='MoonHighway'/>
  )
}

export default App;


