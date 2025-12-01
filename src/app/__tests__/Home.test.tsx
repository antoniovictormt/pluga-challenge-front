import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"

import Home from "../page"


describe("Page", () => {
    it("renders a heading", () => {
        render(<Home />)

        const heading = screen.getByText(/Pluga Challenge Front/i)

        expect(heading).toBeInTheDocument()
    })
})
