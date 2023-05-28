<template>
  <div class="content__title">
    <h1>Nhân viên</h1>
    <div @click="openEmployeeDetail" class="button add-employee button--primary">Thêm mới nhân viên</div>
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
          <tr @dblclick="() => openEmployeeDetail(employee)" v-for="(employee, index) in employeeListShow" :key="index">
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
              <div @click="() => openEmployeeDetail(employee)" class="table-edit-button edit-employee">Sửa</div>
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
  <MisaToastMessage v-if="showMessage" :typeMessage="typeMessage"></MisaToastMessage>
</template>

<script>
import MisaToastMessage from '@/components/toastmessage/MisaToastMessage.vue'
import EmployeeDetail from './EmployeeDetail.vue'
import MisaDialogDelete from '@/components/misadialog/MisaDialogDelete.vue'
import MisaInput from '@/components/MisaInput.vue'
import { deleteEmployeeApi, getEmployeeApi } from '../../apis/employee/employee'
export default {
  name: 'EmployeeList',
  components: {
    EmployeeDetail, MisaInput, MisaDialogDelete, MisaToastMessage
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
    /**
     * Description: Lấy dự liêu 
     * Create by: Nguyen Quang Minh
     * Create date: 28-05-2023 21:37:34
     */
  created() {
    this.getEmployeeList();
  },
  methods: {
      /**
       * Description: Mở form sửa hoặc thêm thông tin nhân viên
       * Create by: Nguyen Quang Minh
       * Create date: 28-05-2023 21:37:55
       */
    openEmployeeDetail(employee) {
      this.isShowDetail = true
      if(typeof employee.id === "number") {
        this.isEdit = true
        this.employeeInfoSelected = employee
      } else {
        this.isEdit = false
        this.employeeInfoSelected = null
      }
    },
    /**
     * Description: Đóng dialog 
     * Create by: Nguyen Quang Minh
     * Create date: 28-05-2023 21:39:21
     */
    closeDialog() {
      this.isShowDetail = false
    },
    /**
     * Description: Đóng dilog hỏi xóa một thông tin nhân viên
     * Create by: Nguyen Quang Minh
     * Create date: 28-05-2023 21:39:40
     */
    closeDialogDelete() {
      this.isShowDeleteDialog = false
      this.showList.forEach((show, i) => {
            this.showList[i] = false
        })
    },
    /**
     * Description: Hiển thị message thất bại
     * Create by: Nguyen Quang Minh
     * Create date: 28-05-2023 21:40:13
     */
    messageFail() {
      this.showMessage = true
      this.typeMessage = 'fail'
      setTimeout(() => {
        this.showMessage = false
      }, 1000);
    },
    /**
     * Description: Xử lý khi message thành công
     * Create by: Nguyen Quang Minh
     * Create date: 28-05-2023 21:42:28
     */
    messageSuccess() {
      this.showMessage = true
      this.typeMessage = 'success'
      setTimeout(() => {
        this.showMessage = false
      }, 1000);
    },
    /**
     * Description: Thực hiện hành động xóa khi ấn vào button xóa trong dialog 
     * Create by: Nguyen Quang Minh
     * Create date: 28-05-2023 21:45:19
     */
    async deleteDialog() {
      const res = await deleteEmployeeApi(this.idItem)
      this.isShowDeleteDialog = false
      this.showList.forEach((show, i) => {
            this.showList[i] = false
        })
      if(res.status === 200 ) {
        this.messageSuccess()
      } else this.messageFail()
    },
    /**
     * Description: Khở các list option các lựa chọn với hàng dữ liệu
     * Create by: Nguyen Quang Minh
     * Create date: 28-05-2023 21:48:25
     */
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
    /**
     * Description: Xóa item
     * Create by: Nguyen Quang Minh
     * Create date: 28-05-2023 21:48:53
     */
    onDeleteItem(id) {
      this.isShowDeleteDialog = true
      this.idItem = id
    },
    /**
     * Description: Lấy thông tin các employee
     * Create by: Nguyen Quang Minh
     * Create date: 28-05-2023 21:49:07
     */
    async getEmployeeList() {
      const data = await getEmployeeApi()
      this.employeeList = data
      this.employeeListShow = data.filter((item, index) => index < this.numberPage)
    },
    /**
     * Description: Hiển thị các tùy chọn hiển thị số lượng trên table
     * Create by: Nguyen Quang Minh
     * Create date: 28-05-2023 21:50:13
     */
    showSelectPaging() {
      this.showPaging ? this.showPaging = false : this.showPaging = true
    },
    /**
     * Description: Chọn số lượng muốn hiển thị 
     * Create by: Nguyen Quang Minh
     * Create date: 28-05-2023 21:51:04
     */
    selectPaging(page) {
      this.numberPage = page
      this.employeeListShow = this.employeeList.filter((item, index) => index < this.numberPage)
      this.showPaging = false
    }
  }
}
</script>

<style scoped>
@import url('../../style/page/employee.css');
</style>