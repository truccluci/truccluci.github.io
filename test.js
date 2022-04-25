
// Add event listener to form to read file once submitted
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  // Save the file from the input file
  // Get the first input of the form, then the first file of its files property (array)
  const file = e.target[0].files[0];

  Papa.parse(file, {
    header: true,
    complete: function(results) {
      // Read the data from results
      const { data } = results;

      // 1. BASE INFO
      console.log(results.data[0]);
      document.getElementById('result-id').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].id + '</b></p>');
      document.getElementById('result-is_online').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].is_online + '</b></p>');
      document.getElementById('result-mk13').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].mk13 + '</b></p>');
      document.getElementById('result-mk14').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].mk14 + '</b></p>');
      document.getElementById('result-mk15').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].mk15 + '</b></p>');
      document.getElementById('result-postop').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].postop + '</b></p>');
      document.getElementById('result-premium').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].premium + '</b></p>');
      document.getElementById('result-trucker').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].trucker + '</b></p>');

      // 2. STORAGE: FACTION
      document.getElementById('result-faq_acid').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_acid + '</b></p>');
      document.getElementById('result-faq_cmix').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_cmix + '</b></p>');
      document.getElementById('result-faq_conc').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_conc + '</b></p>');
      document.getElementById('result-faq_explosive').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_explosive + '</b></p>');
      document.getElementById('result-faq_kerosene').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_kerosene + '</b></p>');
      document.getElementById('result-faq_mchem').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_mchem + '</b></p>');
      document.getElementById('result-faq_oil').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_oil + '</b></p>');
      document.getElementById('result-faq_rawgas').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_rawgas + '</b></p>');
      document.getElementById('result-faq_rom').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_rom + '</b></p>');
      document.getElementById('result-faq_sand').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_sand + '</b></p>');
      document.getElementById('result-faq_sawdust').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_sawdust + '</b></p>');
      document.getElementById('result-faq_sulfur').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_sulfur + '</b></p>');
      document.getElementById('result-faq_twater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_twater + '</b></p>');
      document.getElementById('result-faq_uwater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_uwater + '</b></p>');
      document.getElementById('result-faq_wastewater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].faq_wastewater + '</b></p>');

      // 3. STORAGE: GOHQ
      document.getElementById('result-gohq_acid').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_acid + '</b></p>');
      document.getElementById('result-gohq_cmix').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_cmix + '</b></p>');
      document.getElementById('result-gohq_conc').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_conc + '</b></p>');
      document.getElementById('result-gohq_explosive').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_explosive + '</b></p>');
      document.getElementById('result-gohq_kerosene').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_kerosene + '</b></p>');
      document.getElementById('result-gohq_mchem').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_mchem + '</b></p>');
      document.getElementById('result-gohq_oil').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_oil + '</b></p>');
      document.getElementById('result-gohq_rawgas').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_rawgas + '</b></p>');
      document.getElementById('result-gohq_rom').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_rom + '</b></p>');
      document.getElementById('result-gohq_sand').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_sand + '</b></p>');
      document.getElementById('result-gohq_sawdust').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_sawdust + '</b></p>');
      document.getElementById('result-gohq_sulfur').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_sulfur + '</b></p>');
      document.getElementById('result-gohq_twater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_twater + '</b></p>');
      document.getElementById('result-gohq_uwater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_uwater + '</b></p>');
      document.getElementById('result-gohq_wastewater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].gohq_wastewater + '</b></p>');

      // 4. STORAGE: TY
      document.getElementById('result-ty_acid').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_acid + '</b></p>');
      document.getElementById('result-ty_cmix').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_cmix + '</b></p>');
      document.getElementById('result-ty_conc').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_conc + '</b></p>');
      document.getElementById('result-ty_explosive').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_explosive + '</b></p>');
      document.getElementById('result-ty_kerosene').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_kerosene + '</b></p>');
      document.getElementById('result-ty_mchem').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_mchem + '</b></p>');
      document.getElementById('result-ty_oil').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_oil + '</b></p>');
      document.getElementById('result-ty_rawgas').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_rawgas + '</b></p>');
      document.getElementById('result-ty_rom').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_rom + '</b></p>');
      document.getElementById('result-ty_sand').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_sand + '</b></p>');
      document.getElementById('result-ty_sawdust').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_sawdust + '</b></p>');
      document.getElementById('result-ty_sulfur').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_sulfur + '</b></p>');
      document.getElementById('result-ty_twater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_twater + '</b></p>');
      document.getElementById('result-ty_uwater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_uwater + '</b></p>');
      document.getElementById('result-ty_wastewater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].ty_wastewater + '</b></p>');

      // 5. STORAGE: YJ
      document.getElementById('result-yj_acid').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_acid + '</b></p>');
      document.getElementById('result-yj_cmix').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_cmix + '</b></p>');
      document.getElementById('result-yj_conc').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_conc + '</b></p>');
      document.getElementById('result-yj_explosive').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_explosive + '</b></p>');
      document.getElementById('result-yj_kerosene').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_kerosene + '</b></p>');
      document.getElementById('result-yj_mchem').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_mchem + '</b></p>');
      document.getElementById('result-yj_oil').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_oil + '</b></p>');
      document.getElementById('result-yj_rawgas').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_rawgas + '</b></p>');
      document.getElementById('result-yj_rom').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_rom + '</b></p>');
      document.getElementById('result-yj_sand').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_sand + '</b></p>');
      document.getElementById('result-yj_sawdust').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_sawdust + '</b></p>');
      document.getElementById('result-yj_sulfur').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_sulfur + '</b></p>');
      document.getElementById('result-yj_twater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_twater + '</b></p>');
      document.getElementById('result-yj_uwater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_uwater + '</b></p>');
      document.getElementById('result-yj_wastewater').insertAdjacentHTML('beforeend', '<p class="temp"><b>' + results.data[0].yj_wastewater + '</b></p>');
    }
  });
});
