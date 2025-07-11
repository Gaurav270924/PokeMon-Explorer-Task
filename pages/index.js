import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchAllPokemons() {
      const promises = [];
      for (let i = 1; i <= 151; i++) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json()));
      }
      const results = await Promise.all(promises);
      setPokemons(results);
    }

    fetchAllPokemons();
  }, []);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
          🧭 Pokemon Explorer
        </h1>

        <input
          type="text"
          placeholder="Search Pokemon..."
          className="w-full px-4 py-3 rounded-xl border border-indigo-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-8 text-lg"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filtered.map((pokemon) => (
            <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
              <div className="p-4 bg-white rounded-2xl shadow hover:shadow-xl text-center cursor-pointer hover:-translate-y-1 duration-200">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-20 h-20 mx-auto mb-2"
                />
                <p className="capitalize text-xl font-semibold text-indigo-700">
                  {pokemon.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
