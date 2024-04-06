import postUserAxios from "services/adapters/users/post"

const postUser = async (formData) => {
    const newUser = {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        title: formData?.title,
        email: formData?.email,
        picture: formData?.picture,
        gender: formData?.gender,
        phone: formData?.phone,
    }
    const data = await postUserAxios(newUser)
    return data
}

export default postUser