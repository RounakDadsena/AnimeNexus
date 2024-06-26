import { json, type HeadersFunction, type LoaderFunctionArgs } from '@remix-run/node';

import { getMovieDetail, getTvShowDetail } from '~/services/tmdb/tmdb.server';
import type { IMovieDetail, ITvShowDetail } from '~/services/tmdb/tmdb.types';
import TMDB from '~/utils/media';
import { generateMovieSvg, generatePng, generateSvg } from '~/utils/server/og.server';

export const headers: HeadersFunction = () => {
  return { 'Cache-Control': 'public, max-age=31536000, immutable' };
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const mid = url.searchParams.get('m') ?? null;
  const mType = url.searchParams.get('mt') ?? null;
  const imageType = url.searchParams.get('it') ?? null;

  if (mid && mType && !imageType) {
    const movieDetail =
      mType === 'movie' ? await getMovieDetail(Number(mid)) : await getTvShowDetail(Number(mid));
    const title =
      (movieDetail as IMovieDetail)?.title || (movieDetail as ITvShowDetail)?.name || '';
    const posterPath = movieDetail?.poster_path
      ? TMDB?.posterUrl(movieDetail?.poster_path || '', 'w342')
      : undefined;
    const backdropPath = movieDetail?.backdrop_path
      ? TMDB?.backdropUrl(movieDetail?.backdrop_path || '', 'w1280')
      : undefined;
    const releaseYear = new Date(
      (movieDetail as IMovieDetail)?.release_date ||
        (movieDetail as ITvShowDetail)?.first_air_date ||
        '',
    ).getFullYear();
    const svg = await generateMovieSvg({
      title,
      cover: backdropPath,
      poster: posterPath,
      voteAverage: movieDetail?.vote_average?.toFixed(1),
      genres: movieDetail?.genres?.splice(0, 4),
      releaseYear,
      numberOfEpisodes: (movieDetail as ITvShowDetail)?.number_of_episodes,
      numberOfSeasons: (movieDetail as ITvShowDetail)?.number_of_seasons,
      runtime: (movieDetail as IMovieDetail)?.runtime,
      productionCompany:
        (movieDetail as IMovieDetail)?.production_companies![0]?.name ||
        (movieDetail as ITvShowDetail)?.production_companies![0]?.name,
    });
    return generatePng(svg);
  }
  if (!mid && !mType && imageType) {
    let title;
    let cover;
    switch (imageType) {
      case 'home':
        title = 'NEXUS';
        cover =
          'https://raw.githubusercontent.com/Khanhtran47/AnimeNexus/master/app/assets/images/background-default.jpg';
        break;
      case 'movies':
        title = 'NEXUS Movies';
        cover =
          'https://image.tmdb.org/t/p/w1280_filter(duotone,190235,ad47dd)/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg';
        break;
      case 'tvshows':
        title = 'NEXUS TV Shows';
        cover =
          'https://image.tmdb.org/t/p/w1280_filter(duotone,00192f,00baff)/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg';
        break;
      case 'people':
        title = 'NEXUS People';
        cover =
          'https://image.tmdb.org/t/p/w1280_filter(duotone,190235,ad47dd)/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg';
        break;
      case 'anime':
        title = 'NEXUS Anime';
        cover =
          'https://image.tmdb.org/t/p/w1280_filter(duotone,00192f,00baff)/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg';
        break;
      case 'search':
        title = 'NEXUS Search';
        cover =
          'https://image.tmdb.org/t/p/w1280_filter(duotone,00192f,00baff)/Vq4L8A88fNQxBqM27xHtDi4DrL.jpg';
        break;
      default:
        title = 'NEXUS';
        cover =
          'https://raw.githubusercontent.com/Khanhtran47/AnimeNexus/master/app/assets/images/background-default.jpg';
        break;
    }

    const svg = await generateSvg({
      title,
      cover,
    });
    return generatePng(svg);
  }
  return json({ message: 'Invalid request' }, { status: 400 });
}
