"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <LinkItem href="/employees" currentRoute={pathName} name="Employees" />
      <LinkItem href="/samples" currentRoute={pathName} name="Samples" />
    </nav>
  );
}

function LinkItem(props: any) {
  const { name, currentRoute, href } = props;
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
        currentRoute == href ? "text-primary" : ""
      )}
    >
      {name}
    </Link>
  );
}