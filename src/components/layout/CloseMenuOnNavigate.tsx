"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";

import { usePathname } from "@/src/i18n/navigation";

const scrollRequestKey = "barbara-menu-scroll-top";

type CloseMenuOnNavigateProps = {
  children: ReactNode;
  className?: string;
};

export function CloseMenuOnNavigate({
  children,
  className,
}: CloseMenuOnNavigateProps) {
  const navigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeMenusOutsideTarget(event: PointerEvent) {
      if (!(event.target instanceof Element)) {
        return;
      }

      const openMenus =
        navigationRef.current?.querySelectorAll<HTMLDetailsElement>(
          "details[open]",
        );

      openMenus?.forEach((menu) => {
        if (!menu.contains(event.target as Node)) {
          menu.open = false;
        }
      });
    }

    document.addEventListener("pointerdown", closeMenusOutsideTarget);
    return () =>
      document.removeEventListener("pointerdown", closeMenusOutsideTarget);
  }, []);

  function closeContainingMenus(event: MouseEvent<HTMLDivElement>) {
    if (!(event.target instanceof Element)) {
      return;
    }

    const navigationControl = event.target.closest("a, button");

    if (!navigationControl) {
      return;
    }

    if (navigationControl instanceof HTMLAnchorElement) {
      const destination = new URL(navigationControl.href, window.location.href);

      if (!destination.hash) {
        const isCurrentPage =
          destination.pathname === window.location.pathname &&
          destination.search === window.location.search;

        if (isCurrentPage) {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        } else {
          window.sessionStorage.setItem(scrollRequestKey, "true");
        }
      }
    } else {
      window.sessionStorage.setItem(scrollRequestKey, "true");
    }

    let menu = navigationControl.closest("details");

    while (menu) {
      menu.open = false;
      menu = menu.parentElement?.closest("details") ?? null;
    }
  }

  return (
    <div
      ref={navigationRef}
      className={className}
      onClick={closeContainingMenus}
    >
      {children}
    </div>
  );
}

export function ResetScrollAfterMenuNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.sessionStorage.getItem(scrollRequestKey) !== "true") {
      return;
    }

    window.sessionStorage.removeItem(scrollRequestKey);
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
