// 2022-04-19 - luci
const $ = (id) => {
    return document.getElementById(id);
}

// CALCULATE TRUNK CAPACITY
const calculateCapacity = () => {
  const trunk = $('trunk').value;
  let multiple;
  if ($('premium-0').checked && $('postop-0').checked) {
    multiple = 1;
  } else if ($('premium-1').checked && $('postop-1').checked) {
    multiple = 1.3;
  } else {
    multiple = 1.15;
  }
  let capacity1;
  let capacity2;
  if (trunk == 'mk13') {
    capacity1 = 8500 * multiple;
    capacity2 = 0;
  } else if (trunk == 'mk14') {
    capacity1 = 9000 * multiple;
    capacity2 = 0;
  } else if (trunk == 'mk14mk15') {
    capacity1 = 9000 * multiple;
    capacity2 = 6000 * multiple;
  }
  $('result-capacity').value = Math.round(capacity1 + capacity2);
  return [capacity1, capacity2];
}

// CALCULATE RUNS
const calculateRuns = () => {
  const capacities = calculateCapacity();
  const capacity1 = capacities[0];
  const capacity2 = capacities[1];
  const concrete = $('concrete').value;
  const sand = concrete * 25;

  // 10. Raw Ore Mix + Explosive to Sand
  let nSandProc = Math.ceil(sand / 90);
  const weightSandProc = 1 * 250 + 15 * 15;
  let sandProcTrunk1 = Math.floor(capacity1 / weightSandProc);
  let sandProcTrunk2 = Math.floor(capacity2 / weightSandProc);
  $('result-runs-10').value = Math.ceil(nSandProc / (sandProcTrunk1 + sandProcTrunk2));

  // 9. Kerosene + Sulfur to Explosive
  const weightExplosive = 8 * 25 + 10 * 5;
  let expProcTrunk1 = Math.floor(capacity1 / weightExplosive);
  let expProcTrunk2 = Math.floor(capacity2 / weightExplosive);
  $('result-runs-9').value = Math.ceil(nSandProc / (expProcTrunk1 + expProcTrunk2));

  // 8. Treated Water + Crude Oil to Kerosene
  const weightKerosene = 2 * 100 + 3 * 150;
  let keroProcTrunk1 = Math.floor(capacity1 / weightKerosene);
  let keroProcTrunk2 = Math.floor(capacity2 / weightKerosene);
  $('result-runs-8').value = Math.ceil((nSandProc * 8) / ((keroProcTrunk1 + keroProcTrunk2) * 20));

  // 7. Pickup: Crude Oil
  let requiredCrudeoil = Math.ceil(nSandProc * 8 / 20) * 3;
  const weightCrudeoil = 150;
  let oilProcTrunk1 = Math.floor(capacity1 / weightCrudeoil);
  let oilProcTrunk2 = Math.floor(capacity2 / weightCrudeoil);
  $('result-runs-7').value = Math.ceil(requiredCrudeoil / (oilProcTrunk1 + oilProcTrunk2));

  // 6. Unfiltered Water + Acid to Treated Water
  let requiredWater = Math.ceil(nSandProc * 8 / 20) * 2;
  const weightTreatedwaterProc = 1 * 100 + 1 * 5;
  let waterProcTrunk1 = Math.floor(capacity1 / weightTreatedwaterProc);
  let waterProcTrunk2 = Math.floor(capacity2 / weightTreatedwaterProc);
  $('result-runs-6').value = Math.ceil(requiredWater / (waterProcTrunk1 + waterProcTrunk2));

  // 5. Pickup: Unfiltered Water
  const weightUnfilteredwater = 100;
  let unfilteredProcTrunk1 = Math.floor(capacity1 / weightUnfilteredwater);
  let unfilteredProcTrunk2 = Math.floor(capacity2 / weightUnfilteredwater);
  $('result-runs-5').value = Math.ceil(requiredWater / (unfilteredProcTrunk1 + unfilteredProcTrunk2));

  // 4. Chemicals to Acid
  const weightAcid = 5;
  let acidProcTrunk1 = Math.floor(capacity1 / weightAcid);
  let acidProcTrunk2 = Math.floor(capacity2 / weightAcid);
  $('result-runs-4').value = Math.ceil(requiredWater / (acidProcTrunk1 + acidProcTrunk2));

  // 3. Waste Water to Sulfur
  let requiredRawgas = Math.ceil(nSandProc * 10 / 5);
  const weightWastewater = 50;
  let wastewaterProcTrunk1 = Math.floor(capacity1 / weightWastewater);
  let wastewaterProcTrunk2 = Math.floor(capacity2 / weightWastewater);
  $('result-runs-3').value = Math.ceil(requiredRawgas / (wastewaterProcTrunk1 + wastewaterProcTrunk2));

  // 1. Pickup: Raw Gas
  // 2. Raw Gas to Waste Water
  const weightRawgas = 150;
  let rawgasProcTrunk1 = Math.floor(capacity1 / weightRawgas);
  let rawgasProcTrunk2 = Math.floor(capacity2 / weightRawgas);
  $('result-runs-1').value = Math.ceil(requiredRawgas / (rawgasProcTrunk1 + rawgasProcTrunk2));
  $('result-runs-2').value = Math.ceil(requiredRawgas / (rawgasProcTrunk1 + rawgasProcTrunk2));
}

window.onload = () => {
  calculateCapacity();
  calculateRuns();
  $('calculateRuns').onclick = calculateRuns;
}

$('trunk').addEventListener('change', () => {
  calculateCapacity();
  calculateRuns();
});

document.querySelectorAll('input[name="radio-prem"]').forEach((elem) => {
  elem.addEventListener('change', function(event) {
    calculateCapacity();
    calculateRuns();
  });
});

document.querySelectorAll('input[name="radio-postop"]').forEach((elem) => {
  elem.addEventListener('change', function(event) {
    calculateCapacity();
    calculateRuns();
  });
});

$('concrete').addEventListener('change', () => {
  calculateCapacity();
  calculateRuns();
});
