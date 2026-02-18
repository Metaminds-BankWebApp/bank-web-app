import Link from "next/link";
import { Building2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/src/lib/utils";

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("px-6 mb-4 w-full border border-(--primecore-border) bg-(--primecore-surface-soft)", className)}>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_2fr_0.85fr]">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold text-(--primecore-foreground)">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--primecore-border) bg-(--primecore-surface)">
                <Building2 size={18} className="text-primary" />
              </span>
              <span>{siteConfig.name}</span>
            </Link>
            <p className="max-w-xs text-sm text-(--primecore-foreground)/70">Banking for the future.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.footer.groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-(--primecore-foreground)">Solutions</h3>
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

            <div>
              <h3 className="text-sm font-semibold text-(--primecore-foreground)">Solutions</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/" className="text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)">
                    Personal banking
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)">
                    Business banking
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)">
                    Investments
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-(--primecore-foreground)">Follow us on</h3>
            <div className="mt-3 flex items-center gap-3 text-sm font-semibold text-(--primecore-foreground)/70">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)">
                f
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)">
                i
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)">
                x
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)">
                in
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-(--primecore-border)">
        <div className="px-4 py-4 text-center text-xs text-(--primecore-foreground)/65 sm:px-6 lg:px-8">
          {siteConfig.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
