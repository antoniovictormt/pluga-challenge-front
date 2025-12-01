
import { render, screen } from "@testing-library/react"

import { Pagination } from ".."

describe("Pagination component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

    const setPage = jest.fn()


  it("renders numeric page buttons according to maxPage", () => {
    render(<Pagination page={2} maxPage={4} setPage={setPage} />)

    for (let i = 1; i <= 4; i++) {
      expect(screen.getByText(String(i))).toBeDefined()
    }
    expect(screen.getByTestId("next-page-btn")).toBeDefined()
  })

  it("applies btn-active to current page and btn-disabled on previous when page === 1", () => {
    const setPage = jest.fn()
    render(<Pagination page={1} maxPage={3} setPage={setPage} />)

    const page1Btn = screen.getByText("1")
    expect(page1Btn).toHaveClass("btn-active")

    const prevImg = screen.getByAltText("Previous page")
    const prevBtn = prevImg.closest("button")
    expect(prevBtn).toHaveClass("btn-disabled")

    const nextBtn = screen.getByTestId("next-page-btn")
    expect(nextBtn).not.toHaveClass("btn-disabled")
  })

  it("applies btn-disabled on next when page === maxPage", () => {
    const setPage = jest.fn()
    render(<Pagination page={5} maxPage={5} setPage={setPage} />)

    const nextBtn = screen.getByTestId("next-page-btn")
    expect(nextBtn).toHaveClass("btn-disabled")

    expect(screen.getByText("5")).toHaveClass("btn-active")
  })
})
