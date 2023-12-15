import "./style.css";
import renderApp from "./renderApp.js";
import CacheService from "./cacheService.js";
import ApiService from "./apiService.js";
import Modal from "./modal.js";
import RenderList from "./renderList.js";
import Pagination from "./pagination.js";
import Search from "./search.js";

renderApp();
let itemsPerPage = 20;
let currentPage = 1;
let pagination; // Declare pagination here

async function dataProvider() {
  const apiService = new ApiService();
  const cacheService = new CacheService("apiCache");
  const apiData = await apiService.fetchApi();
  await cacheService.addToCache(apiData);
  const cachedData = await cacheService.getFromCache();
  return cachedData;
}

const modal = new Modal();

async function renderList(data) {
  const renderList = new RenderList(data, modal);
  renderList.render();
}

dataProvider().then((data) => {
  pagination = new Pagination( // Assign to pagination here
    data,
    itemsPerPage,
    currentPage,
    "prev-page",
    "next-page"
  );

  pagination.dataToRender().then((firstPageData) => {
    renderList(firstPageData);
  });

  pagination.setupPaginationButtons(async () => {
    const currentPageData = await pagination.dataToRender();
    const renderList = new RenderList(currentPageData, modal);
    renderList.render();
  });

  const searchInput = document.querySelector("#search");
  searchInput.addEventListener("input", async (event) => {
    const query = event.target.value;
    const search = new Search(data);
    const results = search.perform(query, "name"); 
    renderList(results);
  });

  const filterInput = document.querySelector("#filter");
  filterInput.addEventListener("input", async (event) => {
    const query = event.target.value;
    const filter = new Search(data);
    const results = filter.perform(query, "propertyToFilterOn"); 
    renderList(results);
  });

  const prevPageButton = document.querySelector("#prev-page");
  const nextPageButton = document.querySelector("#next-page");

  prevPageButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      pagination.prevPage();
    }
  });

  nextPageButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      pagination.nextPage();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    pagination.prevPage();
  }
  if (event.key === "ArrowRight") {
    pagination.nextPage();
  }
});