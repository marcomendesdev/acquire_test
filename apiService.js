class ApiService {
  constructor() {
    this.url = import.meta.env.VITE_API_KEY;
    this.data = null;
    this.results = null;
    this.urlArray = null;
    this.apiDataItems = null;
  }

  async fetchApi() {
    if (!this.data) {
      const response = await fetch(
        this.url.replace("https://api-placeholder-url", this.url)
      );
      this.data = await response.json();
      this.urlArray = this.data.results.map((item) => item.url);
      this.apiDataItems = await Promise.all(
        this.urlArray.map((url) =>
          fetch(url)
            .then((response) => response.json())
            .then((data) => ({
              name: data.name,
              height: data.height,
              weight: data.weight,
              image: data.sprites.other.dream_world.front_default,
            }))
        )
      );
      console.log("Api Working:", this.apiDataItems);
    }
    return this.apiDataItems;
  }
}

export default ApiService;

