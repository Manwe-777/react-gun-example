import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Gun from "gun";

/*
Initialize Gun outside the React dom tree.

We can refer to it later using window.Gun.

We do this mainly to make sure we initialize Gun just once, at the beggining of the
app and nowhere else. However, Hot Module Reloading will still reload Gun when you
are in development, and thus, might trigger your .on() listeners many times.

I check if there is no previous instance of Gun before creating a new one,
simply because I use a lot HMR.
*/
if (!window.gunDb) {
  // You should use your own relay peers here
  console.log("> Gun constructor!");
  window.gunDb = new Gun(["https://stark-badlands-20144.herokuapp.com/gun"]);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
