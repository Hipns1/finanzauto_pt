import putUserAxios from "services/adapters/users/put"

const putUser = async (id: string, userData) => {
    const userEdit = {
        lastName: userData?.lastName,
        firstName: userData?.firstName,
        title: userData?.title,
        picture: userData?.picture,
        gender: userData?.gender,
        phone: userData?.phone,
    }
    const data = await putUserAxios(id, userEdit)
    return data
}

export default putUser