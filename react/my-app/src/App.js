
import React, {useState, useEffect, useMemo} from 'react';
import './App.css';

const useAnyKeyToRender = () => {
  const [, forceRender] = useState ();

  useEffect(() => {
    window.addEventListener('keydown', forceRender);
    return () => window.removeEventListener("keydown", forceRender);
  }, []);
}

function WordCount({children = ""}){
  useAnyKeyToRender();

  const words = useMemo(()=> {
    return children.split(" ");
  }, [children])

  useEffect(() => {
    console.log("fresh render");
  }, [words])

  return (
    <>
      <p>{children}</p>
      <p>
        <strong>{words.length} - words</strong>
      </p>
    </>
  )
}

function App() {
  return(
    <WordCount>You are not going to believe this but...</WordCount>
  )
}

export default App;


