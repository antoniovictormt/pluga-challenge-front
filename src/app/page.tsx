import { List } from "@/components/list"
import { PlugaProvider } from "@/context/pluga-context"
import { getPlugaTools } from "@/service/pluga-tools"

export default async function Home() {
    const apps = await getPlugaTools()

    return (
        <PlugaProvider initialApps={apps}>
            <List />
        </PlugaProvider>
    )
}
