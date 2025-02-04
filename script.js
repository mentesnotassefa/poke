document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('search-button').addEventListener('click', function () {
        const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
        const spriteContainer = document.getElementById('sprite-container');
        const typesElement = document.getElementById('types');

        // Clear previous search results
        document.getElementById('pokemon-name').textContent = '';
        document.getElementById('pokemon-id').textContent = '';
        document.getElementById('weight').textContent = '';
        document.getElementById('height').textContent = '';
        document.getElementById('hp').textContent = '';
        document.getElementById('attack').textContent = '';
        document.getElementById('defense').textContent = '';
        document.getElementById('special-attack').textContent = '';
        document.getElementById('special-defense').textContent = '';
        document.getElementById('speed').textContent = '';
        spriteContainer.innerHTML = '';
        typesElement.innerHTML = '';

        if (!searchInput) {
            alert('Please enter a Pokémon name or ID.');
            return;
        }

        fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon not found');
                }
                return response.json();
            })
            .then(data => {
                displayPokemonInfo(data);
            })
            .catch(error => {
                alert(error.message);
            });
    });

    function displayPokemonInfo(pokemon) {
        const spriteContainer = document.getElementById('sprite-container');
        const typesElement = document.getElementById('types');

        // Display Pokémon name and ID
        document.getElementById('pokemon-name').textContent = pokemon.name.toUpperCase();
        document.getElementById('pokemon-id').textContent = `#${pokemon.id}`;

        // Display Pokémon weight and height
        document.getElementById('weight').textContent = `Weight: ${pokemon.weight}`;
        document.getElementById('height').textContent = `Height: ${pokemon.height}`;

        // Display Pokémon stats
        document.getElementById('hp').textContent = pokemon.stats[0].base_stat;
        document.getElementById('attack').textContent = pokemon.stats[1].base_stat;
        document.getElementById('defense').textContent = pokemon.stats[2].base_stat;
        document.getElementById('special-attack').textContent = pokemon.stats[3].base_stat;
        document.getElementById('special-defense').textContent = pokemon.stats[4].base_stat;
        document.getElementById('speed').textContent = pokemon.stats[5].base_stat;

        // Display Pokémon sprite
        const spriteImg = document.createElement('img');
        spriteImg.src = pokemon.sprites.front_default;
        spriteImg.id = 'sprite';
        spriteContainer.innerHTML = '';
        spriteContainer.appendChild(spriteImg);

        // Display Pokémon types
        pokemon.types.forEach(type => {
            const typeSpan = document.createElement('span');
            typeSpan.textContent = type.type.name.toUpperCase();
            typesElement.appendChild(typeSpan);
        });
    }
});