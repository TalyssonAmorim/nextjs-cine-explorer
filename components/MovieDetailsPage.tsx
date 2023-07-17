import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "./header";
import Footer from "./Footer";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  release_date?: string;
  vote_average: number;
  overview: string;
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
}

const MovieDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const language = "pt-BR";
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${language}`
        );

        setMovie(response.data);
      } catch (error) {
        console.error("Erro ao obter detalhes do filme:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }
  const formattedVoteAverage = movie.vote_average.toFixed(1);
  const voltar = () => {
    window.history.back();
  };

  return (
    <div>
      <Header />
      <div className="flex flex-wrap m-auto items-center bg-[#0f0f0f] p-10 rounded-lg w-[80%] relative   mt-16   ">
        <h1 className="text-2xl mb-4 w-full text-center p-2 sm:text-4xl">
          {movie.title}
        </h1>
        <div className="flex flex-wrap justify-center items-center ">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-[300px] h-[200px] object-cover rounded-xl mb-4 sm:w-[500px] sm:h-[360px]"
          />
          <div className="w-full md:w-2/3 lg:w-1/2 px-4 ">
            <h2 className="text-xs mb-4 sm:text-2xl mt-10">
              Classificação: {formattedVoteAverage}
              <span>⭐</span>
            </h2>
            <h2 className="text-xs mb-4 sm:text-2xl">
              Sinopse:
              <p className="text-xs mt-4 sm:text-xl">{movie.overview}</p>
            </h2>
            <p className="text-xs mb-4 sm:text-2xl">
              Duração: {movie.runtime} minutos
            </p>
            <p className="text-xs sm:text-2xl">
              Gênero: {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <button
              className="bg-[#F7D501] hover:bg-[#F7D450] text-white font-bold py-2 px-4 rounded mt-12 m-auto"
              onClick={voltar}
            >
              Voltar
            </button>

          </div>
        </div>
      </div>
      <div className="w-full fixed bottom-0">
      <Footer />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
