const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const requests = {
  fetchPopular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`,
}

export default requests
