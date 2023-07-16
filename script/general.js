'use strict';
// Note: This file is the common part between Home & Edit
// DECLARE VARIABLES
// Pet's information fields
const inputID = document.querySelector('#input-id');
const inputName = document.querySelector('#input-name');
const inputAge = document.querySelector('#input-age');
const inputType = document.querySelector('#input-type');
const inputWeight = document.querySelector('#input-weight');
const inputLength = document.querySelector('#input-length');
const inputColor = document.querySelector('#input-color-1');
const inputBreed = document.querySelector('#input-breed');
const inputVaccinated = document.querySelector('#input-vaccinated');
const inputDewormed = document.querySelector('#input-dewormed');
const inputSterilized = document.querySelector('#input-sterilized');
const formFields = document.querySelectorAll('.form-control'); //List of input fields with class form-control
const checkboxes = document.querySelectorAll('.custom-control-input'); // List of form's checkboxes
const submitBtn = document.querySelector('#submit-btn'); // Submit btn
// *** VALIDATE DATA ***
// Data validation function
function validateData(
  noEmptyResult,
  ageResult,
  weightResult,
  lengthResult,
  idResult = true
) {
  if (noEmptyResult && ageResult && weightResult && lengthResult && idResult)
    return true;
  return false;
}
// Function Show message for wrong input
function showInvalidMessage(element, message) {
  element.textContent = message;
}
// Function Add invalid class for wrong input field
function addInvalidClass(field) {
  field.classList.add('invalid');
}
// Function Remove invalid class for right input field
function removeInvalidMessage(field) {
  field.classList.remove('invalid');
}
// Function check if a field is empty, return true mean that field is empty
function emptyFieldCheck(field) {
  // Element shows message for corresponding input field
  const invalidMessage = field.nextElementSibling;
  if (
    //When field is empty
    !field.value.trim() ||
    (field.tagName === 'SELECT' && field.selectedIndex <= 0)
  ) {
    addInvalidClass(field);
    const labelElement = document.querySelector(`label[for=${field.id}]`); // The corresponding label element of the input field.
    showInvalidMessage(
      invalidMessage,
      field.tagName === 'SELECT'
        ? `Please select ${labelElement.textContent}!`
        : `Please input ${labelElement.textContent}!`
    );
    return true;
  } else {
    //When field is not empty
    removeInvalidMessage(field);
    showInvalidMessage(invalidMessage, '');
    return false;
  }
}
// Function check all fields to see if there are any empty fields
function noEmptyCheck(fields) {
  let valid = true; // Status of no empty, true mean there are no empty fields
  for (let i = 0; i < fields.length; i++) {
    if (emptyFieldCheck(fields[i])) {
      valid = false;
    }
  }
  return valid;
}
// ID check function
function IDCheck(inputID) {
  if (petArr.length > 0) {
    for (let pet of petArr) {
      if (inputID.value === pet.id) {
        const invalidMessage = inputID.nextElementSibling; //Element shows message for corresponding input field
        showInvalidMessage(invalidMessage, 'ID already exists!');
        addInvalidClass(inputID);
        return false;
      }
    }
  }
  return true;
}

// Age check function
function ageCheck(inputAge) {
  if (parseInt(inputAge.value) < 1 || parseInt(inputAge.value) > 15) {
    const invalidMessage = inputAge.nextElementSibling;
    showInvalidMessage(invalidMessage, 'Age must be between 1 and 15!');
    addInvalidClass(inputAge);
    return false;
  } else return true;
}
// Weight check function
function weightCheck(inputWeight) {
  if (parseInt(inputWeight.value) < 1 || parseInt(inputWeight.value) > 15) {
    const invalidMessage = inputWeight.nextElementSibling;
    showInvalidMessage(invalidMessage, 'Weight must be between 1 and 15!');
    addInvalidClass(inputWeight);
    return false;
  } else return true;
}
// Length check function
function lengthCheck(inputLength) {
  if (parseInt(inputLength.value) < 1 || parseInt(inputLength.value) > 100) {
    const invalidMessage = inputLength.nextElementSibling;
    showInvalidMessage(invalidMessage, 'Length must be between 1 and 100!');
    addInvalidClass(inputLength);
    return false;
  } else return true;
}
// Validate when user input data
for (let i = 0; i < formFields.length; i++) {
  formFields[i].addEventListener('input', function () {
    emptyFieldCheck(this);
  });
}
// *** RENDER PETS ***
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
    messageCell.innerText = `There aren't any pets!`;
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

// *** FUNCTION TO CLEAR DATA FROM INPUT FORM ***
function clearInput() {
  // Clear Text fields & Select fields
  for (let field of formFields) {
    if (field.tagName === 'SELECT') {
      field.selectedIndex = 0;
    } else if (field.type === 'color') {
      field.value = '#000000';
    } else {
      field.value = '';
    }
  }
  // Clear Checkboxes

  for (let checkbox of checkboxes) {
    checkbox.checked = false;
  }
}
// *** BREED FEATURES ***
// Show Breed Func
function renderBreeds(breeds, type) {
  inputBreed.innerHTML = '';
  inputBreed.insertAdjacentHTML('afterbegin', ' <option>Select Breed</option>');
  // Get unique breed names corresponding to type from breedArr
  const breedNames = new Set(
    breeds
      .filter((breed) => breed.type === type)
      .map((breed) => breed.breedName)
      .sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
      })
  );
  breedNames.forEach((breedName) => {
    inputBreed.insertAdjacentHTML(
      'beforeend',
      `<option value='${breedName}'>${breedName}</option>`
    );
  });
}

// Render breed when choose pet type
inputType.addEventListener('change', function () {
  const type = this.value;
  renderBreeds(breedArr, type);
});
