"use client"

import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from "react"

import { PlugaApp, PlugaContextType } from "@/types"

const PlugaContext = createContext<PlugaContextType | undefined>(undefined)

export function PlugaProvider({
    initialApps = [],
    children
}: {
    initialApps?: PlugaApp[]
    children: React.ReactNode
}) {
    const [apps, setApps] = useState<PlugaApp[]>(initialApps)
    const [search, setSearchState] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [selectedApp, setSelectedApp] = useState<PlugaApp | null>(null)

    const [lastSelectedApps, setLastSelectedApps] = useState<PlugaApp[]>(() => {
        try {
            const stored =
                typeof window !== "undefined"
                    ? localStorage.getItem("lastSelectedApps")
                    : null
            const ids = stored ? (JSON.parse(stored) as string[]) : []
            if (ids.length === 0) return []
            const byId = initialApps.reduce<Record<string, PlugaApp>>(
                (acc, a) => {
                    acc[a.app_id] = a
                    return acc
                },
                {}
            )
            return ids
                .map(id => byId[id])
                .filter((a): a is PlugaApp => Boolean(a))
        } catch {
            return []
        }
    })

    const modalRef = useRef<HTMLDialogElement | null>(null)

    const restoredOnceRef = useRef(false)

    useEffect(() => {
        if (restoredOnceRef.current) return
        if (apps.length === 0) return

        const appsByAppId = apps.reduce<Record<string, PlugaApp>>(
            (acc, app) => {
                acc[app.app_id] = app
                return acc
            },
            {}
        )

        try {
            const stored = localStorage.getItem("lastSelectedApps")
            const storedIds = stored ? (JSON.parse(stored) as string[]) : []
            const restored = storedIds
                .map(id => appsByAppId[id])
                .filter((a): a is PlugaApp => Boolean(a))

            const same =
                restored.length === lastSelectedApps.length &&
                restored.every(
                    (r, i) => r.app_id === lastSelectedApps[i]?.app_id
                )

            if (!same) {
                setLastSelectedApps(restored)
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("failed to restore lastSelectedApps", err)
        } finally {
            restoredOnceRef.current = true
        }
    }, [apps, lastSelectedApps])

    function setSearch(value: string) {
        setSearchState(value)
        setPage(1)
    }

    function handleSelectedApp(app: PlugaApp) {
        setSelectedApp(app)

        setLastSelectedApps(prev => {
            const filtered = prev.filter(a => a.app_id !== app.app_id)
            const next = [...filtered, app].slice(-3)
            const newLastSelectedAppIds = next.map(a => a.app_id)
            try {
                localStorage.setItem(
                    "lastSelectedApps",
                    JSON.stringify(newLastSelectedAppIds)
                )
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err)
            }
            return next
        })

        if (
            modalRef.current &&
            typeof modalRef.current.showModal === "function"
        ) {
            modalRef.current.showModal()
        }
    }

    return (
        <PlugaContext.Provider
            value={{
                apps,
                setApps,
                search,
                setSearch,
                page,
                setPage,
                selectedApp,
                setSelectedApp,
                lastSelectedApps,
                modalRef,
                handleSelectedApp
            }}
        >
            {children}
        </PlugaContext.Provider>
    )
}

export function usePluga() {
    const ctx = useContext(PlugaContext)
    if (!ctx) throw new Error("usePluga must be used within a PlugaProvider")
    return ctx
}
