'use strict';
// DECALRE VARIABLES
const breedArr = JSON.parse(localStorage.getItem('breedArr') || '[]'); // Breed array
const breedInput = document.querySelector('#input-breed'); // Breed Name input
const typeInput = document.querySelector('#input-type'); // Breed Type input
const submitBtn = document.querySelector('#submit-btn'); // Submit Btn
const tbodyEl = document.querySelector('#tbody'); // tbody element of breed table

// RENDER BREED TABLE FUNC
function renderBreedTable(breeds) {
  tbodyEl.innerHTML = '';
  if (breeds.length < 1) {
    const newRow = document.createElement('tr');
    newRow.innerHTML =`<td colspan="4">There aren't any breeds!</td>`
    tbodyEl.appendChild(newRow)
    return
  }
  breeds.forEach((breed, i) => {
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-index', `${i}`)
    newRow.innerHTML = `<td>${i + 1}</td>
    <td>${breed.breedName}</td>
    <td>${breed.type}</td>
    <td><button onclick="deleteBreed(event)" type="button" class="btn btn-danger">Delete</button></td>`;
    tbodyEl.append(newRow);
  });
  
}
// Render Breed table when first load
renderBreedTable(breedArr);

// ADD CLICK EVENT FOR SUBMIT BTN
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  // Get breed data from input
  const breedData = {
    breedName: breedInput.value,
    type: typeInput.value,
  };
  // Validate input func
  function validateBreed(breed) {
    if (breed.breedName.trim() === '') {
      alert('Please input Breed name!');
      return false;
    }
    if (breed.type === 'Select Type') {
      alert('Please select Breed type!');
      return false;
    }
    return true;
  }
  // Validate data and push to breed array
  if (validateBreed(breedData)) {
    breedArr.push(breedData);
    renderBreedTable(breedArr);
    function clearInput() {
      breedInput.value = ''
      typeInput.selectedIndex = 0
    }
    saveToStorage(breedsLocalKey, breedArr);
    clearInput()
  }
});

// DELETE BREED FUNC
function deleteBreed(e) {
  if (confirm('Are you sure?')) {
    const breedRow = e.target.closest('tr'); // Select the corresponding row of delete button
    const breedIndex = Number(breedRow.dataset.index); // Get the breed index
    breedArr.splice(breedIndex, 1); // Delete breed
    renderBreedTable(breedArr); // Re-render Breed table
    saveToStorage(breedsLocalKey, breedArr); // Update breedArr to local storage
  }
}

