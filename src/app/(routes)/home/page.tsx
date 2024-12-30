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

export type AnimeProps = (typeof data.Page.media)[0];

export default async function HomePage() {
  // const { hasFiltersApplied, error } = useFilteredAnimes({
  //   perPage: 10,
  // });

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

  const popularAnimes = (data?.Page?.media || []) as Anime[];
  const recentAnimes = (recentAnimesData?.Page?.media || []) as Anime[];
  const upcomingAnimes = (upcomingAnimesData?.Page?.media || []) as Anime[];

  return (
    <div className="max-w-full min-h-full overflow-x-hidden flex flex-col">
      {/* {!hasFiltersApplied && (
        
      )} */}

      <div className="flex flex-col space-y-4 gap-8 justify-start p-6 ">
        <PopularSection
          animes={popularAnimes}
          error={!!popularAnimesError}
          loading={popularAnimesLoading}
        />
        <UpcomingSection
          animes={upcomingAnimes}
          error={!!upcomingAnimesError}
          loading={upcomingAnimesLoading}
        />
        <RecentsSection
          animes={recentAnimes}
          error={!!recentAnimesError}
          loading={recentAnimesLoading}
        />
      </div>

      {/* {hasFiltersApplied && (
        <div className="p-6">
          <FilteredAnimesList />
        </div>
      )} */}
    </div>
  );
}
