import React from 'react';
import { Link } from "react-router-dom";

export default function A404Component() {

  return (
     <div>
     <h1>404</h1>
     <h4>Page Not Found.</h4>
     <Link to={'/'}>Home</Link>
     </div>
  )
}
