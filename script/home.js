'use strict';
const currentDate = new Date();
let healthyPetsArr = []; // List of healthy pets
let isHealthyBtn = true; // Status for show pet btn
const calculateBmiBtn = document.querySelector('#calculate-bmi-btn');
// ADD NEW PET FEATURE
// Validate data when click Submit button & Add new pet if all data is valid
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  // Get new pet's data
  const newPetData = {
    id: inputID.value,
    name: inputName.value,
    age: parseInt(inputAge.value),
    type: inputType.value,
    weight: parseInt(inputWeight.value),
    length: parseInt(inputLength.value),
    breed: inputBreed.value,
    color: inputColor.value,
    vaccinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputSterilized.checked,
    bmi: '?',
    date: `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`,
  };

  // Validate data
  const isValidate = validateData(
    noEmptyCheck(formFields),
    ageCheck(inputAge),
    weightCheck(inputWeight),
    lengthCheck(inputLength),
    idCheck(inputID)
  );

  // Add new pet when all data is validated
  if (isValidate) {
    petArr.push(newPetData); 
    saveToStorage(petsLocalKey, petArr); 
    renderTable(petArr); 
    clearInput(); 
  }
});

// DELETE PET FEATURE
function deletePet(e) {
  if (confirm('Are you sure?')) {
    const petRow = e.target.parentElement.parentElement; // Select the corresponding row of delete button
    const petID = petRow.querySelector('th').innerText; // Get the pet's ID of that row

    // Find and remove the pet with the corresponding ID in the petArr
    for (let i in petArr) {
      if (petID === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage(petsLocalKey, petArr); 
        updateHealthyPets();
        renderTable(isHealthyBtn ? petArr : healthyPetsArr);
      }
    }
  }
}
// SHOW HEALTHY PET FUNCTIONALITY
const showPetsBtn = document.querySelector('#healthy-btn'); //Button show pets
// 1. Create healthyPetsArr in globals cope
// 2. Function to update array healthy pets. *** NEED UPDATE WHEN: Click show pets  | After Deleting pet ***
function updateHealthyPets() {
  // Filter healthy pets from petArr to healthyPetsArr (A healthy pet means it has been vaccinated & dewormed & sterilized)
  healthyPetsArr = petArr.filter(function (pet) {
    return (
      pet.vaccinated === true &&
      pet.dewormed === true &&
      pet.sterilized === true
    );
  });
}
showPetsBtn.addEventListener('click', function () {
  // 3. Update healthy pets
  updateHealthyPets();
  // 4. Create isHealthyBtn in global scope to check status of showPetsBtn ,initial value is true. isHealthyBtn = true means showPetsBtn's status is 'Show healthy pets' | isHealthyBtn = false means showPetsBtn's status is 'Show all pets'.
  // 5. When click on show pets button:
  // - If isHealthyBtn = true => renderTable(heathyPetsArr), showPetsBtn's content = 'Show all pets' & isHealthyBtn = false
  // - If isHealthyBtn = false => renderTable(petArr), showPetsBtn's content = 'Show healthy pets' & isHealthyBtn = true
  if (isHealthyBtn) {
    renderTable(healthyPetsArr);
    showPetsBtn.innerText = 'Show All Pets';
    isHealthyBtn = false;
  } else {
    renderTable(petArr);
    showPetsBtn.innerText = 'Show Healthy Pets';
    isHealthyBtn = true;
  }
});

// CALCULATE BMI FEATURE
calculateBmiBtn.addEventListener('click', function () {
  for (let i in petArr) {
    if (petArr[i].type === 'Cat') {
      catBmi(petArr[i]);
    } else {
      dogBmi(petArr[i]);
    }
  }
  renderTable(isHealthyBtn ? petArr : healthyPetsArr);
});
// Function Calculate cat's BMI
function catBmi(cat) {
  cat.bmi = ((cat.weight * 703) / cat.length ** 2).toFixed(2);
}
// Function Calculate dog's BMI
function dogBmi(dog) {
  dog.bmi = ((dog.weight * 886) / dog.length ** 2).toFixed(2);
}
