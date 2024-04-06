export interface PaginationBarProps {
    total: number
    limit: number
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    loading: boolean
}
