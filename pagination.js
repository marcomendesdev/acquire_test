class Pagination {
  constructor(
    data,
    itemsPerPage,
    currentPage,
    prevPageButtonId,
    nextPageButtonId
  ) {
    this.data = data;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = currentPage;
    this.prevPageButtonId = prevPageButtonId;
    this.nextPageButtonId = nextPageButtonId;
  }

  async dataToRender() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }

  updatePageNumber() {
    const pageNumberDiv = document.getElementById("page-number");
    if (pageNumberDiv) {
      pageNumberDiv.textContent =
        "page " +
        this.currentPage +
        " of " +
        Math.ceil(this.data.length / this.itemsPerPage);
    }
  }

  async nextPage() {
    if (this.currentPage < Math.ceil(this.data.length / this.itemsPerPage)) {
      this.currentPage++;
      this.updatePageNumber();
    }
    this.checkButtonStatus();
  }

  async prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageNumber();
    }
    this.checkButtonStatus();
  }

  checkButtonStatus() {
    const prevPageButton = document.getElementById(this.prevPageButtonId);
    const nextPageButton = document.getElementById(this.nextPageButtonId);

    prevPageButton.disabled = this.currentPage <= 1;
    nextPageButton.disabled =
      this.currentPage >= Math.ceil(this.data.length / this.itemsPerPage);
  }

  setupPaginationButtons(renderCallback) {
    const prevPageButton = document.getElementById(this.prevPageButtonId);
    const nextPageButton = document.getElementById(this.nextPageButtonId);

    prevPageButton.addEventListener("click", async () => {
      await this.prevPage();
      renderCallback();
    });

    nextPageButton.addEventListener("click", async () => {
      await this.nextPage();
      renderCallback();
    });

    this.checkButtonStatus();

    document.addEventListener("keydown", async (event) => {
      if (event.key === "ArrowLeft") {
        await this.prevPage();
        renderCallback();
      } else if (event.key === "ArrowRight") {
        await this.nextPage();
        renderCallback();
      }
    });
  }
}

export default Pagination;
