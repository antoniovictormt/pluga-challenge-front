"use client"

import Image from "next/image"

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
                        <Image
                            src="/icons/sad-icon.svg"
                            alt="Nenhum app encontrado"
                            width={36}
                            height={36}
                            className="mb-2 inline"
                        />

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
