let pokemonList = [
  {
    indexNum: '#001',
    name: 'Bulbasaur',
    type: ['Grass', 'Poison'],
    height: 28
  },
  {
    indexNum: '#002',
    name: 'Ivysaur',
    type: ['Grass', 'Poison'],
    height: 39
  },
  {
    indexNum: '#003',
    name: 'Venusaur',
    type: ['Grass', 'Poison'],
    height: 79
  },
  {
    indexNum: '#004',
    name: 'Charmander',
    type: 'Fire',
    height: 24
  },
  {
    indexNum: '#005',
    name: 'Charmeleon',
    type: 'Fire',
    height: 43
  },
  {
    indexNum: '#006',
    name: 'Charizard',
    type: ['Fire', 'Flying'],
    height: 67
  },
  {
    indexNum: '#007',
    name: 'Squirtle',
    type: 'Water',
    height: 20
  },
  {
    indexNum: '#008',
    name: 'Wartortle',
    type: 'Water',
    height: 39
  },
  {
    indexNum: '#009',
    name: 'Blastoise',
    type: 'Water',
    height: 63
  },
  {
    indexNum: '#010',
    name: 'Caterpie',
    type: 'Bug',
    height: 12
  },
  {
    indexNum: '#011',
    name: 'Metapod',
    type: 'Bug',
    height: 28
  },
  {
    indexNum: '#012',
    name: 'Butterfree',
    type: ['Bug', 'Flying'],
    height: 43
  },
];

for (i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].indexNum + " - " + pokemonList[i].name + " (Height: " + pokemonList[i].height + "\")")
    if (pokemonList[i].height >= 79) {
    document.write(" Wow, that's huge!<br>")
  } else {
    document.write("<br>")
  }
}
