const pokedex = document.getElementById("pokedex");

const fetchPokemon = async () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  const results = await Promise.all(promises);
  const pokemon = results.map((data) => ({
    name: data.name,
    id: data.id,
    image: data.sprites["front_default"],
    type: data.types.map((type) => type.type.name).join(", "),
  }));
  displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
  pokemon.forEach((poke) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const spanName = document.createElement("span");
    const spanType = document.createElement("span");
    const nameContainer = document.createElement("div");

    img.src = poke.image;
    h2.textContent = `#${poke.id}`;
    spanName.textContent = poke.name;
    spanType.textContent = `Type: ${poke.type}`;

    spanName.id = `pokemon-name`;
    spanType.id = `pokemon-type`;
    li.id = `card`;
    nameContainer.className = "nameContainer";

    li.appendChild(img);
    nameContainer.appendChild(h2);
    nameContainer.appendChild(spanName);
    li.appendChild(nameContainer);
    li.appendChild(spanType);
    pokedex.appendChild(li);
  });
};

fetchPokemon();
