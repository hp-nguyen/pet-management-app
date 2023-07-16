'use strict';
// DECLARE VARIABLES
const inputID = document.querySelector('#input-id');
const inputName = document.querySelector('#input-name');
const inputType = document.querySelector('#input-type');
const inputBreed = document.querySelector('#input-breed');
const inputVaccinated = document.querySelector('#input-vaccinated');
const inputDewormed = document.querySelector('#input-dewormed');
const inputSterilized = document.querySelector('#input-sterilized');
const findBtn = document.querySelector('#find-btn');
const allBreeds = breedArr.map(
  (breed) => breed.breedName
);
const allUniqueBreeds = [...new Set(allBreeds)];

// *** RENDER PETS FUNC ***
// 1. Create a template row element
const tbodyEl = document.querySelector('#tbody');
const templateRowContent = tbodyEl.querySelector('tr').outerHTML;
// 2. Delete tbody's  template content when load page
tbodyEl.innerHTML = '';

// 3. Function Render Table
function renderTable(petArray) {
  // Clear table body
  tbodyEl.innerHTML = '';
  // When there are no pets:
  if (petArray.length === 0) {
    // Create a new row
    const newRow = document.createElement('tr');
    newRow.innerHTML = templateRowContent;
    // Cell contains 'no pet' message
    const messageCell = document.createElement('th');
    messageCell.innerText = `No pets meet the search criteria!`;
    // Merge cells
    messageCell.setAttribute(
      'colspan',
      `${newRow.querySelectorAll('th, td').length}`
    );
    // Add row to table
    newRow.innerHTML = '';
    newRow.appendChild(messageCell);
    tbodyEl.appendChild(newRow);
  }
  // When exist pets:
  // Add new row for each pet
  for (let i = 0; i < petArray.length; i++) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = templateRowContent;
    newRow.setAttribute('data-index', i);
    // Change row's content base on pet's information
    let cells = newRow.querySelectorAll('th, td'); // Get all cells of row
    const petKeys = Object.keys(petArray[i]); // List of pet's keys
    for (let j in petKeys) {
      const currentPetAttr = petArray[i][petKeys[j]]; // Current pet's attribute
      const iconElement = cells[j].querySelector('i'); // Select cell that has icon
      if (iconElement) {
        // Check if icon cell has 'style' attribute
        const hasStyleProperty = iconElement.getAttribute('style');
        if (hasStyleProperty) {
          iconElement.outerHTML = `<i class="bi bi-square-fill" style="color: ${currentPetAttr}"></i>`;
        } else {
          // If icon cell doesn't have 'style' attribute, that's mean it is vaccinated, dewormed or sterilized cell
          iconElement.outerHTML = `<i class="bi bi-${
            currentPetAttr ? 'check' : 'x'
          }-circle-fill"></i>`;
        }
      } else {
        // This is for the rest cells
        cells[j].innerHTML = currentPetAttr;
      }
    }
    // Add row to the table
    tbodyEl.appendChild(newRow);
  }
}
// *** RENDER ALL BREEDS ***
function renderAllBreeds() {
  inputBreed.innerHTML = '';
  inputBreed.insertAdjacentHTML('afterbegin', '<option>Select Breed</option>');
  allUniqueBreeds.forEach((breedName) => {
    inputBreed.insertAdjacentHTML(
      'beforeend',
      `<option value='${breedName}'>${breedName}</option>`
    );
  });
}
renderAllBreeds();

// *** FINDING PET FEATURE ***
findBtn.addEventListener('click', function (e) {
  e.preventDefault();
  // Clear table
  tbodyEl.innerHTML = '';
  // Get & validate input values
  const searchCriteria = {
    id: inputID.value,
    name: inputName.value,
    type: inputType.value,
    breed: inputBreed.value,
    vaccinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputSterilized.checked,
  };
  // Remove unnecessary criteria
  const invalidValues = ['', 'Select Type', 'Select Breed', false];
  Object.keys(searchCriteria).forEach((key) => {
    if (invalidValues.includes(searchCriteria[key])) delete searchCriteria[key];
  });
  // Filter pets
  const searchCriteriaKeys = Object.keys(searchCriteria); // Keys for filtering
  // Func check the conditions for filtering
  function checkFilterCriteria(pet) {
    let result = true;
    searchCriteriaKeys.forEach((key) => {
      if (
        (typeof pet[key] === 'boolean' || key === 'breed' || key === 'type') &&
        pet[key] !== searchCriteria[key]
      ) {
        result = false;
      } else if (
        typeof pet[key] !== 'boolean' &&
        !pet[key].toLowerCase().includes(searchCriteria[key].toLowerCase())
      ) {
        result = false;
      }
    });
    return result;
  }
  // Get array of filtered pets
  const filteredPets = petArr.filter(
    (pet) => checkFilterCriteria(pet) === true
  );
  filteredPets.forEach((pet) => delete pet.bmi);
  // Show filtered pets
  renderTable(filteredPets);
});
