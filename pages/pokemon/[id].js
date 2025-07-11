import Link from "next/link";

// ✅ Generate static paths for 151 pokemons
export async function getStaticPaths() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  const paths = data.results.map((_, index) => ({
    params: { id: `${index + 1}` },
  }));

  return {
    paths,
    fallback: false,
  };
}

// ✅ Get data for individual Pokémon at build time
export async function getStaticProps({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const pokemon = await res.json();

  return {
    props: { pokemon },
  };
}

// ✅ Component to display Pokémon details
export default function PokemonDetail({ pokemon }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <Link href="/">
          <p className="text-indigo-600 mb-4 cursor-pointer hover:underline">
            &larr; Back to Home
          </p>
        </Link>

        <h1 className="text-4xl font-bold capitalize text-center mb-6 text-pink-700">
          {pokemon.name}
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={pokemon.sprites.front_default || "/no-image.png"}
            alt={pokemon.name}
            className="w-40 h-40"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
          {/* Type */}
          <div>
            <p className="font-semibold text-gray-700 mb-1">Type:</p>
            <p>{pokemon.types.map((t) => t.type.name).join(", ")}</p>
          </div>

          {/* Abilities */}
          <div>
            <p className="font-semibold text-gray-700 mb-1">Abilities:</p>
            <p>{pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
          </div>

          {/* Stats */}
          <div className="sm:col-span-2">
            <p className="font-semibold text-gray-700 mb-1">Stats:</p>
            <ul className="list-disc pl-6">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>

          {/* Moves */}
          <div className="sm:col-span-2">
            <p className="font-semibold text-gray-700 mb-1">Moves:</p>
            <p>{pokemon.moves.slice(0, 5).map((m) => m.move.name).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
