export type PlugaApp = {
    app_id: string
    name: string
    icon: string
    color?: string
    link?: string
    [key: string]: unknown
}

export type PlugaContextType = {
    apps: PlugaApp[]
    setApps: React.Dispatch<React.SetStateAction<PlugaApp[]>>
    search: string
    setSearch: (value: string) => void
    page: number
    setPage: (p: number) => void
    selectedApp: PlugaApp | null
    setSelectedApp: (a: PlugaApp | null) => void
    lastSelectedApps: PlugaApp[]
    modalRef: React.RefObject<HTMLDialogElement | null>
    handleSelectedApp: (app: PlugaApp) => void
}

export type CardProps = {
    app: PlugaApp
    onSelect: (app: PlugaApp) => void
}

export type GridProps = {
    apps: PlugaApp[]
    onSelect: (app: PlugaApp) => void
}

export type PaginationProps = {
    page: number
    maxPage: number
    setPage: (n: number) => void
}

export type AppModalProps = {
    selectedApp: PlugaApp | null
    lastSelectedApps: PlugaApp[]
    onSelect: (app: PlugaApp) => void
    onClose: () => void
}

export type ListContentProps = {
    apps: PlugaApp[]
    search: string
    page: number
    setPage: (page: number) => void
    handleSelectedApp: (app: PlugaApp) => void
}
