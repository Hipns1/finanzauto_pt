import React from 'react'
import s from './UsersTable.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table, Button } from 'reactstrap'
import { UsersTableProps } from 'models/data/UsersTableProps'
import icon_delete from '../../assets/delete.svg'
import icon_edit from '../../assets/edit.svg'
import icon_person from '../../assets/person.svg'
import icon_inspect from '../../assets/inspect.svg'
import { UsersProps } from 'models/entities/UsersProps'
import getIndividualUser from 'services/implementation/individualUser/getIndividualUser'

const UsersTable: React.FC<UsersTableProps> = ({
    users,
    handleDeleteUser,
    setUserEdit,
    setIsOpenModal,
    limit,
    setIsOpenUser,
}) => {
    const decideTitle = (opcion: string) => {
        switch (opcion) {
            case 'mr':
                return 'Sr.'
            case 'ms':
                return 'Srta.'
            case 'miss':
                return 'Srta.'
            case 'mrs':
                return 'Sra.'
        }
    }

    const handleEdit = async (id: string, state: boolean = false) => {
        try {
            const individualUser = await getIndividualUser(id)
            const userEdit = {
                id: individualUser?.id,
                title: individualUser?.title,
                firstName: individualUser?.firstName,
                lastName: individualUser?.lastName,
                picture: individualUser?.picture,
                gender: individualUser?.gender,
                email: individualUser?.email,
                phone: individualUser?.phone,
            }
            setUserEdit(userEdit)
            state ? setIsOpenUser(true) : setIsOpenModal(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={s.container}>
            <Table hover responsive size='sm'>
                <thead>
                    <tr className='text-center'>
                        <th>#</th>
                        <th></th>
                        <th>id</th>
                        <th>Nombre</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.data?.map((user: UsersProps, index: number) => (
                        <tr key={index}>
                            <td>{Number(users?.page * limit + index)}</td>
                            <td className={s.img}>
                                <img alt='logo' src={user?.picture || icon_person} />
                            </td>
                            <td>{user?.id}</td>
                            <td>{`${decideTitle(user?.title)} ${user?.firstName} ${user?.lastName}`}</td>
                            <td className={s.action_fields}>
                                <Button
                                    size='sm'
                                    color='primary'
                                    onClick={() => {
                                        handleEdit(user?.id)
                                    }}>
                                    <img alt='' src={icon_edit} />
                                </Button>{' '}
                                <Button color='danger' onClick={() => handleDeleteUser(user?.id)} size='sm'>
                                    <img alt='' src={icon_delete} />
                                </Button>{' '}
                                <Button
                                    color='info'
                                    onClick={() => {
                                        handleEdit(user?.id, true)
                                    }}
                                    size='sm'>
                                    <img alt='' src={icon_inspect} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default UsersTable
