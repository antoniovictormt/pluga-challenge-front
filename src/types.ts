export interface PlugaApp {
    app_id: string
    name: string
    icon: string
    color?: string
    link?: string
    [key: string]: unknown
}