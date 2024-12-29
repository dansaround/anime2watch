import * as React from "react";

import { cn } from "@/lib/utils";
import { FaSearch } from "react-icons/fa";

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex gap-4 items-center h-9 w-full rounded-md border border-input bg-black px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
    >
      <FaSearch size={25} />

      <input
        type={type}
        className={cn(
          "appearance-none border-0 bg-transparent w-full focus:outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
SearchInput.displayName = "SearchInput";

export { SearchInput };
