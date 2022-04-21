// 2022-04-19 - luci
const $ = (id) => {
    return document.getElementById(id);
}

// CALCULATE TRUNK CAPACITY
const calculateCapacity = () => {
  const trunk = $("trunk").value;
  let multiple;
  if ($("premium-0").checked && $("postop-0").checked) {
    multiple = 1;
  } else if ($("premium-1").checked && $("postop-1").checked) {
    multiple = 1.3;
  } else {
    multiple = 1.15;
  }
  let capacity;
  if (trunk == 'mk13') {
    capacity = 8500 * multiple;
  } else if (trunk == 'mk14') {
    capacity = 9000 * multiple;
  } else if (trunk == 'mk15') {
    capacity = 6000 * multiple;
  }
  $("result-capacity").value = Math.round(capacity);
}

// 1. REDUCTIVE - ACID
const calcAcid = () => {
  const capacity = $("result-capacity").value;
  const WEIGHT_CHEMICALS = 25;
  let [totalWeight, amountAcid, amountChemicals] = [0, 0, 0]
  while (totalWeight <= capacity) {
	  amountAcid ++;
	  amountChemicals = amountAcid / 4;
    totalWeight = amountChemicals * WEIGHT_CHEMICALS;
  }
  while (!Number.isInteger(amountChemicals)) {
    amountAcid --;
    amountChemicals = amountAcid / 4;
  }
  $("item-1-acid").childNodes[0].textContent = 'Acid – ' + amountAcid;
  $("result-acid-1").value = amountChemicals;
}

// 2. ADDITIVE - CEMENT MIX
const calcCementMix = () => {
  const capacity = $("result-capacity").value;
  const WEIGHT_SAND = 5;
  const WEIGHT_SAWDUST = 3;
  let [totalWeight, amountCementMix, amountSand, amountSawdust] = [0, 0, 0, 0]
  while (totalWeight <= capacity) {
	  amountCementMix ++;
	  amountSand = amountCementMix * 5;
    amountSawdust = amountCementMix * 2;
    totalWeight = amountSand * WEIGHT_SAND + amountSawdust * WEIGHT_SAWDUST;
  }
  $("item-2-cementmix").childNodes[0].textContent = 'Cement Mix – ' + (amountCementMix - 1);
  $("result-cementmix-1").value = amountSand - 5;
  $("result-cementmix-2").value = amountSawdust - 2;
}

// 3. ADDITIVE - CONCRETE
const calcConcrete = () => {
  const capacity = $("result-capacity").value;
  const WEIGHT_CEMENT_MIX = 25;
  const WEIGHT_TREATED_WATER = 100;
  let [totalWeight, amountConcrete, amountCementMix, amountTreatedWater] = [0, 0, 0, 0]
  while (totalWeight <= capacity) {
	  amountConcrete ++;
	  amountCementMix = amountConcrete * 5;
    amountTreatedWater = amountConcrete * 1;
    totalWeight = amountCementMix * WEIGHT_CEMENT_MIX + amountTreatedWater * WEIGHT_TREATED_WATER;
  }
  $("item-3-concrete").childNodes[0].textContent = 'Concrete – ' + (amountConcrete - 1);
  $("result-concrete-1").value = amountCementMix - 5;
  $("result-concrete-2").value = amountTreatedWater - 1;
}

// 4. ADDITIVE - EXPLOSIVE
const calcExplosive = () => {
  const capacity = $("result-capacity").value;
  const WEIGHT_KEROSENE = 25;
  const WEIGHT_SULFUR = 5;
  let [totalWeight, amountExplosive, amountKerosene, amountSulfur] = [0, 0, 0, 0]
  while (totalWeight <= capacity) {
	  amountExplosive ++;
	  amountKerosene = amountExplosive * 8;
    amountSulfur = amountExplosive * 10;
    totalWeight = amountKerosene * WEIGHT_KEROSENE + amountSulfur * WEIGHT_SULFUR;
  }
  $("item-4-explosive").childNodes[0].textContent = 'Explosive – ' + (amountExplosive - 1);
  $("result-explosive-1").value = amountKerosene - 8;
  $("result-explosive-2").value = amountSulfur - 10;
}

