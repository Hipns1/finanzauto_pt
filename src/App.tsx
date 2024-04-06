import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import getUsersData from 'services/implementation/users/get'
import PaginationBar from 'components/PaginationBar/PaginationBar'
import UsersTable from 'components/UsersTable/UsersTable'
import { DataUserProps } from 'models/entities/DataUsersProps'
import s from './styles/App.module.scss'
import deleteUser from 'services/implementation/users/delete'
import { toastMessage } from 'utils/toastMessage'
import Loading from 'components/Loading/Loading'
import EmptyState from 'components/EmptyState/EmptyState'
import logo from './assets/finanzauto_logo.png'
import postUser from 'services/implementation/users/post'
import putUser from 'services/implementation/users/put'
import ItemsPerPage from 'components/ItemsPerPage/ItemsPerPage'
import ModalUserForm from 'components/ModalUserForm/ModalUserForm'
import ModalUserView from 'components/ModalUserView/ModalUserView'

const App = () => {
    /* Estados generales */
    const [users, setUsers] = useState<DataUserProps>()
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [userEdit, setUserEdit] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [refreshUsers, setRefreshUsers] = useState(0)
    const [isOpenUser, setIsOpenUser] = useState(false)

    /* Funcion para agregar un nuevo usuario */
    const handleAddUser = async (formData) => {
        try {
            await postUser(formData)
            setIsLoading(true)
            setRefreshUsers((prev) => prev + 1)
            setIsOpenModal(false)
            window.location.reload()
            toastMessage('Usuario añadido exitosamente', 'success')
        } catch (error) {
            console.log(error)
            toastMessage('Este correo ya existe, intenta con uno nuevo', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    /* Funcion para elminar un usuario */
    const handleDeleteUser = async (id: string) => {
        try {
            await deleteUser(id)
            setRefreshUsers((prev) => prev + 1)
            setIsLoading(true)
            toastMessage('Usuario eliminado exitosamente', 'success')
        } catch (error) {
            toastMessage('Error al eliminar el usuario, intente nuevamente', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    /* Funcion para editar un usuario */
    const handleEditUser = async (formData) => {
        try {
            await putUser(userEdit?.id, formData)
            setIsLoading(true)
            setRefreshUsers((prev) => prev + 1)
            setIsOpenModal(false)
            window.location.reload()
            toastMessage('Usuario editado exitosamente', 'success')
        } catch (error) {
            console.log(error)
            toastMessage('Error al editar el usuario', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    /* Peticion para obtener todos los usuarios*/
    useEffect(() => {
        const getUsers = async () => {
            /* Persistencia de datos en la paginacion y items por pagina */
            const pageStogare = Number(localStorage.getItem('page') || page)
            if (pageStogare) setPage(pageStogare)
            const limitStogare = Number(localStorage.getItem('limit') || limit)
            if (limitStogare) setLimit(limitStogare)
            /* Peticion */
            try {
                setIsLoading(true)
                const result = await getUsersData(pageStogare - 1, limitStogare)
                setUsers(result)
            } catch (error) {
                console.error('Failed to fetch users:', error)
            } finally {
                setIsLoading(false)
            }
        }
        getUsers()
    }, [page, refreshUsers, limit])

    return (
        <>
            {isLoading ? (
                /* Pantalla de carga */
                <Loading />
            ) : (
                <div className={s.container}>
                    {/* Logo de la empresa */}
                    <img alt='logo' src={logo} className={s.logo} />

                    {/* Boton para abrir el modal de añadir nuevos usuarios */}
                    <div className={s.add_users}>
                        <ItemsPerPage setLimit={setLimit} limit={limit} />
                        <Button onClick={() => setIsOpenModal(!isOpenModal)} color='primary'>
                            + Añadir usuario
                        </Button>
                    </div>

                    {/* Tabla de todos los usuarios, condicionado para mostrar un  */}
                    {/* componente si el array esta vacio  */}
                    {users?.data?.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <UsersTable
                            users={users}
                            limit={limit}
                            handleDeleteUser={handleDeleteUser}
                            setUserEdit={setUserEdit}
                            setIsOpenModal={setIsOpenModal}
                            setIsOpenUser={setIsOpenUser}
                        />
                    )}

                    {/* Componente de paginacion */}
                    <PaginationBar
                        total={users?.total}
                        limit={users?.limit}
                        page={page}
                        setPage={setPage}
                        loading={isLoading}
                    />

                    {/* Modal para agregar o editar usuarios */}
                    <ModalUserForm
                        isOpen={isOpenModal}
                        setIsOpen={setIsOpenModal}
                        handleAddUser={handleAddUser}
                        userEdit={userEdit}
                        setUserEdit={setUserEdit}
                        handleEditUser={handleEditUser}
                    />

                    {/* Modal para ver los datos del usuario*/}
                    <ModalUserView
                        isOpen={isOpenUser}
                        setIsOpen={setIsOpenUser}
                        userEdit={userEdit}
                        setUserEdit={setUserEdit}
                    />
                </div>
            )}
        </>
    )
}

export default App
