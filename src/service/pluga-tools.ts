import { PlugaApp } from "@/types"

export async function getPlugaTools(): Promise<PlugaApp[]> {
    const response = await fetch("https://pluga.co/ferramentas_search.json", {
        cache: "force-cache"
    })

    await new Promise(resolve => setTimeout(resolve, 2000))

    if (!response.ok) {
        throw new Error("Erro ao buscar apps.")
    }

    return response.json()
}
