const appCtn = document.querySelector(".app-container");
const input = document.querySelector("#search-bar");
const srchBtn = document.querySelector("#search-btn");
const imgCtn = document.querySelector("#image-grid");

const showMore = document.querySelector(".show-more");

const apiKey = "jIkuxmUMrTn1Wsp2uUsj03Xc5Eys7nXXg_18HpfEXq8";

let inputData = "";
let page = 1;

async function searchImages(page, inputData) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}&per_page=11`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  localStorage.setItem("images", JSON.stringify(results));
  localStorage.setItem("pages", page);
  if (page === 1) {
    imgCtn.innerHTML = "";
  }
  console.log(results);

  results.map(function (result) {
    console.log(result.urls.small);

    const imgEl = document.createElement("img");
    imgEl.src = result.urls.small;
    imgEl.alt = result.alt_descripton;
    imgCtn.appendChild(imgEl);
  });
  showMore.style.display = "block";
}

function getDataFromLs() {
  const storedImages = JSON.parse(localStorage.getItem("images"));
  const storedPage = localStorage.getItem("pages");

  storedImages.map(function (image) {
    console.log(image.urls.small);

    const imgEl = document.createElement("img");
    imgEl.src = image.urls.small;
    imgEl.alt = image.alt_descripton;
    imgCtn.appendChild(imgEl);
  });
  showMore.style.display = "block";
}

srchBtn.addEventListener("click", () => {
  page = 1;
  inputData = input.value.trim();
  searchImages(page, inputData);
});

showMore.addEventListener("click", () => {
  page++;
  searchImages(page, inputData);
});

document.addEventListener("DOMContentLoaded", getDataFromLs());
