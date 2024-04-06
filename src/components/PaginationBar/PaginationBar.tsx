import React from 'react'
import { Pagination } from '@mui/material'
import { PaginationBarProps } from 'models/data/PaginationBarProps'
import { setLocalStorage } from 'utils/setLocalStorage'
import s from './PaginationBar.module.scss'

const PaginationBar: React.FC<PaginationBarProps> = ({ total, limit, page, setPage, loading }) => {
    const handlePage = (value: any) => {
        const pageStorage = value
        setLocalStorage('page', pageStorage)
        setPage(value)
    }

    return (
        <div className={s.container}>
            <Pagination
                count={Math.ceil(Number(total / limit)) || 0}
                variant='outlined'
                shape='rounded'
                color='primary'
                page={page}
                disabled={loading}
                onChange={(e, value) => handlePage(value)}
            />
        </div>
    )
}

export default PaginationBar
