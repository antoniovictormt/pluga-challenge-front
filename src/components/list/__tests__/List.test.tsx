import "@testing-library/jest-dom"

import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"

import { AppModalProps, PlugaApp, PlugaContextType } from "@/types"

import { List } from ".."

const usePlugaMock = jest.fn()

jest.mock("@/context/pluga-context", () => ({
  usePluga: () => usePlugaMock(),
}))

jest.mock("@/components/modal", () => ({
  Modal: ({ onClose, onSelect, selectedApp }: AppModalProps, ) => (
    <div data-testid="mock-modal">
      <div data-testid="modal-selected">
        {selectedApp ? selectedApp.name : "Nenhum selecionado"}
      </div>

      <button
        data-testid="close-modal-btn"
        onClick={onClose}
      >
        Close
      </button>

      <button
        data-testid="select-modal-btn"
        onClick={() => onSelect(selectedApp!)}
      >
        Select
      </button>
    </div>
  ),
}))

describe("List component", () => {
  const makePlugaState = (overrides: Partial<PlugaContextType> = {}) => {
    const base: PlugaContextType = {
      apps: [] as PlugaApp[],
      search: "",
      setSearch: jest.fn(),
      page: 1,
      setPage: jest.fn(),
      selectedApp: null,
      setSelectedApp: jest.fn(),
      setApps: jest.fn(),
      lastSelectedApps: [] as PlugaApp[],
      modalRef: {
        current: { close: jest.fn() },
      } as unknown as React.RefObject<HTMLDialogElement>,
      handleSelectedApp: jest.fn(),
    }

    return { ...base, ...overrides }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("shows loading spinner when apps is empty", () => {
    usePlugaMock.mockReturnValue(makePlugaState({ apps: [] }))

    const { container } = render(<List />)

    const spinner = container.querySelector(".loading.loading-spinner")
    expect(spinner).toBeInTheDocument()
  })

  it("shows \"Nenhum app encontrado\" when search yields no results", () => {
    const apps: PlugaApp[] = [
      { app_id: "a1", name: "Alpha", color: "#111", icon: "", link: "" },
      { app_id: "a2", name: "Beta", color: "#222", icon: "", link: "" },
    ]

    const setSearch = jest.fn()

    usePlugaMock.mockReturnValue(
      makePlugaState({
        apps,
        search: "zzz",
        setSearch,
        page: 1,
        lastSelectedApps: [],
      }),
    )

    render(<List />)

    expect(
      screen.getByText(/Nenhum app encontrado para "zzz"\./i),
    ).toBeInTheDocument()
  })

  it("renders Grid, Pagination and wires SearchInput, onClose and onSelect behaviour", () => {
    const apps: PlugaApp[] = Array.from({ length: 3 }).map((_, i) => ({
      app_id: `app${i + 1}`,
      name: `App ${i + 1}`,
      color: "#000",
      icon: "",
      link: "",
    }))

    const setSearch = jest.fn()
    const setPage = jest.fn()
    const handleSelectedApp = jest.fn()
    const setSelectedApp = jest.fn()
    const modalCloseMock = jest.fn()

    const state = makePlugaState({
      apps,
      search: "",
      setSearch,
      page: 1,
      setPage,
      selectedApp: apps[0],
      setSelectedApp,
      lastSelectedApps: [apps[1], apps[2]],
      handleSelectedApp,
      modalRef: {
        current: { close: modalCloseMock },
      } as unknown as React.RefObject<HTMLDialogElement>,
    })

    usePlugaMock.mockReturnValue(state)

    render(<List />)

    expect(screen.getByTestId("card-app1")).toBeInTheDocument()
    expect(screen.getByTestId("card-app2")).toBeInTheDocument()
    expect(screen.getByTestId("card-app3")).toBeInTheDocument()

    expect(screen.getByTestId("next-page-btn")).toBeInTheDocument()

    expect(screen.getByTestId("modal-selected")).toHaveTextContent("App 1")

    const input = screen.getByRole("searchbox")
    fireEvent.change(input, { target: { value: "App 2" } })
    expect(setSearch).toHaveBeenCalledWith("App 2")

    fireEvent.click(screen.getByTestId("card-app2"))
    expect(handleSelectedApp).toHaveBeenCalledWith(
      expect.objectContaining({ app_id: "app2" }),
    )

    const closeBtn = screen.getByTestId("close-modal-btn")
    fireEvent.click(closeBtn)

    expect(modalCloseMock).toHaveBeenCalledTimes(1)
    expect(setSelectedApp).toHaveBeenCalledWith(null)

    const selectBtn = screen.getByTestId("select-modal-btn")
    fireEvent.click(selectBtn)

    expect(handleSelectedApp).toHaveBeenCalledWith(
      expect.objectContaining({ app_id: "app1" }),
    )
  })
})
