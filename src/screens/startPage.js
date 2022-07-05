import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
function StartPage() {
  const location = useLocation();
  const { Circuit } = location.state;
  let CircSorted = Circuit.sort(function (a, b) {
    return parseFloat(a.groupPhasePos) - parseFloat(b.groupPhasePos);
  });
  return (
    <div>
      <p>asdasda</p>
      {console.log("CIsadsadRC INFO", CircSorted)}
    </div>
  );
}

export default StartPage;
