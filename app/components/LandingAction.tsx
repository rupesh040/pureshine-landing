"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { useEnquiry } from "./EnquiryProvider";

type LandingActionProps = {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  service?: string;
  "aria-label"?: string;
  "data-service-card"?: boolean;
};

export default function LandingAction({ href, service, children, ...props }: LandingActionProps) {
  const pathname = usePathname();
  const { openEnquiry } = useEnquiry();

  if (pathname !== "/") {
    return <Link href={href} {...props}>{children}</Link>;
  }

  return (
    <button type="button" onClick={() => openEnquiry(service)} {...props}>
      {children}
    </button>
  );
}
