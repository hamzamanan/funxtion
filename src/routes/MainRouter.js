import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AllWorkoutScreen from "../screens/allworkoutScreen";
import SingleWorkout from "../screens/singleExercise";
import StartPage from "../screens/startPage";
const MainRouter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<AllWorkoutScreen />} />
      <Route exact path="/details" element={<SingleWorkout />} />
      <Route exact path="/startPage" element={<StartPage />} />
      {/* <Route exact path="/login" element={<Login />} /> */}
      {/* <Route path="/:bundle-:country-:operator" element={<LoginMarket />} /> */}
    </Routes>
  );
};

export default MainRouter;
