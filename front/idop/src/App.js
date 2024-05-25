import { Link } from "react-router-dom";

import { server } from "./server.js"
const firebaseApp = require('./Firebase.js')

export default function App() {
  return (
    <div>
      <h1>IDOP</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >

    <p>Welcomme to I Do Prostination</p>
   {server}
         <Link to="/newuser">Register</Link> |{" "} 
        <Link to="/Login">Login </Link>|{" "}
         <Link to="/Home">Home </Link>  
      </nav>
    </div>
  );
}


