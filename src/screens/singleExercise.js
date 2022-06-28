import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSingleExercise } from "../api/request";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
function SingleWorkout() {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTU5NzA1NDksImV4cCI6MTY4NzUwNjU0OSwianRpIjoiMzFBbjB0MjNLcGY2OFVUVFNCV0h1UyIsInNlc3MiOiJoOHRmMTFoZ20wcXQwM3Jvb2t1YjhpcHFnZyIsImtleSI6bnVsbCwic2FsdCI6IjE5OWMyN2E4Iiwic2NvcGUiOlsidmlld192aWRlbyIsInZpZXdfY2hhbm5lbCIsInZpZXdfZ3JvdXAiLCJ2aWV3X3ZpZGVvcyIsInZpZXdfY2hhbm5lbHMiLCJ2aWV3X2dyb3VwcyIsInBsYXlsaXN0X2FjY2VzcyIsInByaXZhdGVfbXNnX2FjY2VzcyIsImRvd25sb2FkX3ZpZGVvIiwiYWxsb3dfY3JlYXRlX3BsYXlsaXN0IiwiYmxvZ3NfbW9kZXJhdG9yIiwiaGVscGRlc2tfbW9kZXJhdG9yIl0sInN1YiI6eyJ1c2VyaWQiOjM3LCJjYXRlZ29yeSI6bnVsbCwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoiIiwic2V4IjoiIiwiZG9iIjoiMjAyMi0wNi0xMCIsImNvdW50cnkiOiJQSyIsImxldmVsIjoyLCJkb2oiOiIyMDIyLTAxLTMxIDA2OjMxOjIxIiwiYmFja2dyb3VuZF9hdHRhY2hlbWVudCI6Im5vIiwibGFzdF9hY3RpdmUiOiIyMDIyLTA2LTIwIDA2OjExOjU1Iiwid2VsY29tZV9lbWFpbF9zZW50Ijoibm8iLCJsaWtlcyI6MCwibGFuZ3VhZ2VfaWQiOm51bGwsInBpbiI6MzEzNywiZXhwaXJ5IjoiMjAyMi0wNi0wOCAxMTozMDozOSIsIm1zaXNkbiI6OTIzMjM5OTc4ODQ3LCJuYW1lIjoia2h1cnJpYSBaYWZhciBLaGFuIHVwZGF0ZSAyIiwid2VpZ2h0Ijo2MiwiaGVpZ2h0Ijo1LCJnb2FsX2lkIjoyLCJ2ZXJpZnkiOjEsInVfc2VyaWVzX2lkIjoxNCwidGltZV9ub3RpZnkiOiIxMDowOTowMCIsInN0YXJ0X2RhdGUiOiIyMDIyLTA2LTEwIiwibGlzdF9pZCI6MTQyLCJ1X2NvdW50cnlfaWQiOjAsImFib3V0ZmxhZyI6MCwiZ29hbGZsYWciOjEsInN1YnNjcmliZWQiOiJZZXMiLCJzdWJzY3JpYmVkX3BhY2thZ2UiOiI4IiwiZGFpbHlfbGltaXRfcmVhY2hlZCI6Ik5vIiwiaXNfZGlldF9zdWJzY3JpYmVkIjowLCJkaWV0X3BsYW4iOm51bGwsImZyZWVfdHJpYWwiOiJObyIsImhlaWdodF9mZWV0Ijo1LCJoZWlnaHRfaW5jaCI6bnVsbCwid2VpZ2h0X2tpbG8iOjYyLCJ3ZWlnaHRfZ3JhbSI6bnVsbCwiaGVpZ2h0X3VuaXQiOiJmdCIsIndlaWdodF91bml0Ijoia2ciLCJpc19iYW5uZWQiOmZhbHNlLCJpc19hY3RpdmUiOmZhbHNlfX0.cGdPNLQ7buNvyF03Q0A5a3uwVT8mRbQtadCcXeZuJLo";

  const location = useLocation();
  const { exerciseID } = location.state;
  const [singleExerciseData, setSingleExerciseData] = useState();
  const [loading, setLoading] = useState(true);
  const phaseName = [];
  const groupData = [];
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
        {allCircuitExercisesArr.map((item, index) => {
          var x = findInArray(singleExerciseData, item.type, item.id);
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
        <p>
          {phaseName.map((i, key) => {
            return (
              <div>
                <h1 key={key}>{i.attributes.name}</h1>
                {allCircuitExercisesArr.map((item, index) => {
                  var x = findInArray(singleExerciseData, item.type, item.id);
                  var y = x[0].relationships.groups.data;

                  {
                    y.map((itm, idx) => {
                      var z = findInArray(singleExerciseData, itm.type, itm.id);
                      var a = findInArray(
                        singleExerciseData,
                        z[0].relationships.group.data.type,
                        z[0].relationships.group.data.id
                      );

                      var b = findInArray(
                        singleExerciseData,
                        a[0].relationships.exercises.data[0].type,
                        a[0].relationships.exercises.data[0].id
                      );

                      var c = findInArray(
                        singleExerciseData,
                        b[0].relationships.exercise.data.type,
                        b[0].relationships.exercise.data.id
                      );
                    });
                  }
                })}
              </div>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default SingleWorkout;
