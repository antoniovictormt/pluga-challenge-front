import { fireEvent, render, screen } from "@testing-library/react"

import { Card } from ".."

describe("Card component", () => {
    const mockApp = {
        app_id: "1",
        name: "Pagar.me",
        icon: "https://example.com/icon.png"
    }

    const onSelect = jest.fn()

    it("renders app name and image", () => {
        render(<Card app={mockApp} onSelect={onSelect} />)

        const name = screen.getByText(/pagar\.me/i)
        expect(name).toBeDefined()

        const img = screen.getByAltText(/pagar\.me/i) as HTMLImageElement
        expect(img).toBeDefined()

        expect(img.src).toContain(
            "/_next/image?url=https%3A%2F%2Fexample.com%2Ficon.png&w=128&q=75"
        )
    })

    it("calls onSelect with app when clicked", async () => {
        render(<Card app={mockApp} onSelect={onSelect} />)

        const button = screen.getByRole("button", { name: /pagar\.me/i })
        fireEvent.click(button)
        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(onSelect).toHaveBeenCalledWith(mockApp)
    })
})
