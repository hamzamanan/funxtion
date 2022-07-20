import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

function StartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { Circuit } = location.state;
  const [RestTimer, setRestTimer] = useState();
  const [outerIndex, setOuterIndex] = useState(0);
  const [innerIndex, setInnerIndex] = useState(0);
  let CircSorted = Circuit.sort(function (a, b) {
    return parseFloat(a.groupPhasePos) - parseFloat(b.groupPhasePos);
  });

  const [playUrl, setPlayUrl] = useState(
    CircSorted[outerIndex].singleExercise[innerIndex][0].attributes.video
  );
  useEffect(() => {}, [playUrl]);

  let singleExerciseInfo = [];

  for (let outerIndex = 0; outerIndex < CircSorted.length; outerIndex++) {
    let innerIndexLength = CircSorted[outerIndex].singleExercise.length;
    for (let innerIndex = 0; innerIndex < innerIndexLength; innerIndex++) {
      singleExerciseInfo.push({
        video_name:
          CircSorted[outerIndex].singleExercise[innerIndex][0].attributes.name,
        video_url:
          CircSorted[outerIndex].singleExercise[innerIndex][0].attributes.video,
        sets_rounds:
          CircSorted[outerIndex].ExerciseAttributes[0].attributes[
            "number-of-rounds"
          ],
        rest_sets:
          CircSorted[outerIndex].ExerciseAttributes[0].attributes[
            "rest-after-set-in-seconds"
          ],
        rest_exercise:
          CircSorted[outerIndex].ExerciseAttributes[0].attributes[
            "rest-after-exercise-in-seconds"
          ],
        phase_name: CircSorted[outerIndex].groupPhaseName,
      });
    }
  }
  return (
    <div>
      <p>asdasda</p>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          justifySelf: "center",
          alignSelf: "center",
          display: "flex",
          width: "100%",
        }}
      >
        {console.log("THE DATA IS : ", singleExerciseInfo)}{" "}
        <ReactPlayer
          url={playUrl}
          controls={true}
          playing={true}
          muted={true}
        />
      </div>
    </div>
  );
}

export default StartPage;
