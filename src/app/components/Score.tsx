import { FaStar } from "react-icons/fa";

interface ScoreProps {
  score: number; // Score as a number between 1 and 100
  size?: number;
}

export default function Score({ score, size = 18 }: ScoreProps) {
  // Divide the score by 5 and use ceil to calculate the number of stars
  const filledStars = Math.ceil(score / 20);

  // Render 5 stars, with the correct number filled based on the score
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          size={size}
          className={index < filledStars ? "text-yellow-300" : "text-gray-600"}
        />
      ))}
    </div>
  );
}
