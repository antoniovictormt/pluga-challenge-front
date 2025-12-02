import { fireEvent, render, screen } from "@testing-library/react"

import { SearchInput } from ".."

describe("SearchInput component", () => {
    beforeEach(() => jest.clearAllMocks())

    it("renders input and icon correctly", () => {
        const onChange = jest.fn()

        render(<SearchInput value="" onChange={onChange} />)

        const icon = screen.getByAltText("Ícone de busca")
        expect(icon).toBeDefined()

        const input = screen.getByPlaceholderText("Buscar ferramenta")
        expect(input).toBeDefined()
    })

    it("calls onChange with the typed text (fireEvent)", () => {
        const onChange = jest.fn()

        render(<SearchInput value="" onChange={onChange} />)

        const input = screen.getByPlaceholderText("Buscar ferramenta")

        fireEvent.change(input, { target: { value: "pagar" } })

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith("pagar")
    })
})
