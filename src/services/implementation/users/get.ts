import getUsersDataAxios from "services/adapters/users/get"

const getUsersData = async (page: number, limit: number) => {
    const data = await getUsersDataAxios(page, limit)
    return data
}

export default getUsersData