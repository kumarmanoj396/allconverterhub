"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

import { FAVORITES_CHANGED_EVENT, getFavoriteToolIds, toggleFavoriteTool } from "@/lib/favorites";

export default function FavoriteButton({ toolId, toolTitle }: { toolId: string; toolTitle: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const syncFavorite = () => setIsFavorite(getFavoriteToolIds().includes(toolId));
    const timeoutId = window.setTimeout(syncFavorite, 0);
    window.addEventListener(FAVORITES_CHANGED_EVENT, syncFavorite);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener(FAVORITES_CHANGED_EVENT, syncFavorite);
    };
  }, [toolId]);

  function toggle() {
    setIsFavorite(toggleFavoriteTool(toolId));
  }

  return <button type="button" onClick={toggle} className={`rounded-full p-2 transition ${isFavorite ? "bg-rose-500/15 text-rose-400" : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-rose-300"}`} aria-label={`${isFavorite ? "Remove" : "Add"} ${toolTitle} ${isFavorite ? "from" : "to"} favorites`} aria-pressed={isFavorite}><Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} /></button>;
}
