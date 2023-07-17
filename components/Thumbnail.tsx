import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  release_date?: string;
  vote_average: number;
}

const MovieBanners: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = API_KEY;
        const language = "pt-BR";
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}`
        );

        setMovies(response.data.results);
      } catch (error) {
        console.error("Erro ao obter filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (searchTerm.trim() === "") {
      return;
    }

    try {
      const apiKey = API_KEY;
      const language = "pt-BR";
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=${language}&query=${searchTerm}`
      );

      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Erro ao pesquisar filmes:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderMovies = searchResults.length > 0 ? searchResults : movies;
  const title = searchResults.length > 0 ? `Resultados para "${searchTerm}"` : "Mais Populares";

  return (
    <div className="">
      <div className="relative w-[80%] mt-5 sm:w-[35%] m-auto  "> {/*barra de pesquisa */}
        <form onSubmit={handleSearchSubmit} className="">
          <input
            type="text"
            placeholder="Pesquisar Filme"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full py-3 pl-10 pr-4  shadow-sm  rounded-full bg-[#0f0f0f] text-white font-medium placeholder-gray-500 focus:outline-none focus:shadow-red-600"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg
              className="w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 21l-4.35-4.35M15 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
            </svg>
          </div>
        </form>
      </div>
      <div className="mix-w-[100%] ">
        <h1 className="text-end mr-10 font-semibold text-[#F7D501] text-2xl p-5  sm:text-4xl"> {/* titulo de pesquisa */}
          {title}
        </h1>

        <ul className="flex gap-4 flex-wrap justify-around text-center p-4">{/* lista de cartoes  */}
          {renderMovies.map((movie) => (
            <li
              key={movie.id}
              className="mb-10 bg-[#0F0F0F] rounded-lg overflow-hidden shadow-2xl shadow-[#000] "
            >
              <div className="w-[400px] h-[200px] relative">
                {movie.backdrop_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">
                      Carregando...
                    </p>
                  </div>
                )}
              </div>
              <Link
                className="text-center text-white text-lg font-semibold hover:underline"
                href={`/${movie.id}`}
              >
                {movie.title}
              </Link>
              <p className="mr-4 text-gray-300 text-lg">
                ⭐ {movie.vote_average.toFixed(1)}/10
              </p>
              <p className="text-gray-300 text-lg mb-2 text-center">
                {movie.release_date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieBanners;
