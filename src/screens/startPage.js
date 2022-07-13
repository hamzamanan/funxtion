import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

function StartPage() {
  const location = useLocation();
  const { Circuit } = location.state;
  const [RestTimer, setRestTimer] = useState();
  const [outerIndex, setOuterIndex] = useState(0);
  let CircSorted = Circuit.sort(function (a, b) {
    return parseFloat(a.groupPhasePos) - parseFloat(b.groupPhasePos);
  });
  console.log("SORTED CIRCUIT : ", CircSorted.length);
  const [playUrl, setPlayUrl] = useState();
  useEffect(() => {
    setPlayUrl(CircSorted[outerIndex].singleExercise[0][0].attributes.video);
  }, [outerIndex]);

  return (
    <div>
      <p>asdasda</p>
      {outerIndex <= CircSorted.length ? (
        <video
          src={playUrl}
          autoPlay
          muted
          controls
          onEnded={() => {
            if (outerIndex <= CircSorted.length) {
              setOuterIndex(outerIndex + 1);
              setPlayUrl(
                CircSorted[outerIndex].singleExercise[0][0].attributes.video
              );
            } else {
              console.log("CONGRATS ON COMPLETION");
              setOuterIndex(0);
            }
          }}
        />
      ) : (
        <h1>CONGRATS ON COMPLETION</h1>
      )}
    </div>
  );
}

export default StartPage;
