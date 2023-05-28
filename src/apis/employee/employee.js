import axios from "axios"

const getEmployeeApi = async () => {
    try {
        const res = await axios.get('http://localhost:3000/employee')
        return res.data
      } catch (error) {
        console.log(error)
      }
}

const addEmployeeApi = async ({isCustomer,
        isProvider,
        EmployeeCode,
        FullName,
        DateOfBirth,
        GenderName,
        UnitName,
        CitizenIdentification,
        CitizenIdentificationDate,
        TitleInfo,
        IssuedBy,
        AddressInfo,
        MobilePhone,
        Landline,
        EmailAccount,
        AccountNumber,
        AccountName,
        AccountBranch }) => {
    try {
        const res = await axios.post('http://localhost:3000/employee', {
            isCustomer,
            isProvider,
            EmployeeCode,
            FullName,
            DateOfBirth,
            GenderName,
            UnitName,
            CitizenIdentification,
            CitizenIdentificationDate,
            TitleInfo,
            IssuedBy,
            AddressInfo,
            MobilePhone,
            Landline,
            EmailAccount,
            AccountNumber,
            AccountName,
            AccountBranch,
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

const deleteEmployeeApi = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:3000/employee/${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

const updateEmployeeApi = async (id, data) => {
    try {
        console.log(id, data)
        const res = await axios.put(`http://localhost:3000/employee/${id}`, data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export {
    addEmployeeApi, deleteEmployeeApi, updateEmployeeApi, getEmployeeApi
}