import "@testing-library/jest-dom"

import { fireEvent, render, screen } from "@testing-library/react"

import { Pagination } from ".."

describe("Pagination component", () => {
    let setPage: jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
        setPage = jest.fn()
    })

    it("renders numeric page buttons according to maxPage and arrows", () => {
        render(<Pagination page={2} maxPage={4} setPage={setPage} />)

        // botões numéricos
        for (let i = 1; i <= 4; i++) {
            expect(screen.getByText(String(i))).toBeInTheDocument()
        }

        // botões de navegação
        expect(screen.getByTestId("previous-page-btn")).toBeInTheDocument()
        expect(screen.getByTestId("next-page-btn")).toBeInTheDocument()
    })

    it("applies btn-active to current page", () => {
        render(<Pagination page={2} maxPage={4} setPage={setPage} />)

        expect(screen.getByText("2")).toHaveClass("btn-active")
    })

    it("calls setPage with the clicked page number", () => {
        render(<Pagination page={1} maxPage={3} setPage={setPage} />)

        const page3Btn = screen.getByText("3")
        fireEvent.click(page3Btn)

        expect(setPage).toHaveBeenCalledWith(3)
    })

    it("goes to previous page when previous button is clicked and page > 1", () => {
        render(<Pagination page={3} maxPage={5} setPage={setPage} />)

        const prevBtn = screen.getByTestId("previous-page-btn")
        fireEvent.click(prevBtn)

        expect(setPage).toHaveBeenCalledWith(2)
    })

    it("does not go below page 1 when previous is clicked on first page", () => {
        render(<Pagination page={1} maxPage={5} setPage={setPage} />)

        const prevBtn = screen.getByTestId("previous-page-btn")
        fireEvent.click(prevBtn)

        expect(setPage).toHaveBeenCalledWith(1)
        expect(prevBtn).toHaveClass("btn-disabled")
    })

    it("goes to next page when next button is clicked and page < maxPage", () => {
        render(<Pagination page={2} maxPage={5} setPage={setPage} />)

        const nextBtn = screen.getByTestId("next-page-btn")
        fireEvent.click(nextBtn)

        expect(setPage).toHaveBeenCalledWith(3)
    })

    it("does not go past maxPage when next is clicked on last page", () => {
        render(<Pagination page={5} maxPage={5} setPage={setPage} />)

        const nextBtn = screen.getByTestId("next-page-btn")
        fireEvent.click(nextBtn)

        expect(setPage).toHaveBeenCalledWith(5)
        expect(nextBtn).toHaveClass("btn-disabled")
    })
})
