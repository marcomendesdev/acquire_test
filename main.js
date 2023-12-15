import "./style.css";
import renderApp from "./renderApp.js";
import CacheService from "./cacheService.js";
import ApiService from "./apiService.js";
import Modal from "./modal.js";
import RenderList from "./renderList.js";
import Pagination from "./pagination.js";
import Search from "./search.js";

renderApp();
let pagination;

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
  pagination = new Pagination(data);

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
});
