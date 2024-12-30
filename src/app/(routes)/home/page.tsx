import { data } from "@/data/main.json";
import PopularSection from "@/app/components/domains/home/PopularSection";
import createApolloClient from "@/lib/apollo.client";
import {
  GET_PAGINATED_UPCOMING_ANIMES,
  GET_PAGINATED_POPULAR_ANIMES,
  GET_PAGINATED_RECENT_ANIMES,
} from "@/lib/queries";
import { Anime, GetPaginatedPopularAnimesInterface } from "@/lib/types";
import UpcomingSection from "@/app/components/domains/home/UpcomingSection";
import RecentsSection from "@/app/components/domains/home/RecentsSection";
import HomeContent from "@/app/components/domains/home/HomeContent";

export type AnimeProps = (typeof data.Page.media)[0];

export default async function HomePage() {
  const client = createApolloClient();

  const {
    loading: popularAnimesLoading,
    error: popularAnimesError,
    data: popularAnimesData,
  } = await client.query<GetPaginatedPopularAnimesInterface>({
    query: GET_PAGINATED_POPULAR_ANIMES,
    variables: { page: 1, perPage: 10 },
  });

  const {
    loading: upcomingAnimesLoading,
    error: upcomingAnimesError,
    data: upcomingAnimesData,
  } = await client.query<GetPaginatedPopularAnimesInterface>({
    query: GET_PAGINATED_UPCOMING_ANIMES,
    variables: { page: 1, perPage: 10 },
  });

  const {
    loading: recentAnimesLoading,
    error: recentAnimesError,
    data: recentAnimesData,
  } = await client.query<GetPaginatedPopularAnimesInterface>({
    query: GET_PAGINATED_RECENT_ANIMES,
    variables: { page: 1, perPage: 10 },
  });

  const popularAnimes = (popularAnimesData.Page?.media || []) as Anime[];
  const recentAnimes = (recentAnimesData?.Page?.media || []) as Anime[];
  const upcomingAnimes = (upcomingAnimesData?.Page?.media || []) as Anime[];

  return (
    <div>
      <HomeContent
        popularAnimes={{
          animes: popularAnimes,
          loading: popularAnimesLoading,
          error: !!popularAnimesError,
        }}
        upcomingAnimes={{
          animes: upcomingAnimes,
          loading: upcomingAnimesLoading,
          error: !!upcomingAnimesError,
        }}
        recentAnimes={{
          animes: recentAnimes,
          loading: recentAnimesLoading,
          error: !!recentAnimesError,
        }}
      />
    </div>
  );
}
