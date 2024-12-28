import classNames from "classnames";

interface IBaseSkeletonProps {
  className?: string;
}

export function SkeletonRectangle({ className }: IBaseSkeletonProps) {
  return (
    <div
      className={classNames(
        "bg-gray-400 h-6 animate-pulse rounded-lg",
        className
      )}
    />
  );
}
