// 2022-04-25 - luci
// Write result to HTML
const resultsToHTML = (id, result) => {
  document.getElementById(id).innerHTML = '';
  if (result.length === 0) {
    return document.getElementById(id).insertAdjacentHTML('beforeend', '<p class="temp"><b>LOL</b></p>');
  } else {
    return document.getElementById(id).insertAdjacentHTML('beforeend', '<p class="temp"><b>' + result + '</b></p>');
  }
}

// Combine arrays to object, remove empty values
const makeObj = (arrayKey, arrayValue1, arrayValue2) => {
  let obj = Object.fromEntries(arrayKey.map((_, v) => [arrayKey[v], [arrayValue1[v], arrayValue2[v]]]));
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v[1] != ''));
}

// Write data to HTML table
const loadTable = (headID, bodyID, obj) => {
  const TABLE_HEAD = document.getElementById(headID);
  TABLE_HEAD.innerHTML = '';
  let row = TABLE_HEAD.insertRow(-1);
  row.insertCell(0).outerHTML = '<th><b>Item</b></th>';
  row.insertCell(1).outerHTML = '<th class="align-center"><b>Quantity</b></th>';

  const TABLE_BODY = document.getElementById(bodyID);
  TABLE_BODY.innerHTML = '';
  for (let val in obj) {
    let row = TABLE_BODY.insertRow(-1);
    let item = row.insertCell(0);
    let quantity = row.insertCell(1);
    let textNode;
    textNode = document.createTextNode(obj[val][0]);
    item.appendChild(textNode);
    textNode = document.createTextNode(obj[val][1]);
    quantity.appendChild(textNode);
    textNode.parentNode.classList.add('align-center');
  }
}

// Add event listener to form to read file once submitted
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  // Save the file from the input file
  // Get the first input of the form, then the first file of its files property (array)
  const file = e.target[0].files[0];

  Papa.parse(file, {
    header: true,
    complete: (results) => {
      // Read the data from results
      const { data } = results;
      // console.log(results.data[0]);

      // 1. BASE INFO
      resultsToHTML('result-id', results.data[0].id);
      resultsToHTML('result-is_online', results.data[0].is_online);
      resultsToHTML('result-mk13', results.data[0].mk13);
      resultsToHTML('result-mk14', results.data[0].mk14);
      resultsToHTML('result-mk15', results.data[0].mk15);
      resultsToHTML('result-postop', results.data[0].postop);
      resultsToHTML('result-premium', results.data[0].premium);
      resultsToHTML('result-trucker', results.data[0].trucker);

      let arrayItem = [
        'acid',
        'cmix',
        'conc',
        'explosive',
        'kerosene',
        'mchem',
        'oil',
        'rawgas',
        'rom',
        'sand',
        'sawdust',
        'sulfur',
        'twater',
        'uwater',
        'wastewater'
      ];

      let arrayItemName = [
        'Acid',
        'Cement Mix',
        'Concrete',
        'Explosive',
        'Kerosene',
        'Chemicals',
        'Crude Oil',
        'Raw Gas',
        'Raw Ore Mix',
        'Sand',
        'Sawdust',
        'Sulfur',
        'Treated Water',
        'Unfiltered Water',
        'Waste Water'
      ];

      let arrayQuantity = arrayItem.map(v => (results.data[0]['faq_' + v]));
      loadTable('table-faq-head', 'table-faq-body', makeObj(arrayItem, arrayItemName, arrayQuantity));

      arrayQuantity = arrayItem.map(v => (results.data[0]['gohq_' + v]));
      loadTable('table-gohq-head', 'table-gohq-body', makeObj(arrayItem, arrayItemName, arrayQuantity));

      arrayQuantity = arrayItem.map(v => (results.data[0]['ty_' + v]));
      loadTable('table-ty-head', 'table-ty-body', makeObj(arrayItem, arrayItemName, arrayQuantity));

      arrayQuantity = arrayItem.map(v => (results.data[0]['yj_' + v]));
      loadTable('table-yj-head', 'table-yj-body', makeObj(arrayItem, arrayItemName, arrayQuantity));
    }
  });
});
