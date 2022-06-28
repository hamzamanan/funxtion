export const getAllWorkoutFunxtion = (id, token) => {
  return fetch(`https://qa.fitflexapp.com/api/getAllExercises/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getSingleExercise = (id, token) => {
  return fetch(`https://qa.fitflexapp.com/api/getsingleExercises/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
