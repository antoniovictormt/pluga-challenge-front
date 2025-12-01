import { fireEvent, render, screen } from "@testing-library/react"

import { Grid } from ".."




describe("Grid component", () => {
  const mockApps = [
    {
      app_id: "pagar_me",
      name: "Pagar.me",
      color: "#95C93F",
      icon: "https://example.com/icon.png",
      link: "https://pluga.co/ferramentas/pagar_me/integracao/",
    },
    {
      app_id: "iugu",
      name: "Iugu",
      color: "#123456",
      icon: "https://example.com/iugu.png",
      link: "https://pluga.co/ferramentas/iugu/integracao/",
    },
    {
      app_id: "stripe",
      name: "Stripe",
      color: "#000000",
      icon: "https://example.com/stripe.png",
      link: "https://pluga.co/ferramentas/stripe/integracao/",
    },
  ]

    const onSelect = jest.fn()


  it("renders a Card for each app", () => {
    render(<Grid apps={mockApps} onSelect={onSelect} />)

    mockApps.forEach((app) => {
      const card = screen.getByTestId(`card-${app.app_id}`)
      expect(card).toBeDefined()
    })
  })

  it("forwards onSelect to each Card and calls it with the correct app when clicked",  () => {
    const onSelect = jest.fn()
    render(<Grid apps={mockApps} onSelect={onSelect} />)

    const target = screen.getByTestId(`card-${mockApps[1].app_id}`)
    fireEvent.click(target)

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(mockApps[1])
  })
})
