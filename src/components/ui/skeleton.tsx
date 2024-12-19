/**
  * Component taken from shadcn/ui component library.

 * @see https://ui.shadcn.com/docs/components/skeleton
 */

import { combineClassNames } from "@/lib/style-utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={combineClassNames(
        "rounded-md bg-green-600", // Removed animated and changed background.
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
