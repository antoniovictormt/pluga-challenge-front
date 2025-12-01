import { fireEvent, render, screen } from "@testing-library/react"

import { PlugaApp } from "@/types"

import { AppModal } from ".."

describe("AppModal component", () => {
    const app1: PlugaApp = {
        app_id: "a1",
        name: "App One",
        color: "#111111",
        icon: "https://example.com/a1.png",
        link: "https://app.one"
    }

    const app2: PlugaApp = {
        app_id: "a2",
        name: "App Two",
        color: "#222222",
        icon: "https://example.com/a2.png",
        link: "https://app.two"
    }

    const app3: PlugaApp = {
        app_id: "a3",
        name: "App Three",
        color: "#333333",
        icon: "https://example.com/a3.png",
        link: "https://app.three"
    }

    const onSelect = jest.fn()
    const onClose = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("renders selectedApp info (name, image and external link)", () => {
        const { container } = render(
            <AppModal
                selectedApp={app1}
                lastSelectedApps={[app2, app3]}
                onSelect={onSelect}
                onClose={onClose}
            />
        )

        const dialog = container.querySelector("dialog") as HTMLDialogElement
        dialog?.setAttribute("open", "")

        expect(screen.getByText(app1.name)).toBeInTheDocument()

        const mainImg = screen.getByAltText(app1.name) as HTMLImageElement
        expect(mainImg).toBeInTheDocument()
        expect(mainImg.src).toContain(
            "http://localhost/_next/image?url=https%3A%2F%2Fexample.com%2Fa1.png&w=128&q=75"
        )

        const accessLink = screen.getByRole("link", { name: /acessar/i })
        expect(accessLink).toBeInTheDocument()
        expect(accessLink).toHaveAttribute("href", app1.link)
        expect(accessLink).toHaveAttribute("target", "_blank")
    })

    it("calls onClose when clicking the backdrop, but not when clicking inside modal content", () => {
        render(
            <AppModal
                selectedApp={app1}
                lastSelectedApps={[app2]}
                onSelect={onSelect}
                onClose={onClose}
            />
        )

        const backdrop = document.querySelector(
            ".modal-backdrop"
        ) as HTMLElement
        expect(backdrop).toBeInTheDocument()

        fireEvent.click(backdrop)
        expect(onClose).toHaveBeenCalledTimes(1)

        onClose.mockClear()

        const title = screen.getByText(app1.name)
        fireEvent.click(title)
        expect(onClose).not.toHaveBeenCalled()
    })
})
