export interface ItemsPerPageProps {
    setLimit: (limit: number) => void
    limit: number
}

export interface Option {
    value: number
    label: string
}
