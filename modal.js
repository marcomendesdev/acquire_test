class Modal {
  constructor() {
    this.modalElement = document.getElementById("pokemon-modal");
    this.modalContent = this.modalElement.querySelector(".modal-content");
    this.modalClose = this.modalElement.querySelector("#pokemon-modal-close");
    this.modalName = this.modalElement.querySelector("#pokemon-modal-name");
    this.modalImage = this.modalElement.querySelector("#pokemon-modal-image");
    this.modalHeight = this.modalElement.querySelector("#pokemon-modal-height");
    this.modalWeight = this.modalElement.querySelector("#pokemon-modal-weight");

    this.modalClose.onclick = () => {
      this.close();
    };

    window.onclick = (event) => {
      if (event.target == this.modalElement) {
        this.close();
      }
    };
  }

  open() {
    this.modalElement.style.display = "block";
  }

  close() {
    this.modalElement.style.display = "none";
  }

  render(itemData) {
    this.modalName.textContent = itemData.name;
    this.modalImage.src = itemData.image;
    this.modalHeight.textContent = `Height: ${itemData.height}`;
    this.modalWeight.textContent = `Weight: ${itemData.weight}`;
    this.open();
  }
}

export default Modal;
