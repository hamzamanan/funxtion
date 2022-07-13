import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSingleExercise } from "../api/request";
import { Link } from "react-router-dom";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../styles/testStyle.css";
function SingleWorkout() {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTU5NzA1NDksImV4cCI6MTY4NzUwNjU0OSwianRpIjoiMzFBbjB0MjNLcGY2OFVUVFNCV0h1UyIsInNlc3MiOiJoOHRmMTFoZ20wcXQwM3Jvb2t1YjhpcHFnZyIsImtleSI6bnVsbCwic2FsdCI6IjE5OWMyN2E4Iiwic2NvcGUiOlsidmlld192aWRlbyIsInZpZXdfY2hhbm5lbCIsInZpZXdfZ3JvdXAiLCJ2aWV3X3ZpZGVvcyIsInZpZXdfY2hhbm5lbHMiLCJ2aWV3X2dyb3VwcyIsInBsYXlsaXN0X2FjY2VzcyIsInByaXZhdGVfbXNnX2FjY2VzcyIsImRvd25sb2FkX3ZpZGVvIiwiYWxsb3dfY3JlYXRlX3BsYXlsaXN0IiwiYmxvZ3NfbW9kZXJhdG9yIiwiaGVscGRlc2tfbW9kZXJhdG9yIl0sInN1YiI6eyJ1c2VyaWQiOjM3LCJjYXRlZ29yeSI6bnVsbCwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoiIiwic2V4IjoiIiwiZG9iIjoiMjAyMi0wNi0xMCIsImNvdW50cnkiOiJQSyIsImxldmVsIjoyLCJkb2oiOiIyMDIyLTAxLTMxIDA2OjMxOjIxIiwiYmFja2dyb3VuZF9hdHRhY2hlbWVudCI6Im5vIiwibGFzdF9hY3RpdmUiOiIyMDIyLTA2LTIwIDA2OjExOjU1Iiwid2VsY29tZV9lbWFpbF9zZW50Ijoibm8iLCJsaWtlcyI6MCwibGFuZ3VhZ2VfaWQiOm51bGwsInBpbiI6MzEzNywiZXhwaXJ5IjoiMjAyMi0wNi0wOCAxMTozMDozOSIsIm1zaXNkbiI6OTIzMjM5OTc4ODQ3LCJuYW1lIjoia2h1cnJpYSBaYWZhciBLaGFuIHVwZGF0ZSAyIiwid2VpZ2h0Ijo2MiwiaGVpZ2h0Ijo1LCJnb2FsX2lkIjoyLCJ2ZXJpZnkiOjEsInVfc2VyaWVzX2lkIjoxNCwidGltZV9ub3RpZnkiOiIxMDowOTowMCIsInN0YXJ0X2RhdGUiOiIyMDIyLTA2LTEwIiwibGlzdF9pZCI6MTQyLCJ1X2NvdW50cnlfaWQiOjAsImFib3V0ZmxhZyI6MCwiZ29hbGZsYWciOjEsInN1YnNjcmliZWQiOiJZZXMiLCJzdWJzY3JpYmVkX3BhY2thZ2UiOiI4IiwiZGFpbHlfbGltaXRfcmVhY2hlZCI6Ik5vIiwiaXNfZGlldF9zdWJzY3JpYmVkIjowLCJkaWV0X3BsYW4iOm51bGwsImZyZWVfdHJpYWwiOiJObyIsImhlaWdodF9mZWV0Ijo1LCJoZWlnaHRfaW5jaCI6bnVsbCwid2VpZ2h0X2tpbG8iOjYyLCJ3ZWlnaHRfZ3JhbSI6bnVsbCwiaGVpZ2h0X3VuaXQiOiJmdCIsIndlaWdodF91bml0Ijoia2ciLCJpc19iYW5uZWQiOmZhbHNlLCJpc19hY3RpdmUiOmZhbHNlfX0.cGdPNLQ7buNvyF03Q0A5a3uwVT8mRbQtadCcXeZuJLo";

  const location = useLocation();
  const { exerciseID } = location.state;
  const [singleExerciseData, setSingleExerciseData] = useState();
  const [loading, setLoading] = useState(true);
  const groupData = [];
  const circuitInformation = [];
  const phaseName = [];
  let newFinalArr;

  useEffect(() => {
    getSingleExercise(exerciseID, token).then((res) => {
      setSingleExerciseData(res.data);

      setLoading(false);
    });
  }, []);

  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: 45, color: "#FF1E1E", marginBottom: 20 }}
      spin
    />
  );
  if (loading) {
    return (
      <div class="loader">
        <Spin className="spinner" indicator={antIcon} tip="Loading" />
      </div>
    );
  }
  var allCircuitExercisesArr =
    singleExerciseData.data.relationships.phases.data.filter((obj) => {
      return obj.type == "fitness/training/phases";
    });

  function findInArray(array, type, id) {
    var test = array.included.filter((obj) => {
      return obj.type == type && obj.id == id;
    });
    return test;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "50px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {allCircuitExercisesArr.map((item, index) => {
          var x = findInArray(singleExerciseData, item.type, item.id);
          {
            console.log("x : ", x);
          }
          var y = findInArray(
            singleExerciseData,
            x[0].relationships.phase.data.type,
            x[0].relationships.phase.data.id
          );
          phaseName.push(y[0]);
          phaseName.sort((a, b) => {
            return a.attributes.position - b.attributes.position;
          });
        })}
        <p>{exerciseID}</p>
        <p style={{ fontSize: "20px", fontWeight: "600", color: "#ff1e1e" }}>
          {singleExerciseData.data.attributes.name}
        </p>
        <div style={{ background: "#FCB300" }}>
          <img src={singleExerciseData.data.attributes["secondary-image"]} />
        </div>
        <p>{singleExerciseData.data.attributes["description-long"]}</p>
        <p>
          Duration :{" "}
          {singleExerciseData.data.attributes["duration-in-seconds"] / 60} mins
        </p>
        <p>
          Calories burned :{" "}
          {
            singleExerciseData.data.attributes[
              "energy-expenditure-in-kilo-calories"
            ]
          }{" "}
          kal
        </p>

        {allCircuitExercisesArr.map((item, index) => {
          var a = findInArray(singleExerciseData, item.type, item.id);

          a[0].relationships.groups.data.map((obj, objKey) => {
            var b = findInArray(singleExerciseData, obj.type, obj.id);
            var c = findInArray(
              singleExerciseData,
              b[0].relationships.phase.data.type,
              b[0].relationships.phase.data.id
            );
            var d = findInArray(
              singleExerciseData,
              c[0].relationships.phase.data.type,
              c[0].relationships.phase.data.id
            );

            let phaseData = {
              PhasePosnName: {
                Pname: d[0].attributes.name,
                P_position: d[0].attributes.position,
              },
              groups: b,
            };
            groupData.push(phaseData);
          });
        })}

        {groupData.map((itm, itmKey) => {
          var e = findInArray(
            singleExerciseData,
            itm.groups[0].relationships.group.data.type,
            itm.groups[0].relationships.group.data.id
          );

          //  e is the data for the exercises which includes rounds , sets ,rest information
          e[0].relationships.exercises.data.map((object, objectKey) => {
            var f = findInArray(singleExerciseData, object.type, object.id);

            var g = findInArray(
              singleExerciseData,
              f[0].relationships.exercise.data.type,
              f[0].relationships.exercise.data.id
            );

            let SingleExercise = {
              ExerciseAttributes: e,
              circuitId: e[0].id,
              singleExercise: g,
              groupPhaseName: itm.PhasePosnName.Pname,
              groupPhasePos: itm.PhasePosnName.P_position,
            };

            circuitInformation.push(SingleExercise);

            let ans = circuitInformation.reduce((agg, curr) => {
              let found = agg.find((x) => x.circuitId === curr.circuitId);
              if (found) {
                found.singleExercise.push(curr.singleExercise);
              } else {
                agg.push({
                  circuitId: curr.circuitId,
                  ExerciseAttributes: curr.ExerciseAttributes,
                  singleExercise: [curr.singleExercise],
                  groupPhaseName: curr.groupPhaseName,
                  groupPhasePos: curr.groupPhasePos,
                });
              }
              return agg;
            }, []);

            newFinalArr = ans;
          });

          {
            circuitInformation.sort((a, b) => {
              return a.groupPhasePos - b.groupPhasePos;
            });
          }
        })}

        {phaseName.map((objItem, objItemKey) => {
          return (
            <div>
              <Button>
                <Link
                  to={"/startPage"}
                  state={{
                    Circuit: newFinalArr,
                  }}
                >
                  {" "}
                  START EXERCISE{" "}
                </Link>
              </Button>
              <h1>{objItem.attributes.name}</h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {circuitInformation.map((singleItemObject, objectKey) => {
                  if (
                    objItem.attributes.name == singleItemObject.groupPhaseName
                  ) {
                    return (
                      <div style={{ border: "1px solid grey", margin: "2px" }}>
                        <img
                          src={
                            singleItemObject.singleExercise[0].attributes[
                              "gif-small"
                            ]
                          }
                        />

                        <p>CIRCUIT ID IS : {singleItemObject.circuitId}</p>
                        <p style={{ color: "#ff1e1e" }}>
                          {singleItemObject.singleExercise[0].attributes.name}
                        </p>
                        <p>PHASE NAME IS : {singleItemObject.groupPhaseName}</p>
                        <p>
                          SETS/ROUNDS :{" "}
                          {
                            singleItemObject.ExerciseAttributes[0].attributes[
                              "number-of-rounds"
                            ]
                          }
                        </p>
                        <p>
                          REST after Exercise :{" "}
                          {
                            singleItemObject.ExerciseAttributes[0].attributes[
                              "rest-after-exercise-in-seconds"
                            ]
                          }{" "}
                          sec
                        </p>
                        <p>
                          REST after SET :{" "}
                          {
                            singleItemObject.ExerciseAttributes[0].attributes[
                              "rest-after-set-in-seconds"
                            ]
                          }{" "}
                          sec
                        </p>

                        <p>
                          TARGET REPETITIONS :{" "}
                          {
                            singleItemObject.ExerciseAttributes[0].attributes[
                              "target-repetitions"
                            ]
                          }{" "}
                        </p>
                      </div>
                    );
                  } else {
                    <br />;
                  }
                })}
                {}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SingleWorkout;
