class RenderList {
  constructor(data, modal) {
    this.data = data;
    this.modal = modal;
  }

  render() {
    if (this.data.length > 0) {
      const newList = document.createElement("ul");
      newList.className = "fallBackList";

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
      const fallBackList = document.querySelector(".fallBackList");

      if (fallBackList) {
        fallBackList.replaceWith(newList);
      } else {
        parentElement.appendChild(newList);
      }
    }
  }
}

export default RenderList;
