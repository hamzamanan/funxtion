import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function StartPage() {
  const location = useLocation();
  const { Circuit } = location.state;
  const [PlayIndex, setPlayIndex] = useState(0);

  let CircSorted = Circuit.sort(function (a, b) {
    return parseFloat(a.groupPhasePos) - parseFloat(b.groupPhasePos);
  });

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

  const [play_duration, setPlayDuration] = useState(result[0].duration_seconds);
  const [startGif, setStartGif] = useState(false);
  const [playUrl, setPlayUrl] = useState(result[PlayIndex].image_url);
  useEffect(() => {
    if (startGif) {
      play_duration > 0 &&
        setTimeout(() => setPlayDuration(play_duration - 1), 1000);
    }
    if (play_duration == 0) {
      setPlayIndex(PlayIndex + 1);
      if (PlayIndex <= result.length) {
        setPlayDuration(result[PlayIndex].duration_seconds);
        setPlayUrl(result[PlayIndex].gif_url);
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


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

function StartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { Circuit } = location.state;
  const [PlayIndex, setPlayIndex] = useState(0);
  let CircSorted = Circuit.sort(function (a, b) {
    return parseFloat(a.groupPhasePos) - parseFloat(b.groupPhasePos);
  });

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

  const [play_duration, setPlayDuration] = useState();
  const [restExercise, setRestExercise] = useState();
  const [startGif, setStartGif] = useState(false);
  const [playUrl, setPlayUrl] = useState();

  useEffect(() => {
    if (PlayIndex <= result.length) {
      if (startGif) {
        play_duration > 0 &&
          setTimeout(() => setPlayDuration(play_duration - 1), 1000);
      }
      if (play_duration == 0) {
        if (restExercise > 0) {
          setTimeout(() => setRestExercise(restExercise - 1), 1000);
        } else {
          setPlayIndex(PlayIndex + 1);
          setPlayDuration(result[PlayIndex].duration_seconds);
          setPlayUrl(result[PlayIndex].video_url);
          setRestExercise(result[PlayIndex].rest_exercise);
        }
      }
    } else {
      setPlayIndex(0);
      setPlayUrl(result[0].video_url);
      setPlayDuration(0);
      console.log("FINISHED EXERCISE");
    }
  }, [play_duration, startGif, playUrl, restExercise]);

  return (
    <div>
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
        <ReactPlayer
          url={playUrl}
          controls={false}
          playing={true}
          muted={true}
          onEnded={() => {
            if (PlayIndex < result.length - 1) {
              if (play_duration == 0) {
                setPlayIndex(PlayIndex + 1);
                if (PlayIndex <= result.length) {
                  setPlayDuration(result[PlayIndex].duration_seconds);
                  setPlayUrl(result[PlayIndex].video_url);
                }
              }
            } else if (PlayIndex == result.length - 1) {
              setPlayUrl(result[result.length - 1].video_url);
              setPlayDuration(result[result.length - 1].duration_seconds);
              setRestExercise(result[result.length - 1].rest_exercise);
            } else {
              setPlayIndex(0);
              setPlayUrl(result[0].video_url);
              setPlayDuration(0);
              console.log("FINISHED EXERCISE");
            }
          }}
        />
        <p>THE PLAY DURATION IS : {play_duration}</p>
        <p>THE REST AFTER EXERCISE IS : {restExercise}</p>
        <button
          onClick={() => {
            if (PlayIndex < result.length) {
              setStartGif(true);
              setPlayUrl(result[PlayIndex].video_url);
              setPlayIndex(PlayIndex + 1);
              setPlayDuration(result[PlayIndex].duration_seconds);
              setRestExercise(result[PlayIndex].rest_exercise);
            } else {
              setPlayIndex(0);
              setPlayUrl(result[0].video_url);
              setPlayDuration(0);
              console.log("FINISHED EXERCISE");
            }
          }}
        >
          Start Exercise
        </button>
        <img src={result[1].gif_url} autoPlay />
      </div>
    </div>
  );
}

export default StartPage;
