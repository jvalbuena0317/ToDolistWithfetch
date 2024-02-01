//import react into the bundle // Son las librerias de React que nos permiten crear nuestra aplicacion 
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";

//render your react application- Mostrar en pantalla 
ReactDOM.render(<Home />, document.querySelector("#app"));
