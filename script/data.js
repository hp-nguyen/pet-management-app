'use strict';
const importBtn = document.querySelector('#import-btn');
const exportBtn = document.querySelector('#export-btn');
const importField = document.querySelector('#input-file');
let importPets;
// Template of pet's data
const petTemplate = {
  id: '',
  name: '',
  age: '',
  type: '',
  weight: '',
  length: '',
  breed: '',
  color: '',
  vaccinated: '',
  dewormed: '',
  sterilized: '',
  bmi: '?',
  date: '',
};

// EXPORT FEATURE
function exportDataToFile() {
  const jsonData = JSON.stringify(petArr, null, 2)
  
  // Create a Blob object to store the data
  const blob = new Blob([jsonData], { type: 'application/json' });

  // Create a URL to the file
  const url = URL.createObjectURL(blob);

  // Create an anchor element to create a link to the file
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.json'; // File name

  // Click on the link to download the file
  link.click();
}
exportBtn.addEventListener('click', exportDataToFile);

// IMPORT FEATURE
importBtn.addEventListener('click', function () {
  if (!importField.files[0]) return alert('Please input file!');
  // Read file
  const importFile = importField.files[0];
  const reader = new FileReader();
  reader.readAsText(importFile);
  // Handle the event when the FileReader has finished reading the file content
  reader.addEventListener('load', function () {
    const content = this.result;
    importPets = JSON.parse(content);
    // Check and handle duplicate pet IDs
    const existingIDs = petArr.map((pet) => pet.id);
    importPets.forEach((pet) => {
      // Handle date
      const dateAdded = new Date(pet.date);
      if (!isNaN(dateAdded)) {
        pet.date = `${dateAdded.getDate()}/${
          dateAdded.getMonth() + 1
        }/${dateAdded.getFullYear()}`;
      }
      const curPetIndex = existingIDs.indexOf(pet.id);
      // If current pet is new pet
      if (curPetIndex < 0) {
        petArr.push(Object.assign({}, petTemplate, pet));
      } else {
        Object.assign(petArr[curPetIndex], pet);
      }
    });
    saveToStorage(petsLocalKey, petArr);
    alert('Imported successfully!');
    document.querySelector('form').reset()
  });
});
