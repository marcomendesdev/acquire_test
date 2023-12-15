class Search {
  constructor(items) {
    this.items = items;
  }

  perform(query, property) {
    return this.items.filter((item) =>
      item[property].toLowerCase().includes(query.toLowerCase())
    );
  }
}

export default Search;
