import "./globals.css"

export const metadata = {
    title: "Pluga Challenge Front",
    description: "Encontre e integre ferramentas com a Pluga.",
    keywords: "Pluga, integrações, automação, ferramentas, apps",
    openGraph: {
        title: "Pluga Challenge Front",
        description: "Encontre e integre ferramentas com a Pluga."
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
                  <head>
        <link rel='icon' href='/icons/icon-pluga.png' type='image/png' />
      </head>

            <body
                className="min-h-screen antialiased"
                cz-shortcut-listen="true"
            >
                {children}
            </body>
        </html>
    )
}
