import axios from "axios"

const getEmployeeApi = async () => {
    try {
        const res = await axios.get('http://localhost:3000/employee')
        return res.data
      } catch (error) {
        console.log(error)
      }
}

const addEmployeeApi = async (
    {   isCustomer,
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
        AccountBranch }
) => {
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
// async AddEmployee() {
//     try {
//       const res = await axios.post('http://localhost:3000/employee', {
//         EmployeeCode: this.$refs.employeeCode.inputValue, // Mã
//         FullName: this.$refs.employeeFullName.inputValue, // Tên
//         GenderName: this.employee.selectedOptionSex, // gioi tih
//         DateOfBirth: this.employee.selectedDateOfBirth, // Ngày sinh
//         CitizenIdentification: this.$refs.employeeCitizenIdentification.inputValue, // Số CMND
//         CitizenIdentificationDate: this.employee.CitizenIdentificationDate,
//         UnitName: this.employee.UnitName, // tên đơn vị //
//         TitleInfo: this.$refs.employeeTitleInfo.inputValue, // chức danh *
//         AccountNumber: this.$refs.employeeAccountNumber.inputValue,
//         AccountName: this.$refs.employeeAccountName.inputValue,
//         AccountBranch: this.$refs.employeeAccountBranch.inputValue, //
//         MobilePhone: this.$refs.employeeMobilePhone.inputValue, //
//         Landline: this.$refs.employeeLandline.inputValue, //
//         EmailAccount: this.$refs.employeeEmailAccount.inputValue, // mail
//         IssuedBy: this.$refs.employeeIssuedBy.inputValue, // Nơi cấp
//         AddressInfo: this.$refs.employeeAddressInfo.inputValue, // Địa chỉ
//         typeEmployee: this.employee.selectedOptionType, //Là khách hàng
//         id: this.employeeList.length
//       })
//       if(res.data) {
//         console.log('successfully')
//       }
//     } catch (error) {
//       alert('error')
//     }
//   }