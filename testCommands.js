[
  data.minerObj,
  data.computerObj,
  data.datacenterObj,
  data.superObj,
  data.quantumObj,
  data.matroshkaObj,
  data.simulationObj,
].map(element => {
  elStore.appendChild(newWorker(element));
});

//save
saveSession();

//load and rebuild
loadSession();
rebuildSession();
