const renderApp = async () => {
  return (document.querySelector("#app").innerHTML = `
<header>
<div class="app-width">
    <div class="navigation">
        <h1 id="site-title">POKEMONS</h1>
        <div class="search-container">
            <input
                class="search-input"
                type="text"
                id="search"
                placeholder="Search Pokemon"
                aria-labelledby="site-title"
            />
        </div>
    </div>

    <div id="pagination">
        <button class="btn" type="button" id="prev-page" aria-label="Previous page">PREVIOUS</button>
            <div id="page-number" aria-live="polite">page 1 of 8</div>
        <button class="btn" type="button" id="next-page" aria-label="Next page">NEXT</button>
    </div>
</div>
</header>
<main>
<div class="app-width">
    <div id="pokemon-list" aria-live="polite">
        <!-- Pokemon list goes here -->
    </div>
    <div id="pokemon-modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="pokemon-modal-name">
        <div class="modal-content">
            <span id="pokemon-modal-close" class="close" role="button" tabindex="0" aria-label="Close">&times;</span>
            <h2 id="pokemon-modal-name"></h2>
            <img id="pokemon-modal-image" src="" alt="" />
            <p id="pokemon-modal-height"></p>
            <p id="pokemon-modal-weight"></p>
        </div>
    </div>
</div>
</main>
`);
};

export default renderApp;
