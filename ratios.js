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
  return [capacity1, capacity2];
}

// CAPACITY TO HTML
const capacityToHTML = () => {
  const capacities = calculateCapacity();
  document.getElementById('result-capacity').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + Math.round(capacities[0] + capacities[1]) + '</b></p>');
}

// RATIO CALCULATOR
// Factors for additive processes >= 1 --Example: 1 Cement Mix = 5 Sand + 2 Sawdust
// Factors for reductive processes <= 1 --Example: 1 Kerosene = 1/10 Water + 3/20 Crude Oil
const ratio = (capacity, weight1, weight2, factor1, factor2) => {
  let [totalWeight, amountProduct, amountReactant1, amountReactant2] = [0, 0, 0, 0]
  while (totalWeight <= capacity) {
    amountProduct ++;
    amountReactant1 = amountProduct * factor1;
    amountReactant2 = amountProduct * factor2;
    totalWeight = amountReactant1 * weight1 + amountReactant2 * weight2;
  }
  do {
    amountProduct --;
    amountReactant1 = amountProduct * factor1;
    amountReactant2 = amountProduct * factor2;
  } while (!Number.isInteger(amountReactant2));
  return [amountProduct, amountReactant1, amountReactant2];
}

// RATIO RESULTS TO HTML
const resultsToHTML = (capacity2, item, results1, results2, parent1, parent2) => {
  if (capacity2 == 0) {
    document.getElementById(item).insertAdjacentHTML('beforeend', '<span class="temp">' + ' – ' + results1[0] + '</span>');
    document.getElementById(parent1).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results1[1] + '</b></p>');
    document.getElementById(parent2).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results1[2] + '</b></p>');
  } else {
    document.getElementById(item).insertAdjacentHTML('beforeend', '<span class="temp">' + ' – ' + results1[0] + ' + ' + results2[0] + '</span>');
    document.getElementById(parent1).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results1[1] + '</b> → <span class="text-small">MK14</span></p>');
    document.getElementById(parent1).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results2[1] + '</b> → <span class="text-small">MK15</span></p>');
    document.getElementById(parent2).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results1[2] + '</b> → <span class="text-small">MK14</span></p>');
    document.getElementById(parent2).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results2[2] + '</b> → <span class="text-small">MK15</span></p>');
  }
}

// COMPUTE RATIOS
const ratioCompute = () => {
  const capacities = calculateCapacity();
  const capacity1 = capacities[0];
  const capacity2 = capacities[1];

  // 1. ADDITIVE - CEMENT MIX
  let results1 = ratio(capacity1, 5, 3, 5, 2);
  let results2 = ratio(capacity2, 5, 3, 5, 2);
  resultsToHTML(capacity2, 'item-1-cementmix', results1, results2, 'parent-cementmix-1', 'parent-cementmix-2');

  // 2. ADDITIVE - CONCRETE
  results1 = ratio(capacity1, 25, 100, 5, 1);
  results2 = ratio(capacity2, 25, 100, 5, 1);
  resultsToHTML(capacity2, 'item-2-concrete', results1, results2, 'parent-concrete-1', 'parent-concrete-2');

  // 3. ADDITIVE - EXPLOSIVE
  results1 = ratio(capacity1, 25, 5, 8, 10);
  results2 = ratio(capacity2, 25, 5, 8, 10);
  resultsToHTML(capacity2, 'item-3-explosive', results1, results2, 'parent-explosive-1', 'parent-explosive-2');

  // 4. REDUCTIVE - KEROSENE
  results1 = ratio(capacity1, 100, 150, (1 / 10), (3 / 20));
  results2 = ratio(capacity2, 100, 150, (1 / 10), (3 / 20));
  resultsToHTML(capacity2, 'item-4-kerosene', results1, results2, 'parent-kerosene-1', 'parent-kerosene-2');

  // 5. REDUCTIVE - SAND
  results1 = ratio(capacity1, 15, 250, (1 / 6), (1 / 90));
  results2 = ratio(capacity2, 15, 250, (1 / 6), (1 / 90));
  resultsToHTML(capacity2, 'item-5-sand', results1, results2, 'parent-sand-1', 'parent-sand-2');

  // 6. ADDITIVE - TREATED WATER
  results1 = ratio(capacity1, 100, 5, 1, 1);
  results2 = ratio(capacity2, 100, 5, 1, 1);
  resultsToHTML(capacity2, 'item-6-treatedwater', results1, results2, 'parent-treatedwater-1', 'parent-treatedwater-2');
}

window.onload = () => {
  capacityToHTML();
  ratioCompute();
}

document.getElementById('trunk').addEventListener('change', () => {
  document.querySelectorAll('.temp').forEach(e => e.remove());
  capacityToHTML();
  ratioCompute();
});

document.querySelectorAll('input[name="premium"]').forEach((elem) => {
  elem.addEventListener('change', function(event) {
    document.querySelectorAll('.temp').forEach(e => e.remove());
    capacityToHTML();
    ratioCompute();
  });
});

document.querySelectorAll('input[name="postop"]').forEach((elem) => {
  elem.addEventListener('change', function(event) {
    document.querySelectorAll('.temp').forEach(e => e.remove());
    capacityToHTML();
    ratioCompute();
  });
});
