"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavStore } from "@/store/useNavStore";

const PathHeader = () => {
  const path = useNavStore((s) => s.activePath) || [];

  const generateHref = (index: number) => {
    const segments = path.slice(0, index + 1).map(encodeURIComponent);
    return segments.join("/");
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  let displayPath = path;
  if (displayPath[0] == "") displayPath.shift();

  if (isMobile && path.length > 3) {
    displayPath = [path[0], path[path.length - 1]];
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Início</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {displayPath.map((item, index) => {
          const isLast = index === displayPath.length - 1;

          const realIndex: number =
            isMobile && path.length > 3 && index === 2
              ? path.length - 1
              : index;

          return (
            <div key={index} className="flex items-center gap-1">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={generateHref(realIndex)}>{item}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PathHeader;
