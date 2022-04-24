// 2022-04-19 - luci
const $ = (id) => {
    return document.getElementById(id);
}

// CALCULATE TRUNK CAPACITY
const calculateCapacity = () => {
  const trunk = $('trunk').value;
  let multiple = 1.15;
  if ($('premium').checked == false && $('postop').checked == false) {
    multiple = 1;
  } else if ($('premium').checked == true && $('postop').checked == true) {
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
  return [capacity1, capacity2];
}

// CAPACITY TO HTML
const capacityToHTML = () => {
  const capacities = calculateCapacity();
  $('result-capacity').insertAdjacentHTML('beforeend', '<span class="temp"><b>' + Math.round(capacities[0] + capacities[1]) + '</b></span>');
}

// RUNS CALCULATOR
const runs = (capacity1, capacity2, processWeight, nProcesses) => {
  const nProcessesTrunk1 = Math.floor(capacity1 / processWeight);
  const nProcessesTrunk2 = Math.floor(capacity2 / processWeight);
  return Math.ceil(nProcesses / (nProcessesTrunk1 + nProcessesTrunk2));
}

// RUNS RESULTS TO HTML
const runsToHTML = (result, parent) => {
  $(parent).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + result + '</b></p>');
}

// COMPUTE RUNS
const calculateRuns = () => {
  const capacities = calculateCapacity();
  const capacity1 = capacities[0];
  const capacity2 = capacities[1];
  const concrete = $('concrete').value;
  const sand = concrete * 25;

  // 1. PICKUP: RAW GAS
  // 2. REFINE: RAW GAS TO WASTE WATER
  let result = runs(capacity1, capacity2, 150, (Math.ceil(Math.ceil(sand / 90) * 10 / 5)));
  runsToHTML(result, 'parent-rawgas');
  runsToHTML(result, 'parent-wastewater');

  // 3. REFINE: WASTE WATER TO SULFUR
  result = runs(capacity1, capacity2, 50, (Math.ceil(Math.ceil(sand / 90) * 10 / 5)));
  runsToHTML(result, 'parent-sulfur');

  // 4. REFINE: CHEMICALS TO ACID
  result = runs(capacity1, capacity2, 5, (Math.ceil(Math.ceil(sand / 90) * 8 / 20) * 2));
  runsToHTML(result, 'parent-acid');

  // 5. PICKUP: UNFILTERED WATER
  result = runs(capacity1, capacity2, 100, (Math.ceil(Math.ceil(sand / 90) * 8 / 20) * 2));
  runsToHTML(result, 'parent-unfilteredwater');

  // 6. REFINE: UNFILTERED WATER + ACID TO TREATED WATER
  result = runs(capacity1, capacity2, (1 * 100 + 1 * 5), (Math.ceil(Math.ceil(sand / 90) * 8 / 20) * 2));
  runsToHTML(result, 'parent-treatedwater');

  // 7. PICKUP: CRUDE OIL
  result = runs(capacity1, capacity2, 150, (Math.ceil(Math.ceil(sand / 90) * 8 / 20) * 3));
  runsToHTML(result, 'parent-crudeoil');

  // 8. REFINE: TREATED WATER + CRUDE OIL TO KEROSENE
  result = runs(capacity1, capacity2, (2 * 100 + 3 * 150), (Math.ceil(Math.ceil(sand / 90) * 8 / 20)));
  runsToHTML(result, 'parent-kerosene');

  // 9. REFINE: KEROSENE + SULFUR TO EXPLOSIVE
  result = runs(capacity1, capacity2, (8 * 25 + 10 * 5), (Math.ceil(sand / 90)));
  runsToHTML(result, 'parent-explosive');

  // 10. REFINE: RAW ORE MIX + EXPLOSIVE TO SAND
  result = runs(capacity1, capacity2, (1 * 250 + 15 * 15), (Math.ceil(sand / 90)));
  runsToHTML(result, 'parent-sand');
}

window.onload = () => {
  capacityToHTML();
  calculateRuns();
  $('calculateRuns').onclick = calculateRuns;
}

$('trunk').addEventListener('change', () => {
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

$('concrete').addEventListener('change', () => {
  document.querySelectorAll('.temp').forEach(e => e.remove());
  capacityToHTML();
  calculateRuns();
});
