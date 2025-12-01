"use client"

import { Grid } from "@/components/grid"
import { SearchInput } from "@/components/input-search"
import { AppModal } from "@/components/modal"
import { Pagination } from "@/components/pagination"
import { usePluga } from "@/context/pluga-context"

export function List() {
    const {
        apps,
        search,
        setSearch,
        page,
        setPage,
        selectedApp,
        setSelectedApp,
        lastSelectedApps,
        modalRef,
        handleSelectedApp
    } = usePluga()

    const normalizedSearch = search.toLowerCase()
    const filteredApps = apps.filter(app =>
        app.name.toLowerCase().includes(normalizedSearch)
    )

    const maxPage = Math.max(1, Math.ceil(filteredApps.length / 12))
    const pagedFilteredApps = filteredApps.slice((page - 1) * 12, page * 12)

    return (
        <>
            <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
                <h1 className="text-center text-3xl">Pluga Challenge Front</h1>

                <SearchInput value={search} onChange={setSearch} />

                {apps.length === 0 ? (
                    <div className="text-center">
                        <span className="loading loading-spinner" />
                    </div>
                ) : pagedFilteredApps.length === 0 ? (
                    <div className="text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mb-2 inline size-9"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                            />
                        </svg>

                        <p>{`Nenhum app encontrado para "${search}".`}</p>
                    </div>
                ) : (
                    <>
                        <Grid
                            apps={pagedFilteredApps}
                            onSelect={handleSelectedApp}
                        />

                        <Pagination
                            page={page}
                            maxPage={maxPage}
                            setPage={setPage}
                        />
                    </>
                )}
            </main>

            <AppModal
                selectedApp={selectedApp}
                lastSelectedApps={lastSelectedApps}
                onSelect={app => handleSelectedApp(app)}
                onClose={() => {
                    modalRef.current?.close?.()
                    setSelectedApp(null)
                }}
                ref={modalRef}
            />
        </>
    )
}
