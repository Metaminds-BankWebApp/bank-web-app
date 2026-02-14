import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/src/lib/utils";

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t border-(--primecore-border) bg-(--primecore-surface)", className)}>
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        {siteConfig.footer.groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold text-(--primecore-foreground)">{group.title}</h3>
            <ul className="mt-3 space-y-2">
              {group.links.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-(--primecore-border)">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 text-xs text-(--primecore-foreground)/65 sm:px-6 lg:px-8">
          {siteConfig.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
