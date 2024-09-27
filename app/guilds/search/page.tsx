"use client";

import GuildTile from "./components/guild-tile";
import RequestPopup from "./components/request-popup";
import GuildGrid from "./components/guild-grid";
import SearchPopup from "./components/search-popup";
import { useEffect, useState } from "react";
import useQueryParams from "@/utils/useQueryParams";
import { guildSearch } from "../guild-actions";
import NoResults from "@/components/no-results";
import { LoaderCircle } from "lucide-react";
import PageNavigator from "@/components/page-navigator";

export const metadata = {
  title: "Search Guilds | Hypixel Guild Finder",
  description: "The best way to find a guild on Hypixel!",
};

export default function Guilds() {
  const [loading, setLoading] = useState(true);
  const [guilds, setGuilds] = useState<guild[] | null>(null);
  const { queryParams, setQueryParams } = useQueryParams();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    setLoading(true);
    // get search and filter values
    const term = queryParams.get("term");
    const topGame = queryParams.get("topGame");
    const guildSize = queryParams.get("guildSize");
    const page = Number(queryParams.get("page"));

    guildSearch(term, topGame, guildSize, page).then((response) => {
      setLoading(false);
      if (response.error) {
        console.log(response.error);
      } else {
        setPageCount(response.count / response.perPage);
        setGuilds(response.data);
      }
    });

    if (queryParams.get("page")) {
      setPage(Number(queryParams.get("page")));
    } else {
      setPage(1);
    }
  }, [queryParams]);

  if (loading) {
    return (
      <div className="w-full flex mt-10 justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl mb-5">Guilds</h1>
        <SearchPopup />
      </div>

      {guilds ? (
        <>
          <GuildGrid>
            {guilds.map((guild: guild, idx) => (
              <GuildTile key={`guild-${idx}`} guild={guild} />
            ))}
          </GuildGrid>
          <PageNavigator currentPage={page} pageCount={pageCount} />
        </>
      ) : (
        <NoResults object="Guilds" />
      )}
      <RequestPopup />
    </>
  );
}
