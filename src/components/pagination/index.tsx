import Image from "next/image"

import { PaginationProps } from "@/types"

export function Pagination({ page, maxPage, setPage }: PaginationProps) {
    return (
        <div className="text-center">
            <div className="join">
                <button
                    onClick={() => setPage(Math.max(page - 1, 1))}
                    className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}
                    data-testid="previous-page-btn"
                >
                    <Image
                        src="/icons/chevron-left.svg"
                        alt="Previous page"
                        width={16}
                        height={16}
                        className="opacity-80"
                    />
                </button>

                {Array.from({ length: maxPage }, (_, i) => i + 1).map(i => (
                    <button
                        key={`p${i}`}
                        onClick={() => setPage(i)}
                        className={`join-item btn ${i === page ? "btn-active" : ""}`}
                    >
                        {i}
                    </button>
                ))}

                <button
                    onClick={() => setPage(Math.min(page + 1, maxPage))}
                    className={`join-item btn ${page === maxPage ? "btn-disabled" : ""}`}
                    data-testid="next-page-btn"
                >
                    <Image
                        src="/icons/chevron-right.svg"
                        alt="Next page"
                        width={16}
                        height={16}
                        className="opacity-80"
                    />
                </button>
            </div>
        </div>
    )
}
