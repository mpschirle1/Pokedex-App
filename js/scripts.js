let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  // Call this function with event listener
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class')
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    clickEvent(button, pokemon);
  }

  function clickEvent(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  return {
    add : function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll : function() {
      return pokemonList;
    },
    addListItem : addListItem
  };
})();

// Lists all Pokémon preceeded by index number, followed by weight.
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
