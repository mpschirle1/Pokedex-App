let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  // Search function for Navbar
  let search = document.getElementById('poke-search');
  search.addEventListener('input', searchList);

  function searchList() {
  let searchInput = document.getElementById('poke-search').value;
  // Prevents no results when user input includes upper case letters
  searchInput = searchInput.toLowerCase();
  let listItem = $('li');
  listItem.each(function () {
    let item = $(this);
    let name = item.text();
    if (name.includes(searchInput)) {
      item.show();
    } else {
      item.hide();
    }
  });
}

  // Call this function with event listener
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-custom', 'col-6', 'mx-auto');
    button.classList.add('list-group-item', 'list-group-item-action');
    button.setAttribute('data-target', '#poke-modal');
    button.setAttribute('data-toggle', 'modal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    clickEvent(button, pokemon);
  }

  function clickEvent(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (repsonse) {
      return repsonse.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other['official-artwork'].front_default;
      item.id = details.id;

      item.feet = Math.floor(details.height * 0.32808); // dm to ft
      item.inches = Math.round((details.height * 0.32808 - item.feet) * 12);
      if (item.inches === 12) {
        item.inches = 0;
        item.feet++;
      }

      item.weight = (details.weight * 0.2204622622); // hg to lb

      let types = [];
      details.types.forEach((item) => types.push(item.type.name));
      item.types = types;

    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(pokemon) {
    let modalBody = document.querySelector('#poke-modal-body');
    let modalTitle = document.querySelector('#poke-modal-title');
    let modalHeader = document.querySelector('#poke-modal-header');

    // Clear any existing modal content
    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = pokemon.name;

    let pokemonId = document.createElement('h2');
    pokemonId.innerText = "#" + pokemon.id.toString().padStart(3, 0);

    let pokemonSprite = document.createElement('img');
    pokemonSprite.src = pokemon.imageUrl;
    pokemonSprite.classList.add('pokemon-sprite');

    let pokemonType = document.createElement('p');
    pokemonType.innerText = 'Type: ' + pokemon.types.join(', ');
    pokemonType.classList.add('pokemon-type');

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Height: ' + pokemon.feet + '\' ' + pokemon.inches + '\"';

    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = 'Weight: ' + pokemon.weight.toFixed(1) + ' lbs';

    modalTitle.appendChild(pokemonName);
    modalTitle.appendChild(pokemonId);
    modalBody.appendChild(pokemonSprite);
    modalBody.appendChild(pokemonType);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonWeight);
  }

  return {
    add : add,
    getAll : getAll,
    addListItem : addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
