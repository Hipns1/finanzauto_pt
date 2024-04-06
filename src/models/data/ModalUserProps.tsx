import { UsersProps } from 'models/entities/UsersProps'

export interface ModalUserProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    handleAddUser?: (user: UsersProps) => void
    userEdit: UsersProps | null
    setUserEdit: (user: UsersProps | null) => void
    handleEditUser?: (user: UsersProps) => void
}
