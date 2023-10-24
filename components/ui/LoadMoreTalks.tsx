"use client";
import { TalksState } from "@/lib/store";
import { Button } from "@nextui-org/react";

export default function LoadMoreTalks({
  from,
  onClick,
}: {
  from: "profile" | "talksfeed";
  onClick?: () => void;
}) {
  const filter = TalksState();
  const loadMore = () => {
    filter.setTake(filter.take + 4);
  };
  return (
    <Button
      className="shrink-0 mb-0 mt-auto"
      onClick={from ? onClick : loadMore}
    >
      Load More
    </Button>
  );
}
