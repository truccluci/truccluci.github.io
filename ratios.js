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
  return [capacity1, capacity2];
}

// CAPACITY TO HTML
const capacityToHTML = () => {
  const capacities = calculateCapacity();
  $('result-capacity').insertAdjacentHTML('beforeend', '<span class="temp"><b>' + Math.round(capacities[0] + capacities[1]) + '</b></span>');
}

// RATIO FOR ADDITIVE PROCESSES
const ratioAdditive = (capacity, weight1, weight2, factor1, factor2) => {
  let [totalWeight, amountProduct, amountReactant1, amountReactant2] = [0, 0, 0, 0]
  while (totalWeight <= capacity) {
	  amountProduct ++;
	  amountReactant1 = amountProduct * factor1;
    amountReactant2 = amountProduct * factor2;
    totalWeight = amountReactant1 * weight1 + amountReactant2 * weight2;
  }
  return [(amountProduct - 1), (amountReactant1 - factor1), (amountReactant2 - factor2)];
}

// RATIO FOR REDUCTIVE PROCESSES
const ratioReductive = (capacity, weight1, weight2, factor1, factor2) => {
  let [totalWeight, amountProduct, amountReactant1, amountReactant2] = [0, 0, 0, 0]
  while (totalWeight <= capacity) {
	  amountProduct ++;
	  amountReactant1 = amountProduct / factor1;
    amountReactant2 = amountProduct / factor2;
    totalWeight = amountReactant1 * weight1 + amountReactant2 * weight2;
  }
  while (!Number.isInteger(amountReactant2)) {
    amountProduct --;
    amountReactant1 = amountProduct / factor1;
    amountReactant2 = amountProduct / factor2;
  }
  return [amountProduct, amountReactant1, amountReactant2];
}

// RATIO RESULTS TO HTML
const resultsToHTML = (capacity2, item, results1, results2, parent1, parent2) => {
  if (capacity2 == 0) {
    $(item).insertAdjacentHTML('beforeend', '<span class="temp">' + ' – ' + results1[0] + '</span>');
    $(parent1).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results1[1] + '</b></p>');
    $(parent2).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results1[2] + '</b></p>');
  } else {
    $(item).insertAdjacentHTML('beforeend', '<span class="temp">' + ' – ' + results1[0] + ' + ' + results2[0] + '</span>');
    $(parent1).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results1[1] + '</b> → <span class="text-small">MK14</span></p>');
    $(parent1).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results2[1] + '</b> → <span class="text-small">MK15</span></p>');
    $(parent2).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results1[2] + '</b> → <span class="text-small">MK14</span></p>');
    $(parent2).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results2[2] + '</b> → <span class="text-small">MK15</span></p>');
  }
}

// COMPUTE RATIOS
const ratioCompute = () => {
  const capacities = calculateCapacity();
  const capacity1 = capacities[0];
  const capacity2 = capacities[1];

  // 1. ADDITIVE - CEMENT MIX
  let results1 = ratioAdditive(capacity1, 5, 3, 5, 2);
  let results2 = ratioAdditive(capacity2, 5, 3, 5, 2);
  resultsToHTML(capacity2, 'item-1-cementmix', results1, results2, 'parent-cementmix-1', 'parent-cementmix-2');

  // 2. ADDITIVE - CONCRETE
  results1 = ratioAdditive(capacity1, 25, 100, 5, 1);
  results2 = ratioAdditive(capacity2, 25, 100, 5, 1);
  resultsToHTML(capacity2, 'item-2-concrete', results1, results2, 'parent-concrete-1', 'parent-concrete-2');

  // 3. ADDITIVE - EXPLOSIVE
  results1 = ratioAdditive(capacity1, 25, 5, 8, 10);
  results2 = ratioAdditive(capacity2, 25, 5, 8, 10);
  resultsToHTML(capacity2, 'item-3-explosive', results1, results2, 'parent-explosive-1', 'parent-explosive-2');

  // 4. REDUCTIVE - KEROSENE
  results1 = ratioReductive(capacity1, 100, 150, 10, (20 / 3));
  results2 = ratioReductive(capacity2, 100, 150, 10, (20 / 3));
  resultsToHTML(capacity2, 'item-4-kerosene', results1, results2, 'parent-kerosene-1', 'parent-kerosene-2');

  // 5. REDUCTIVE - SAND
  results1 = ratioReductive(capacity1, 15, 250, 6, 90);
  results2 = ratioReductive(capacity2, 15, 250, 6, 90);
  resultsToHTML(capacity2, 'item-5-sand', results1, results2, 'parent-sand-1', 'parent-sand-2');

  // 6. ADDITIVE - TREATED WATER
  results1 = ratioAdditive(capacity1, 100, 5, 1, 1);
  results2 = ratioAdditive(capacity2, 100, 5, 1, 1);
  resultsToHTML(capacity2, 'item-6-treatedwater', results1, results2, 'parent-treatedwater-1', 'parent-treatedwater-2');
}

window.onload = () => {
  capacityToHTML();
  ratioCompute();
}

$('trunk').addEventListener('change', () => {
  document.querySelectorAll('.temp').forEach(e => e.remove());
  capacityToHTML();
  ratioCompute();
});

document.querySelectorAll("input[name='radio-prem']").forEach((elem) => {
  elem.addEventListener('change', function(event) {
    document.querySelectorAll('.temp').forEach(e => e.remove());
    capacityToHTML();
    ratioCompute();
  });
});

document.querySelectorAll("input[name='radio-postop']").forEach((elem) => {
  elem.addEventListener('change', function(event) {
    document.querySelectorAll('.temp').forEach(e => e.remove());
    capacityToHTML();
    ratioCompute();
  });
});
