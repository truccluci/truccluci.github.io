// 2022-04-19 - luci
// CALCULATE TRUNK CAPACITY
const calculateCapacity = () => {
  const trunk = document.getElementById('trunk').value;
  let multiple = 1.15;
  if (document.getElementById('premium').checked == false && document.getElementById('postop').checked == false) {
    multiple = 1;
  } else if (document.getElementById('premium').checked == true && document.getElementById('postop').checked == true) {
    multiple = 1.3;
  }
  let capacity1 = 0;
  let capacity2 = 0;
  if (trunk == 'mk13') {
    capacity1 = 8500 * multiple;
  } else if (trunk == 'mk14') {
    capacity1 = 9000 * multiple;
  } else if (trunk == 'mk14mk15') {
    capacity1 = 9000 * multiple;
    capacity2 = 6000 * multiple;
  }
  return [Math.round(capacity1), Math.round(capacity2)];
}

// CAPACITY TO HTML
const capacityToHTML = () => {
  const capacities = calculateCapacity();
  document.getElementById('result-capacity').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + Math.round(capacities[0] + capacities[1]) + '</b></p>');
}

// RUNS CALCULATOR
const runs = (capacity1, capacity2, processWeight, nProcesses, processCost) => {
  const nProcessesTrunk1 = Math.floor(capacity1 / processWeight);
  const nProcessesTrunk2 = Math.floor(capacity2 / processWeight);
  const runs = Math.ceil(nProcesses / (nProcessesTrunk1 + nProcessesTrunk2));
  const cost = runs * processCost * (nProcessesTrunk1 + nProcessesTrunk2);
  return [runs, cost];
}

// RUNS RESULTS TO HTML
const runsToHTML = (result, parent) => {
  document.getElementById(parent).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + result + '</b></p>');
}

// COMPUTE RUNS
const calculateRuns = () => {
  const capacities = calculateCapacity();
  const capacity1 = capacities[0];
  const capacity2 = capacities[1];
  const concrete = Number(document.getElementById('concrete').value);
  const sand = concrete * 25;

  // 1. PICKUP: RAW GAS
  // 2. REFINE: RAW GAS TO WASTE WATER + CHEMICALS
  let result = runs(capacity1, capacity2, 150, (Math.ceil(Math.ceil(sand / 90) * 10 / 5)), (0 + 10250));
  runsToHTML(result[0], 'parent-rawgas');
  runsToHTML(result[0], 'parent-wastewater');
  let cost = result[1];

  // 3. REFINE: WASTE WATER TO SULFUR
  result = runs(capacity1, capacity2, 50, (Math.ceil(Math.ceil(sand / 90) * 10 / 5)), 5000);
  runsToHTML(result[0], 'parent-sulfur');
  cost += result[1];

  // 4. REFINE: CHEMICALS TO ACID
  result = runs(capacity1, capacity2, 25, ((Math.ceil(Math.ceil(sand / 90) * 8 / 20) * 2 / 4) + (concrete / 4)), 2500);
  runsToHTML(result[0], 'parent-acid');
  cost += result[1];

  // 5. PICKUP: UNFILTERED WATER
  result = runs(capacity1, capacity2, 100, ((Math.ceil(Math.ceil(sand / 90) * 8 / 20) * 2) + concrete), 0);
  runsToHTML(result[0], 'parent-unfilteredwater');
  cost += result[1];

  // 6. REFINE: UNFILTERED WATER + ACID TO TREATED WATER
  result = runs(capacity1, capacity2, (1 * 100 + 1 * 5), ((Math.ceil(Math.ceil(sand / 90) * 8 / 20) * 2) + concrete), 5000);
  runsToHTML(result[0], 'parent-treatedwater');
  cost += result[1];

  // 7. PICKUP: CRUDE OIL
  result = runs(capacity1, capacity2, 150, (Math.ceil(Math.ceil(sand / 90) * 8 / 20) * 3), 0);
  runsToHTML(result[0], 'parent-crudeoil');
  cost += result[1];

  // 8. REFINE: TREATED WATER + CRUDE OIL TO KEROSENE
  result = runs(capacity1, capacity2, (2 * 100 + 3 * 150), (Math.ceil(Math.ceil(sand / 90) * 8 / 20)), 10250);
  runsToHTML(result[0], 'parent-kerosene');
  cost += result[1];

  // 9. REFINE: KEROSENE + SULFUR TO EXPLOSIVE
  result = runs(capacity1, capacity2, (8 * 25 + 10 * 5), (Math.ceil(sand / 90)), 9500);
  runsToHTML(result[0], 'parent-explosive');
  cost += result[1];

  // 10. PICKUP: QUARRY RUBBLE
  // 11. REFINE: QUARRY RUBBLE TO ROM
  result = runs(capacity1, capacity2, 150, (Math.ceil(Math.ceil(sand / 90) * 15 / 4)), (0 + 15000));
  runsToHTML(result[0], 'parent-quarryrubble');
  runsToHTML(result[0], 'parent-raworemix');
  cost += result[1];

  // 12. REFINE: RAW ORE MIX + EXPLOSIVE TO SAND
  result = runs(capacity1, capacity2, (1 * 250 + 15 * 15), (Math.ceil(sand / 90)), 0);
  runsToHTML(result[0], 'parent-sand');
  cost += result[1];

  // 13. PICKUP: LOGS
  // 14. REFINE: LOGS TO SAWDUST
  result = runs(capacity1, capacity2, 60, concrete, (7500 + 500));
  runsToHTML(result[0], 'parent-logs');
  runsToHTML(result[0], 'parent-sawdust');
  cost += result[1];

  // 15. REFINE: SAND + SAWDUST TO CEMENT MIX
  result = runs(capacity1, capacity2, (5 * 5 + 2 * 3), (concrete * 5), 1500);
  runsToHTML(result[0], 'parent-cementmix');
  cost += result[1];

  // 16. REFINE: CEMENT MIX + TREATED WATER TO CONCRETE
  result = runs(capacity1, capacity2, (5 * 25 + 1 * 100), concrete, 15000);
  runsToHTML(result[0], 'parent-concrete');
  cost += result[1];
  cost = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cost);
  document.getElementById('result-cost').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + cost + '*</b></p>');
}

window.onload = () => {
  capacityToHTML();
  calculateRuns();
}

document.getElementById('trunk').addEventListener('change', () => {
  document.querySelectorAll('.temp').forEach(e => e.remove());
  capacityToHTML();
  calculateRuns();
});

document.querySelectorAll('input[name="premium"]').forEach((elem) => {
  elem.addEventListener('change', function(event) {
    document.querySelectorAll('.temp').forEach(e => e.remove());
    capacityToHTML();
    calculateRuns();
  });
});

document.querySelectorAll('input[name="postop"]').forEach((elem) => {
  elem.addEventListener('change', function(event) {
    document.querySelectorAll('.temp').forEach(e => e.remove());
    capacityToHTML();
    calculateRuns();
  });
});

document.getElementById('concrete').addEventListener('change', () => {
  document.querySelectorAll('.temp').forEach(e => e.remove());
  capacityToHTML();
  calculateRuns();
});
