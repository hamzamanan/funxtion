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
        circuit_id: CircSorted[outerIndex].circuitId,
        sets_rounds:
          CircSorted[outerIndex].ExerciseAttributes[0].attributes[
            "number-of-rounds"
          ],
        video_name:
          CircSorted[outerIndex].singleExercise[innerIndex][0].attributes.name,
        rest_sets:
          CircSorted[outerIndex].ExerciseAttributes[0].attributes[
            "rest-after-set-in-seconds"
          ],
        rest_exercise:
          CircSorted[outerIndex].ExerciseAttributes[0].attributes[
            "rest-after-exercise-in-seconds"
          ],
        video_url:
          CircSorted[outerIndex].singleExercise[innerIndex][0].attributes.video,
      });
    }
  }

  const remapData = () => {
    let circuitId;
    let itemsToCopy = [];
    let rounds = 0;

    const result = singleExerciseInfo.reduce((memo, item) => {
      if (circuitId !== item.circuit_id) {
        for (let i = 1; i < rounds; i++) {
          memo.push(...itemsToCopy);
        }
        itemsToCopy = [];
      }
      memo.push(item);
      circuitId = item.circuit_id;
      rounds = item.sets_rounds;
      itemsToCopy.push(item);
      return memo;
    }, []);

    for (let i = 1; i < rounds; i++) {
      result.push(...itemsToCopy);
    }

    return result;
  };

  const result = remapData();
  console.log("result : ", result);

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
