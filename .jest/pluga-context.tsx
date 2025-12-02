type PlugaApp = {
    app_id: string
    name: string
    icon: string
    color?: string
    link?: string
    [key: string]: unknown
}

jest.mock("@/context/pluga-context", () => {
    return {
        PlugaProvider: ({
            initialApps = [],
            children
        }: {
            initialApps?: PlugaApp[]
            children: React.ReactNode
        }) => {
            return (
                <div data-initial={JSON.stringify(initialApps)}>{children}</div>
            )
        }
    }
})
