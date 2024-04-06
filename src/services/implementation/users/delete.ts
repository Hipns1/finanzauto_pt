import deleteUserAxios from "services/adapters/users/delete"

const deleteUser = async (id: string) => {
    const data = await deleteUserAxios(id)
    return data
}

export default deleteUser