'use strict';
const petsLocalKey = 'petArr'; // key of petArr in local storage
const breedsLocalKey = 'breedArr'; // key of breeds list in local storage
const petArr = JSON.parse(localStorage.getItem('petArr') || '[]'); // List of all pets
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
