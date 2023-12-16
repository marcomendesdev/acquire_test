class RenderList {
  constructor(data, modal) {
    this.data = data;
    this.modal = modal;
  }

  render() {
    if (this.data.length > 0) {
      const newList = document.createElement("ul");
      newList.className = "newElement";

      for (const itemData of this.data) {
        const listItem = document.createElement("li");

        listItem.setAttribute("tabindex", "0");

        const img = document.createElement("img");
        img.src = itemData.image;
        img.alt = itemData.name;

        const p = document.createElement("p");
        p.textContent = itemData.name;

        listItem.appendChild(img);
        listItem.appendChild(p);

        listItem.addEventListener("click", () => {
          this.modal.render(itemData);
        });

        listItem.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.stopPropagation();
            if (this.modal.modalElement.style.display === "block") {
              this.modal.close();
            } else {
              listItem.click();
            }
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            if (listItem.nextElementSibling) {
              listItem.nextElementSibling.focus();
            }
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (listItem.previousElementSibling) {
              listItem.previousElementSibling.focus();
            }
          }
        });

        newList.appendChild(listItem);
      }

      const parentElement = document.querySelector("#pokemon-list");
      const newElement = document.querySelector(".newElement");

      const loadingElements = document.querySelectorAll(".loading");

      loadingElements.forEach((element) => {
        element.remove();
      });

      if (newElement) {
        newElement.replaceWith(newList);
      } else {
        parentElement.appendChild(newList);
      }
    }
  }
}

export default RenderList;
