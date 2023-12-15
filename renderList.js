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
        console.log(newList);
      }
    }
  }
}

export default RenderList;
