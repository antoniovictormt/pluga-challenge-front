import { PlugaApp } from "@/types"

export async function getPlugaTools(): Promise<PlugaApp[]> {
    const res = await fetch("https://pluga.co/ferramentas_search.json", {
        cache: "no-store"
    })
    if (!res.ok) throw new Error("Failed to fetch apps")
    return (await res.json()) as PlugaApp[]
}
