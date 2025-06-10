import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaYoutube,
  FaHistory,
  FaFire,
  FaMusic,
  FaGamepad,
  FaFilm,
} from 'react-icons/fa';
import { Parallax } from 'react-scroll-parallax';

const VideoPlayer = lazy(() => import('../components/VideoPlayer'));

// Função para extrair ID de vídeos do YouTube
const extractVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Interface para vídeos do YouTube
interface YouTubeVideo {
  id: string | number;
  url: string;
  title: string;
  thumbnail: string;
  channel?: string;
  views?: string;
  published?: string;
}

const mockResults: YouTubeVideo[] = [
  {
    id: Date.now(),
    url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    title: `Resultado 1`,
    thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
    channel: 'Canal Popular',
    views: '1.2M visualizações',
    published: 'há 2 dias',
  },
  {
    id: Date.now() + 1,
    url: `https://www.youtube.com/watch?v=9bZkp7q19f0`,
    title: `Resultado 2`,
    thumbnail: `https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg`,
    channel: 'Outro Canal',
    views: '3.4M visualizações',
    published: 'há 1 semana',
  },
  {
    id: Date.now() + 2,
    url: `https://www.youtube.com/watch?v=kJQP7kiw5Fk`,
    title: `Resultado 3`,
    thumbnail: `https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg`,
    channel: 'Novo Canal',
    views: '5.6M visualizações',
    published: 'há 3 dias',
  },
];

// Simula a API do YouTube para busca
const searchYouTubeAPI = async (query: string): Promise<YouTubeVideo[]> => {
  if (process.env.NODE_ENV === 'production') {
    // Em produção, não simular delay
    return mockResults;
  }
  // Para fins de demonstração, vamos simular uma resposta
  return new Promise((resolve) => {
    setTimeout(() => {
      // Verifica se é um ID do YouTube ou uma URL
      const videoId = extractVideoId(query);

      if (videoId) {
        // Se for um ID ou URL válido do YouTube
        resolve([
          {
            id: Date.now(),
            url: `https://www.youtube.com/watch?v=${videoId}`,
            title: `Vídeo: ${query}`,
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            channel: 'Canal encontrado',
            views: 'Nova busca',
            published: 'Agora',
          },
        ]);
      } else {
        // Simula resultados baseados na consulta
        const results = mockResults;
        resolve(results);
      }
    }, 1500); // Simula o tempo de resposta da API
  });
};

const VideoPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [videos, setVideos] = useState<YouTubeVideo[]>([
    {
      id: 1,
      url: 'https://www.youtube.com/watch?v=oPOKpSFqy-I',
      title: 'YouTube Video 1',
      thumbnail: 'https://img.youtube.com/vi/oPOKpSFqy-I/maxresdefault.jpg',
      channel: 'Canal exemplo',
      views: '1.2M visualizações',
      published: 'há 2 semanas',
    },
    {
      id: 2,
      url: 'https://www.youtube.com/watch?v=37SwqREHRGI',
      title: 'YouTube Video 2',
      thumbnail: 'https://img.youtube.com/vi/37SwqREHRGI/maxresdefault.jpg',
      channel: 'Canal exemplo',
      views: '850K visualizações',
      published: 'há 3 meses',
    },
    {
      id: 3,
      url: 'https://www.youtube.com/watch?v=8mn8vWzkIts',
      title: 'YouTube Video 3',
      thumbnail: 'https://img.youtube.com/vi/8mn8vWzkIts/maxresdefault.jpg',
      channel: 'Canal exemplo',
      views: '2.5M visualizações',
      published: 'há 1 ano',
    },
    {
      id: 4,
      url: 'https://www.youtube.com/watch?v=er_QPBldsXE',
      title: 'YouTube Video 4',
      thumbnail: 'https://img.youtube.com/vi/er_QPBldsXE/maxresdefault.jpg',
      channel: 'Canal exemplo',
      views: '1.7M visualizações',
      published: 'há 5 meses',
    },
    {
      id: 5,
      url: 'https://www.youtube.com/watch?v=v32MZhQ6vWc',
      title: 'YouTube Video 5',
      thumbnail: 'https://img.youtube.com/vi/v32MZhQ6vWc/maxresdefault.jpg',
      channel: 'Canal exemplo',
      views: '3.4M visualizações',
      published: 'há 2 meses',
    },
    // Novos vídeos adicionados
    {
      id: 6,
      url: 'https://www.youtube.com/watch?v=fX5WCe3d8WU',
      title: 'Vídeo: Como aprender programação do zero',
      thumbnail: 'https://img.youtube.com/vi/fX5WCe3d8WU/maxresdefault.jpg',
      channel: 'Curso em Vídeo',
      views: 'Novo',
      published: 'Novo'
    },
    {
      id: 7,
      url: 'https://www.youtube.com/watch?v=Em0R3csNMVE',
      title: 'Vídeo: React do Zero ao Avançado',
      thumbnail: 'https://img.youtube.com/vi/Em0R3csNMVE/maxresdefault.jpg',
      channel: 'Rocketseat',
      views: 'Novo',
      published: 'Novo'
    },
    {
      id: 8,
      url: 'https://www.youtube.com/watch?v=8xo1FID4TqU',
      title: 'Vídeo: Como ser um Dev Frontend',
      thumbnail: 'https://img.youtube.com/vi/8xo1FID4TqU/maxresdefault.jpg',
      channel: 'DevMedia',
      views: 'Novo',
      published: 'Novo'
    },
    {
      id: 9,
      url: 'https://www.youtube.com/watch?v=hHM-hr9q4mo',
      title: 'Vídeo: JavaScript Completo',
      thumbnail: 'https://img.youtube.com/vi/hHM-hr9q4mo/maxresdefault.jpg',
      channel: 'Curso em Vídeo',
      views: 'Novo',
      published: 'Novo'
    },
    {
      id: 10,
      url: 'https://www.youtube.com/watch?v=Ejkb_YpuHWs',
      title: 'Vídeo: HTML5 e CSS3 - Módulo 1',
      thumbnail: 'https://img.youtube.com/vi/Ejkb_YpuHWs/maxresdefault.jpg',
      channel: 'Curso em Vídeo',
      views: 'Novo',
      published: 'Novo'
    },
    {
      id: 11,
      url: 'https://www.youtube.com/watch?v=iSqf2iPqJNM',
      title: 'Vídeo: Python para Iniciantes',
      thumbnail: 'https://img.youtube.com/vi/iSqf2iPqJNM/maxresdefault.jpg',
      channel: 'Curso em Vídeo',
      views: 'Novo',
      published: 'Novo'
    }
  ]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const categories = [
    { id: 'all', name: 'Todos', icon: <FaYoutube /> },
    { id: 'trending', name: 'Em Alta', icon: <FaFire /> },
    { id: 'music', name: 'Música', icon: <FaMusic /> },
    { id: 'gaming', name: 'Jogos', icon: <FaGamepad /> },
    { id: 'movies', name: 'Filmes', icon: <FaFilm /> },
    { id: 'history', name: 'Histórico', icon: <FaHistory /> },
  ];

  // Função para buscar vídeos no YouTube
  const searchYouTube = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setShowSearchResults(true);

    try {
      // Busca vídeos usando a função de simulação da API
      const results = await searchYouTubeAPI(searchTerm);

      setSearchResults(results);

      // Se houver resultados, adiciona ao topo da lista e reproduz o primeiro
      if (results.length > 0) {
        setVideos((prev) => [
          ...results,
          ...prev.filter(
            (v) =>
              !results.some(
                (r) => extractVideoId(r.url) === extractVideoId(v.url),
              ),
          ),
        ]);
        setActiveVideoIndex(0);
      }

      setIsSearching(false);
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
      setIsSearching(false);
    }
  };

  // Função para selecionar um vídeo dos resultados da pesquisa
  const selectSearchResult = (video: YouTubeVideo) => {
    // Verifica se o vídeo já existe na lista
    const existingIndex = videos.findIndex(
      (v) => extractVideoId(v.url) === extractVideoId(video.url),
    );

    if (existingIndex >= 0) {
      // Se existir, apenas seleciona
      setActiveVideoIndex(existingIndex);
    } else {
      // Se não existir, adiciona ao topo e seleciona
      setVideos((prev) => [video, ...prev]);
      setActiveVideoIndex(0);
    }

    setShowSearchResults(false);
  };

  return (
    <>
      {/* Barra de pesquisa fixa */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gray-900 shadow-lg py-3 px-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <FaYoutube className="text-red-500 text-3xl mr-2" />
            <h1 className="font-bold text-xl hidden sm:block">
              <span className="text-blue-500">Port</span>
              <span className="text-red-500">Videos</span>
            </h1>
          </div>

          <div className="relative w-full max-w-xl mx-auto">
            <form onSubmit={searchYouTube} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar vídeos no YouTube..."
                className="w-full py-2 pl-4 pr-12 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <FaSearch />
                )}
              </button>
            </form>

            {/* Resultados da pesquisa */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                {searchResults.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700"
                    onClick={() => selectSearchResult(video)}
                  >
                    <div className="flex-shrink-0 w-32 h-20 mr-3">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover rounded"
                        loading="lazy"
                        width="1920"
                        height="1080"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-white font-medium line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-gray-400 text-sm">{video.channel}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex space-x-2 ml-4">
            {categories.slice(0, 2).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span>{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative min-h-screen bg-modern-dark overflow-hidden">
        {/* Parallax visual minimalista para vídeos */}
        <Parallax speed={-20} className="absolute inset-0 z-0 pointer-events-none">
          <img src="/parallax-gradient.svg" alt="Gradiente Parallax" className="w-full h-full object-cover opacity-80" />
        </Parallax>
        <Parallax speed={-10} className="absolute inset-0 z-0 pointer-events-none">
          <img src="/parallax-aurora.svg" alt="Aurora Parallax" className="w-full h-full object-cover opacity-60" />
        </Parallax>
        {/* Fim do parallax minimalista */}

        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white pt-20">
          <div className="container mx-auto px-4">
            {/* Categorias */}
            <motion.div
              className="flex gap-2 overflow-x-auto pb-4 no-scrollbar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </motion.div>

            {/* Layout principal - player e lista de vídeos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
              {/* Coluna do player */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                  <Suspense fallback={<div>Carregando vídeo...</div>}>
                    <VideoPlayer
                      url={videos[activeVideoIndex].url}
                      title={videos[activeVideoIndex].title}
                      poster={videos[activeVideoIndex].thumbnail}
                      videos={videos}
                      onVideoChange={(index) => setActiveVideoIndex(index)}
                    />
                  </Suspense>

                  {/* Informações do vídeo atual */}
                  <div className="p-4 border-t border-gray-800">
                    <h2 className="text-xl font-bold mb-2">
                      {videos[activeVideoIndex].title}
                    </h2>
                    <div className="flex items-center text-gray-400 text-sm">
                      <span className="mr-4">
                        {videos[activeVideoIndex].views}
                      </span>
                      <span>{videos[activeVideoIndex].published}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-800 text-sm font-medium text-blue-400">
                      {videos[activeVideoIndex].channel}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Coluna da lista de vídeos */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl h-full">
                  <div className="p-3 border-b border-gray-800 bg-gray-800/50">
                    <h3 className="font-medium">Próximos vídeos</h3>
                  </div>
                  <div className="max-h-[800px] overflow-y-auto">
                    {videos.map((video, index) => (
                      <div
                        key={video.id}
                        onClick={() => setActiveVideoIndex(index)}
                        className={`flex p-3 cursor-pointer transition-colors ${
                          activeVideoIndex === index
                            ? 'bg-blue-900/20 border-l-4 border-blue-500'
                            : 'hover:bg-gray-800 border-l-4 border-transparent'
                        }`}
                      >
                        <div className="relative w-40 h-24 flex-shrink-0 mr-3">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover rounded-md"
                            loading="lazy"
                            width="1920"
                            height="1080"
                          />
                          {activeVideoIndex === index && (
                            <div className="absolute bottom-1 right-1 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                              Assistindo
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2 mb-1">
                            {video.title}
                          </h4>
                          <p className="text-sm text-gray-400 line-clamp-1 mb-1">
                            {video.channel}
                          </p>
                          <div className="text-xs text-gray-500 flex gap-2">
                            <span>{video.views}</span>
                            <span>•</span>
                            <span>{video.published}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Seção de Recursos */}
            <motion.div
              className="max-w-3xl mx-auto mt-8 mb-16 text-gray-300 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
                Recursos Avançados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-5 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">
                      Integração com YouTube
                    </h3>
                  </div>
                  <p className="text-gray-400">
                    Reproduz vídeos do YouTube com controles personalizados e
                    sincronização em tempo real.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-5 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">Navegação Gestual</h3>
                  </div>
                  <p className="text-gray-400">
                    Navegue entre vídeos com gestos de deslizar, para uma
                    experiência moderna e intuitiva.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-5 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">Busca Avançada</h3>
                  </div>
                  <p className="text-gray-400">
                    Encontre qualquer vídeo do YouTube diretamente pelo player com
                    busca integrada.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
