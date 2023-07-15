'use strict';
// DECLARE VARIABLES
const formContainer = document.querySelector('#container-form');
const editPetArr = petArr.map((pet) => {
  return { ...pet };
});
editPetArr.forEach((pet) => delete pet.bmi);
let curPet; // Current edit pet
let curPetIndex; // Current pet's index in editPetArr & petArr
// Show all pets when load page
renderTable(editPetArr);
// Edit pet func
function editPet(e) {
  formContainer.classList.remove('hide'); // Show form
  curPetIndex = e.closest('tr').dataset.index;
  curPet = editPetArr[curPetIndex]; // Current edit pet
  const curPetKeys = Object.keys(curPet); // Keys of current pet

  // Tranfer pet's details to form
  formFields.forEach((field, i) => {
    if (field === inputColor) {
      field.value = curPet.color;
    } else field.value = curPet[curPetKeys[i]];
  });
  // Render breeds
  renderBreeds(getFromStorage(breedsLocalKey), inputType.value);
  inputBreed.value = curPet.breed;
  // Render checkboxes
  checkboxes.forEach((checkbox, i) => {
    checkbox.checked = curPet[curPetKeys[i + formFields.length]];
  });
}
// *** SUBMIT EDIT PET ***
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  // Validate data
  const isValidate = validateData(
    noEmptyCheck(formFields),
    ageCheck(inputAge),
    weightCheck(inputWeight),
    lengthCheck(inputLength)
  );

  // When all data is validated
  if (isValidate) {
    // Update pet details
    const curPetKeys = Object.keys(curPet);
    const allFields = [...formFields, ...checkboxes];
    allFields.forEach((field, i) => {
      if (field === inputColor) {
        curPet.color = field.value;
      } else if (field === inputBreed) {
        curPet.breed = field.value;
      } else if (field.type === 'checkbox') {
        curPet[curPetKeys[i]] = field.checked;
      } else curPet[curPetKeys[i]] = field.value;
    });
    renderTable(editPetArr);
    clearInput();
    formContainer.classList.add('hide'); // Hide form
    // Transfer edit pet's data to petArr
    curPetKeys.forEach((key) => {
      petArr[curPetIndex][key] = curPet[key];
    });

    saveToStorage(petsLocalKey, petArr);
  }
});
