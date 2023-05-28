<template>
  <div class="content__title">
    <h1>Nhân viên</h1>
    <div @click="handleOpenEmployeeDetail" class="button add-employee button--primary">Thêm mới nhân viên</div>
  </div>
  <div class="content__search">
    <div class="content__search__input">
      <!-- <input class="content__search__input__title" type="text" placeholder="Tìm theo mã, tên nhân viên"> -->
      <MisaInput class="padding--right-12" :placeholder="'Tìm theo mã, tên nhân viên'"></MisaInput>
      <div class="icon--search content__search__input__icon"></div>
    </div>
    <span class="icon--refresh"></span>
  </div>
  <div class="content__table">
    <div class="content__table-container">
      <table class="content__table-box">
        <thead class="content__table__title">
          <tr>
            <th model-name="Checkbox"><input type="checkbox"></th>
            <th model-name="EmployeeCode">MÃ NHÂN VIÊN</th>
            <th model-name="FullName">TÊN NHÂN VIÊN</th>
            <th model-name="GenderName">GIỚI TÍNH</th>
            <th model-name="DateOfBirth" class="text-align-center">NGÀY SINH</th>
            <th model-name="CitizenIdentification">SỐ CMND</th>
            <th model-name="Title">CHỨC DANH</th>
            <th model-name="UnitName">TÊN ĐƠN VỊ</th>
            <th model-name="AccountNumber">SỐ TÀI KHOẢN</th>
            <th model-name="DepartmentName">TÊN NGÂN HÀNG</th>
            <th model-name="BranchOfBankAccount">CHI NHÁNH TK NGÂN HÀNG</th>
            <th model-name="Function" class="text-align-center">CHỨC NĂNG</th>
          </tr>
        </thead>
        <tbody>
          <tr @dblclick="() => handleOpenEmployeeDetail(employee)" v-for="(employee, index) in employeeListShow" :key="index">
            <td><input type="checkbox"></td>
            <td>{{ employee.EmployeeCode }}</td>
            <td>{{ employee.FullName }}</td>
            <td>{{ employee.GenderName }}</td>
            <td>{{ employee.DateOfBirth }}</td>
            <td>{{ employee.CitizenIdentification }}</td>
            <td>{{ employee.TitleInfo }}</td>
            <td>{{ employee.UnitName }}</td>
            <td>{{ employee.AccountNumber }}</td>
            <td>{{ employee.AccountName }}</td>
            <td>{{ employee.AccountBranch }}</td>
            <td class="table-edit-column">
              <div @click="() => handleOpenEmployeeDetail(employee)" class="table-edit-button edit-employee">Sửa</div>
              <div @click="(event) => toggleOption(event, index)" class="table-edit-column__icon">
                <div class="icon--down-color"></div>
              </div>
              <ul v-show="showList[index]" class="table-edit-column__list">
                <li>Nhân bản</li>
                <li @click="() => onDeleteItem(employee.id)" class="table-delete-row">Xóa</li>
                <li>Ngừng sử dụng</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="content__table__paging">
    <div class="content__table__paging__total">
      <span>Tổng số: </span>
      <strong id="number-employee">{{ employeeList.length }}</strong>
      <span> bản ghi</span>
    </div>
    <div class="content__table__paging__quantity">
      <div class="content__table__paging__quantity__item">
        <div @click="showSelectPaging">
          <span id="numberRecordInPage">{{numberPage}}</span>
          <span> bảng ghi trên 1 trang</span>
        </div>
        <div class="content__icon">
          <div class="icon--up-gray"></div>
        </div>
        <ul v-if="showPaging" class="paging__display-setting">
          <li @click="() => selectPaging(page)" v-for="(page, index) in pagingList" :key="index">{{page}} bảng ghi trên 1 trang</li>
        </ul>
      </div>
      <div class="paging__unit">
        <span>Trước</span>
        <strong>1</strong>
        <div>2</div>
        <div>3</div>
        <div>...</div>
        <div>52</div>
        <span>Sau</span>
      </div>
    </div>
  </div>
  <EmployeeDetail :employeeInfoSelected="employeeInfoSelected" :isEdit="isEdit" @onCloseDialog="closeDialog" v-if="isShowDetail" :employeeList="employeeList"></EmployeeDetail>
  <MisaDialogDelete @onCloseDialog="closeDialogDelete" @onDeleteDialog="deleteDialog" v-if="isShowDeleteDialog"></MisaDialogDelete>
  <ToastMessage v-if="showMessage" :typeMessage="typeMessage"></ToastMessage>
</template>

<script>
import ToastMessage from '@/components/toastmessage/ToastMessage.vue'
import EmployeeDetail from './EmployeeDetail.vue'
import MisaDialogDelete from '@/components/misadialog/MisaDialogDelete.vue'
import MisaInput from '@/components/MisaInput.vue'
import { deleteEmployeeApi, getEmployeeApi } from '../../apis/employee/employee'
export default {
  name: 'EmployeeList',
  components: {
    EmployeeDetail, MisaInput, MisaDialogDelete, ToastMessage
  },
  props: [''],
  data() {
    return {
      isShowDetail: false,
      employeeList: [],
      employeeListShow: [],
      showList: [],
      isShowDeleteDialog: false,
      idItem: null,
      isEdit: false,
      employeeInfoSelected: {},
      showMessage: false,
      typeMessage: 'success',
      showPaging: false,
      pagingList: [10, 20,30, 50, 100],
      numberPage: 20
    }
  },
  methods: {
    handleOpenEmployeeDetail(employee) {
      this.isShowDetail = true
      if(typeof employee.id === "number") {
        this.isEdit = true
        this.employeeInfoSelected = employee
      } else {
        this.isEdit = false
        this.employeeInfoSelected = null
      }
    },
    closeDialog() {
      this.isShowDetail = false
    },
    closeDialogDelete() {
      this.isShowDeleteDialog = false
      this.showList.forEach((show, i) => {
            this.showList[i] = false
        })
    },
    messageFail() {
      this.showMessage = true
      this.typeMessage = 'fail'
      setTimeout(() => {
        this.showMessage = false
      }, 1000);
    },
    messageSuccess() {
      this.showMessage = true
      this.typeMessage = 'success'
      setTimeout(() => {
        this.showMessage = false
      }, 1000);
    },
    async deleteDialog() {
      const res = await deleteEmployeeApi(this.idItem)
      this.isShowDeleteDialog = false
      this.showList.forEach((show, i) => {
            this.showList[i] = false
        })
        console.log(res.status)
      if(res.status === 200 ) {
        this.messageSuccess()
      } else this.messageFail()
    },
    toggleOption(event, index) {
      event.stopPropagation(); 
      if (this.showList[index]) {
        this.showList[index] = false
      } else {
        this.showList.forEach((show, i) => {
          if (index !== i) {
            this.showList[i] = false
          }
        }
        )
        this.showList[index] = true
      }
    },
    onDeleteItem(id) {
      this.isShowDeleteDialog = true
      this.idItem = id
    },
    async getEmployeeList() {
      const data = await getEmployeeApi()
      this.employeeList = data
      this.employeeListShow = data.filter((item, index) => index < this.numberPage)
    },
    showSelectPaging() {
      this.showPaging ? this.showPaging = false : this.showPaging = true
    },
    selectPaging(page) {
      this.numberPage = page
      this.employeeListShow = this.employeeList.filter((item, index) => index < this.numberPage)
      this.showPaging = false
    }
  },
  created() {
    this.getEmployeeList();
  }
}
</script>

<style scoped>
@import url('../../style/page/employee.css');
</style>