for (let outerIndex = 0; outerIndex < CircSorted.length; outerIndex++) {
  let innerIndexLength = CircSorted[outerIndex].singleExercise.length;
  for (let innerIndex = 0; innerIndex < innerIndexLength; innerIndex++) {
    console.log(
      "video name is : ",
      CircSorted[outerIndex].singleExercise[innerIndex][0].attributes.video
    );
  }
}
