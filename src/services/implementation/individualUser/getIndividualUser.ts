import getIndividualUserAxios from "services/adapters/individualUser/getIndividualUser"

const getIndividualUser = async (id: string) => {
    const data = await getIndividualUserAxios(id)
    return data
}

export default getIndividualUser