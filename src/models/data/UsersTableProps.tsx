import { DataUserProps } from 'models/entities/DataUsersProps'
import { UsersProps } from 'models/entities/UsersProps'

export interface UsersTableProps {
    users: DataUserProps
    limit: number
    handleDeleteUser: (userId: string) => void
    setUserEdit: React.Dispatch<React.SetStateAction<UsersProps | null>>
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    setIsOpenUser: React.Dispatch<React.SetStateAction<boolean>>
}
