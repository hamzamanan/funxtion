import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
function StartPage() {
  const location = useLocation();
  const { Circuit } = location.state;

  return (
    <div>
      <p>asdasda</p>
      {console.log("CIRC INFO", Circuit)}
    </div>
  );
}

export default StartPage;
