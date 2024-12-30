import { GET_ANIME_BY_ID } from "@/lib/queries";
import { DetailsBanner } from "@/app/components/Banners/DetailsBanner";
import { SkeletonRectangle } from "@/app/components/SkeletonRectangle";
import { Text } from "@/app/components/Typography";
import { Anime } from "@/lib/types";
import { toast, Toaster } from "sonner";
import createApolloClient from "@/lib/apollo.client";
import { TriangleAlert } from "lucide-react";
import { useToast } from "@/hooks/useToast";

export default async function DetailsPage(props: any) {
  const client = createApolloClient();

  const { data, error, loading } = await client.query({
    query: GET_ANIME_BY_ID,
    variables: {
      id: Number(props.params.id),
    },
  });

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[40vh] gap-4">
        <TriangleAlert size={48} className="text-red-400" />
        <Text.Semibold className="text-xl text-red-500">
          Unable to load anime details
        </Text.Semibold>
        <Text.Regular className="text-red-400 text-center scale-90 sm:scale-100">
          There was an error loading the anime details. Please try again later.
        </Text.Regular>
      </div>
    );
  }

  return loading ? (
    <SkeletonRectangle className="w-full h-[200px]" />
  ) : (
    <div className="flex flex-col w-full h-full">
      <Toaster position="top-center" richColors />

      {data && data.Media && (
        <>
          <DetailsBanner anime={data.Media} />
          <div className="grid grid-cols-[1fr_0.3fr]">
            {/* <AnimeStats anime={data.Media} /> */}
          </div>
        </>
      )}
    </div>
  );
}
