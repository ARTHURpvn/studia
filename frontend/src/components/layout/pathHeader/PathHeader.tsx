"use client";

import Link from "next/link";

import { useNavStore } from "@/store/useNavStore";

const PathHeader = () => {
  const path: string[] = useNavStore((s) => s.activePath) || "";
  return (
    <>
      {path.length > 2 &&
        path.map((item, index) => (
          <Link key={index} href={`/${item}`}>
            {item} /
          </Link>
        ))}
    </>
  );
};

export default PathHeader;
