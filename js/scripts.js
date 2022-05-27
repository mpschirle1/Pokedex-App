let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  let modalContainer = document.querySelector('#modal-container');

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
      item.imageUrl = details.sprites.front_default;
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
    // Clear any existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X'; // try &#x2718;
    closeButtonElement.addEventListener('click', hideModal);

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

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonId);
    modal.appendChild(pokemonSprite);
    modal.appendChild(pokemonType);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonWeight);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  // Always reject when modal is closed
  let dialogPromiseReject;

  function hideModal() {
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    /* Since this is triggered when clicking INSIDE the modal container, this ensures it will only close when the user clicks directly on the overlay */
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
