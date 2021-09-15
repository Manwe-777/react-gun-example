import logo from "./logo.svg";
import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const inputRef = useRef();
  const [state, setState] = useState("..");

  useEffect(() => {
    console.log("> useEffect triggered!");
    /*
      Here you should be careful, if you re-instantiate the component (like using HMR, or
      a parent component re rendering) this hook will fire again, thus causing the on to be
      recreated on top of the previous one and resulting in multiple executions.
      
      Therefore we need to define what we are doing and where. I like defining my listeners outside
      React, right next to our Gun constructor, but for the sake of learning we will use
      them here and show what happens.
    */
    window.gunDb.get("testValue").on((v) => {
      // Assign this to our state!
      // Notice this callback can be triggered many times! check the console for more
      console.log("Gun.on() ", v);
      setState(v.key);
    });
  }, []);

  const onSubmit = useCallback(() => {
    // Create a random new value
    const newValue = inputRef.current.value;

    // We get the ref to the value on the graph
    const testRef = window.gunDb.get("testValue");

    // We use that ref to put a new value!
    // We can also chain methods like gun.get("test").put(val)
    testRef.put({ key: newValue });

    // clear the input
    inputRef.current.value = "";
  }, [inputRef]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Basic Gun sample app!</p>
        <p>
          The saved value is: <i>{state}</i>
        </p>
        <p>
          Type a value in the input to save it. Then clear localstorage and
          reload the page to see it back in here.
          You can also open the tab on a new browser or incognito to see it update in realtime!
        </p>
        <input ref={inputRef} />
        <button type="button" onClick={onSubmit}>
          Ship it!
        </button>
      </header>
    </div>
  );
}

export default App;
