import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function StartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { Circuit } = location.state;
  const [PlayIndex, setPlayIndex] = useState(0);

  let CircSorted = Circuit.sort(function (a, b) {
    return parseFloat(a.groupPhasePos) - parseFloat(b.groupPhasePos);
  });
  console.log(Circuit);
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
        duration_seconds:
          CircSorted[outerIndex].ExerciseAttributes[0].attributes[
            "duration-in-seconds"
          ],
        video_url:
          CircSorted[outerIndex].singleExercise[innerIndex][0].attributes.video,
        gif_url:
          CircSorted[outerIndex].singleExercise[innerIndex][0].attributes[
            "gif-small"
          ],
        image_url:
          CircSorted[outerIndex].singleExercise[innerIndex][0].attributes[
            "image-small"
          ],
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
  const [playUrl, setPlayUrl] = useState(result[0].image_url);
  const [play_duration, setPlayDuration] = useState(result[0].duration_seconds);
  const [startGif, setStartGif] = useState(false);

  useEffect(() => {
    if (startGif) {
      play_duration > 0 &&
        setTimeout(() => setPlayDuration(play_duration - 1), 1000);
    }
    if (play_duration == 0) {
      if (PlayIndex <= result.length - 1) {
        setPlayIndex(PlayIndex + 1);
        setPlayDuration(result[PlayIndex].duration_seconds);
        setPlayUrl(result[PlayIndex].gif_url);
      } else {
        setPlayIndex(0);
        navigate("/");
      }
    }
  }, [play_duration, startGif, playUrl]);

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
          flexDirection: "column",
        }}
      >
        <img src={playUrl} />
        <p>The Time Duration is : {play_duration}</p>
        <button
          onClick={() => {
            setStartGif(true);
            setPlayUrl(result[PlayIndex].gif_url);
            setPlayIndex(PlayIndex + 1);
          }}
        >
          Start Exercise
        </button>
      </div>
    </div>
  );
}

export default StartPage;
