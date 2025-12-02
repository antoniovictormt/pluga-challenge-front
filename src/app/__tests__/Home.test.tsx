import { render, screen } from "@testing-library/react"

import { getPlugaTools } from "@/service/pluga-tools"

import Home from "../page"

jest.mock("@/components/list", () => ({
    List: () => <div>Lista mockada</div>
}))

describe("Home page (server component)", () => {
    const mockApps = [
        {
            app_id: "pagar_me",
            name: "Pagar.me",
            color: "#95C93F",
            icon: "https://example.com/icon.png",
            link: "https://pluga.co/ferramentas/pagar_me/integracao/"
        },
        {
            app_id: "iugu",
            name: "Iugu",
            color: "#123456",
            icon: "https://example.com/iugu.png",
            link: "https://pluga.co/ferramentas/iugu/integracao/"
        }
    ]

    beforeEach(() => {
        const getPlugaData = getPlugaTools as jest.Mock

        getPlugaData.mockResolvedValue(mockApps)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("chama getPlugaTools e renderiza List dentro do PlugaProvider com initialApps", async () => {
        const tree = await Home()

        const { container } = render(tree as React.ReactElement)

        expect(screen.getByText("Lista mockada")).toBeDefined()

        const wrapper = container.querySelector("[data-initial]")
        expect(wrapper).toBeTruthy()

        const attr = wrapper?.getAttribute("data-initial")
        expect(attr).toBe(JSON.stringify(mockApps))

        expect(getPlugaTools).toHaveBeenCalledTimes(1)
    })
})