// 5. REDUCTIVE - KEROSENE
const calcKerosene = () => {
  const capacity = $("result-capacity").value;
  const WEIGHT_TREATED_WATER = 100;
  const WEIGHT_CRUDE_OIL = 150;
  let [totalWeight, amountKerosene, amountTreatedWater, amountCrudeOil] = [0, 0, 0, 0]
  while (totalWeight <= capacity) {
	  amountKerosene ++;
	  amountTreatedWater = amountKerosene / 10;
    amountCrudeOil = amountKerosene / (20 / 3);
    totalWeight = amountTreatedWater * WEIGHT_TREATED_WATER + amountCrudeOil * WEIGHT_CRUDE_OIL;
  }
  while (!Number.isInteger(amountCrudeOil)) {
    amountKerosene --;
    amountTreatedWater = amountKerosene / 10;
    amountCrudeOil = amountKerosene / (20 / 3);
  }
  $("item-5-kerosene").childNodes[0].textContent = 'Kerosene – ' + amountKerosene;
  $("result-kerosene-1").value = amountTreatedWater;
  $("result-kerosene-2").value = amountCrudeOil;
}

// 6. REDUCTIVE - SAND
const calcSand = () => {
  const capacity = $("result-capacity").value;
  const WEIGHT_ROM = 15;
  const WEIGHT_EXPLOSIVE = 250;
  let [totalWeight, amountSand, amountROM, amountExplosive] = [0, 0, 0, 0]
  while (totalWeight <= capacity) {
	  amountSand ++;
	  amountROM = amountSand / 6;
    amountExplosive = amountSand / 90;
    totalWeight = amountROM * WEIGHT_ROM + amountExplosive * WEIGHT_EXPLOSIVE;
  }
  while (!Number.isInteger(amountExplosive)) {
    amountSand --;
    amountROM = amountSand / 6;
    amountExplosive = amountSand / 90;
  }
  $("item-6-sand").childNodes[0].textContent = 'Sand – ' + amountSand;
  $("result-sand-1").value = amountROM;
  $("result-sand-2").value = amountExplosive;
}

// 7. ADDITIVE - TREATED WATER
const calcTreatedWater = () => {
  const capacity = $("result-capacity").value;
  const WEIGHT_UNTREATED_WATER = 100;
  const WEIGHT_ACID = 5;
  let [totalWeight, amountTreatedWater, amountUntreatedWater, amountAcid] = [0, 0, 0, 0]
  while (totalWeight <= capacity) {
	  amountTreatedWater ++;
	  amountUntreatedWater = amountTreatedWater * 1;
    amountAcid = amountTreatedWater * 1;
    totalWeight = amountUntreatedWater * WEIGHT_UNTREATED_WATER + amountAcid * WEIGHT_ACID;
  }
  $("item-7-treatedwater").childNodes[0].textContent = 'Treated Water – ' + (amountTreatedWater - 1);
  $("result-treatedwater-1").value = amountUntreatedWater - 1;
  $("result-treatedwater-2").value = amountAcid - 1;
}

const calcRatios = () => {
  calculateCapacity();
  calcAcid();
  calcCementMix();
  calcConcrete();
  calcExplosive();
  calcKerosene();
  calcSand();
  calcTreatedWater();
}

window.onload = () => {
  calcRatios();
}

$('trunk').addEventListener('change', () => {
  calcRatios();
});

document.querySelectorAll('input[name="radio-prem"]').forEach((elem) => {
  elem.addEventListener("change", function(event) {
    calcRatios();
  });
});

document.querySelectorAll('input[name="radio-postop"]').forEach((elem) => {
  elem.addEventListener("change", function(event) {
    calcRatios();
  });
});
