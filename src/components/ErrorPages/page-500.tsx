import React from 'react';
import { Link } from "react-router-dom";

export default function A500Component() {
  return (
     <div>
     <h1>500</h1>
     <h4>Internal Server Error.</h4>
     <Link to={'/'}>Home</Link>
     </div>
  )
}

