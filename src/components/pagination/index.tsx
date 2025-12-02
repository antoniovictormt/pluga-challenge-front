import Image from "next/image"

import { PaginationProps } from "@/types"

export function Pagination({ page, maxPage, setPage }: PaginationProps) {
    const handlePrevious = () => {
        setPage(Math.max(page - 1, 1))
    }

    const handleNext = () => {
        setPage(Math.min(page + 1, maxPage))
    }

    return (
        <div className="text-center">
            <div className="join">
                <button
                    onClick={handlePrevious}
                    className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}
                    data-testid="previous-page-btn"
                >
                    <Image
                        src="/icons/chevron-left.svg"
                        alt="Página anterior"
                        width={16}
                        height={16}
                        className="opacity-80"
                    />
                </button>

                <div className="hidden lg:inline-flex">
                    {Array.from({ length: maxPage }, (_, i) => i + 1).map(i => (
                        <button
                            key={`p-desktop-${i}`}
                            onClick={() => setPage(i)}
                            className={`join-item btn ${i === page ? "btn-active" : ""}`}
                        >
                            {i}
                        </button>
                    ))}
                </div>

                <button
                    className="join-item btn lg:hidden"
                    disabled
                >
                    {page} / {maxPage}
                </button>

                <button
                    onClick={handleNext}
                    className={`join-item btn ${page === maxPage ? "btn-disabled" : ""}`}
                    data-testid="next-page-btn"
                >
                    <Image
                        src="/icons/chevron-right.svg"
                        alt="Próxima página"
                        width={16}
                        height={16}
                        className="opacity-80"
                    />
                </button>
            </div>
        </div>
    )
}
