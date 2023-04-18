import { useState } from "react";


function User() {


  

  return (
    <form >
      <label htmlFor="name">Nombre:</label>
      <input
        id="name"
        type="text"
        value={name}
      
      />
      <button type="submit">Crear cuestionario</button>
    </form>
  );
}
export default User;
