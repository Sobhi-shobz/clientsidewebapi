const userDiv = document.getElementById("user");
const favoritesDiv = document.getElementById("favorites");

function loadUser() {
  fetch("https://randomuser.me/api/")
    .then(res => res.json())
    .then(data => {
      const user = data.results[0];
      userDiv.innerHTML = `
        <div class="user-card">
          <img src="${user.picture.large}" alt="User Picture" />
          <h3>${user.name.first} ${user.name.last}</h3>
          <p>${user.email}</p>
          <button onclick='saveFavorite(${JSON.stringify(user)})'>Save as Favorite</button>
        </div>
      `;
    });
}

function saveFavorite(user) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(user);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
}

function displayFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesDiv.innerHTML = favorites.map(u => `
    <img src="${u.picture.thumbnail}" title="${u.name.first} ${u.name.last}" />
  `).join("");
}

// Load favorites on page load
window.addEventListener("DOMContentLoaded", displayFavorites);
