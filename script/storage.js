'use strict';
const petsLocalKey = 'petArr'; // key of petArr in local storage
const breedsLocalKey = 'breedArr'; // key of breeds list in local storage
const petArr = JSON.parse(localStorage.getItem('petArr') || '[]'); // List of all pets
const defaultBreeds = [
  { breedName: 'American Shorthair', type: 'Cat' },
  { breedName: 'British Shorthair', type: 'Cat' },
  { breedName: 'Mèo Mướp VN', type: 'Cat' },
  { breedName: 'Chó mực', type: 'Dog' },
  { breedName: 'Corgi', type: 'Dog' },
  { breedName: 'Husky', type: 'Dog' },
];
const breedArr = JSON.parse(localStorage.getItem('breedArr')) || defaultBreeds; // Breed array
// Toogle Sidebar
const sidebar = document.querySelector('#sidebar')
const sidebarTitle = document.querySelector('#sidebar-title')
sidebarTitle.addEventListener('click', function() {
  sidebar.classList.toggle('active')
})

// Func to save data to local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Func to get data from local storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? undefined;
}
