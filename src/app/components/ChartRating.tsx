import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Text } from "@/app/components/Typography";

const chartConfig = {
  points: {
    label: "Rating",
  },
  unrated: {
    label: "gray",
    color: "hsl(var(--chart-1))",
  },
  rated: {
    label: "green",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
export function ChartRating({
  likes,
  dislikes,
}: {
  likes: number;
  dislikes: number;
}) {
  const chart = [
    { rates: "Unrated", points: dislikes, fill: "var(--color-unrated)" },
    { rates: "Loves it!", points: likes, fill: "var(--color-rated)" },
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Show Rating</CardTitle>
        <CardDescription>How popular is this show?</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chart}
              dataKey="points"
              nameKey="rates"
              innerRadius={65}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <Text>{`${likes}% users are loving this show`}</Text>
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
