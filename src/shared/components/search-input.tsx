"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import { Product } from "@prisma/client";
import Link from "next/link";
import { Api } from "../services/api-client";

export const SearchInput = () => {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Product[]>([]);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(() => {
    Api.products.search(search).then(setItems);
  }, 500, [search])

  const clickItem = () => {
    setFocused(false)
    setSearch('')
    setItems([])
  }

  return (
    <>
      {focused && (
        <div className="fixed left-0 top-0 bottom-0 right-0 bg-black/50 z-30"></div>
      )}

      <div ref={ref} className={cn("rounded-2xl relative h-11 flex z-30")}>
        <Search className="absolute left-3 top-1/2 translate-y-[-50%] h-5 text-gray-400" />
        <input
          className={cn("w-full rounded-2xl outline-none bg-gray-100 pl-11")}
          onFocus={() => setFocused(true)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {items.length && (
          <div
            className={cn(
              "absolute rounded-2xl top-14 py-2 px-5 bg-white w-full transition-all duration-200 invisible opacity-0",
              focused && "visible opacity-100 top-12"
            )}
          >
            {items.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`product/${item.id}`}
                  className="flex items-center gap-2 w-full hover:bg-primary/10 rounded-2xl px-3 py-2"
                  onClick={clickItem}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-8 h-8"
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
