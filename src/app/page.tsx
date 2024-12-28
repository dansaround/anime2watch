import { data } from "@/data/main.json";
import { Text } from "./components/Typography";

export default function StartPage() {
  const mockData = data.Page.media;
  return (
    <div className="">
      <Text>Start!</Text>
    </div>
  );
}
