<template>
  <div class="form-detail">
    <div class="detail-employee">
      <div class="detail-employee__title">
        <div class="detail-employee__title__item">
          <h1>Thông tin nhân viên</h1>
          <div>
            <input v-model="employee.isCustomer" type="checkbox">
            <label>Là khách hàng</label>
          </div>
          <div>
            <input v-model="employee.isProvider" type="checkbox">
            <label>Là nhà cung cấp</label>
          </div>
        </div>
        <div class="detail-employee__title__item">
          <div class="icon--info"></div>
          <div @click="handleCloseEmployeeDetail" class="icon--close detail-employee__title__item__close-icon"></div>
        </div>
      </div>
      <div class="detail-employee__list">
        <div class="detail-employee__item-group w-50">
          <div class="detail-employee__item w-40">
            <label for="">Mã <span style="color: #E60000;">*</span></label>
            <MisaInput ref="employeeCode" v-model="employee.EmployeeCode" :placeholder="'Nhập mã nhân viên'"></MisaInput>
          </div>
          <div class="detail-employee__item w-60">
            <label for="">Tên <span style="color: #E60000;">*</span></label>
            <MisaInput ref="fullName" v-model="employee.FullName" :placeholder="'Nhập tên nhân viên'"></MisaInput>

          </div>
        </div>
        <div class="detail-employee__item-group w-50">
          <div class="detail-employee__item w-200">
            <label for="">Ngày sinh</label>
            <input type="date" v-model="employee.DateOfBirth" placeholder="Nhập ngày sinh" class="input-custom">
          </div>
          <div class="detail-employee__item w-250">
            <label>Giới tính</label>
            <div class="detail-employee__item-group">
              <div class="detail-employee__radio">
                <input v-model="employee.GenderName" type="radio" id="checkbox1" name="sex" value="Nam">
                <label>Nam</label>
              </div>
              <div class="detail-employee__radio">
                <input v-model="employee.GenderName" type="radio" id="checkbox2" name="sex" value="Nữ">
                <label>Nữ</label>
              </div>
              <div class="detail-employee__radio">
                <input v-model="employee.GenderName" type="radio" id="checkbox3" name="sex" value="Khác">
                <label>Khác</label>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-employee__item detail-employee__unit w-50">
          <label for="">Đơn vị <span style="color: #E60000;">*</span></label>
          <div @click="showSelectUnit" ref="unitName" class="input-custom">
            {{ (employee.UnitName === 'Bỏ chọn' || employee.UnitName === undefined) ? '-- Nhập đơn vị' :
              employee.UnitName }}</div>
          <ul v-show="selectUnit" class="detail-employee__unit__list">
            <li @click="() => handleSelectUnit(unit)" v-for="unit in unitList" :key="unit"
              class="detail-employee__unit__item">{{ unit
              }}</li>
          </ul>
        </div>
        <div class="detail-employee__item-group w-50">
          <div class="detail-employee__item w-60">
            <label title="Số chứng minh nhân dân">Số CMND</label>
            <MisaInput v-model="employee.CitizenIdentification" :placeholder="'Số chứng minh nhân dân'"></MisaInput>
          </div>
          <div class="detail-employee__item w-40">
            <label for="">Ngày cấp</label>
            <input type="date" v-model="employee.CitizenIdentificationDate" class="input-custom" />
          </div>
        </div>
        <div class="detail-employee__item w-50">
          <label for="">Chức danh</label>
          <MisaInput v-model="employee.TitleInfo" :placeholder="'Nhập chức danh'"></MisaInput>
        </div>
        <div class="detail-employee__item w-50">
          <label for="">Nơi cấp</label>
          <MisaInput v-model="employee.IssuedBy" :placeholder="'Nhập nơi cấp'"></MisaInput>
        </div>
        <div class="detail-employee__item w-100">
          <label for="">Địa chỉ</label>
          <MisaInput v-model="employee.AddressInfo" :placeholder="'Nhập địa chỉ'"></MisaInput>
        </div>
        <div class="detail-employee__item-group w-100">
          <div class="detail-employee__item w-25">
            <label title="Điện thoại di động">ĐT di động</label>
            <MisaInput v-model="employee.MobilePhone" :placeholder="'Nhập só điện thoại di động'"></MisaInput>
          </div>
          <div class="detail-employee__item w-25">
            <label title="Điện thoại cố định">ĐT cố định</label>
            <MisaInput v-model="employee.Landline" :placeholder="'Nhập số điện thoại cố định'"></MisaInput>
          </div>
          <div class="detail-employee__item w-25">
            <label for="">Email</label>
            <MisaInput v-model="employee.EmailAccount" :placeholder="'Nhập email'"></MisaInput>
          </div>
        </div>
        <div class="detail-employee__item-group w-100">
          <div class="detail-employee__item w-25">
            <label for="">Tài khoản ngân hàng</label>
            <MisaInput v-model="employee.AccountNumber" :placeholder="'Nhập tài khoản ngân hàng'"></MisaInput>
          </div>
          <div class="detail-employee__item w-25">
            <label for="">Tên tài khoản</label>
            <MisaInput v-model="employee.AccountName" :placeholder="'Nhập tên tài khoản'"></MisaInput>
          </div>
          <div class="detail-employee__item w-25">
            <label for="">Chi nhánh</label>
            <MisaInput v-model="employee.AccountBranch" :placeholder="'Nhập chi nhánh'"></MisaInput>
          </div>
        </div>
      </div>
      <hr class="bt-48">
      <div class="detail-employee__action">
        <div @click="handleCloseEmployeeDetail" id="button--cancel-add-and-change" class="button button--secondary">Hủy
        </div>
        <div class="detail-employee__item-group">
          <div class="button button--secondary">Cất</div>
          <div @click="handleSubmit" id="button--approve-add-and-change"
            class="button button--primary detail-employee__button-edit">Cất và thêm
          </div>
        </div>
      </div>
    </div>
  </div>
  <MisaDialogExist @onCloseDialog="closeDialog" v-show="MisaDialogExist"></MisaDialogExist>
  <ToastMessage v-if="showMessage" :typeMessage="typeMessage"></ToastMessage>
</template>
<script>
import ToastMessage from '@/components/toastmessage/ToastMessage.vue'
import MisaDialogExist from '@/components/misadialog/MisaDialogExist.vue';
import MisaInput from '@/components/MisaInput.vue';
import { addEmployeeApi, updateEmployeeApi } from '../../apis/employee/employee'
export default {
  name: 'EmployeeDetail',
  props: {
    openEmployeeDetail: {
      type: String,
    },
    employeeList: {
      type: String
    },
    isEdit: {
      type: String
    },
    employeeInfoSelected: {
      type: Object
    }
  },
  components: {
    MisaInput, MisaDialogExist, ToastMessage
  },
  data() {
    return {
      MisaDialogExist: false,
      selectUnit: false,
      unitList: [
        "Bỏ chọn", "Misa", "FPT", "Vietel"
      ],
      showMessage: false,
      typeMessage: 'success',
      isChecked: false,
      employee: {
        isCustomer: false,
        isProvider: false,
        EmployeeCode: '',
        FullName: '',
        DateOfBirth: '',
        GenderName: '',
        UnitName: '',
        CitizenIdentification: '',
        CitizenIdentificationDate: '',
        TitleInfo: '',
        IssuedBy: '',
        AddressInfo: '',
        MobilePhone: '',
        Landline: '',
        EmailAccount: '',
        AccountNumber: '',
        AccountName: '',
        AccountBranch: '',
      }
    }
  },
  created() {
    if (this.isEdit) {
      const newEmployee = JSON.stringify(this.employeeInfoSelected)
      this.employee = JSON.parse(newEmployee)
    } else {
      this.employee = {}
    }
  },
  methods: {
    handleCloseEmployeeDetail() {
      this.$emit('onCloseDialog')
    },
    closeDialog() {
      this.MisaDialogExist = false
    },
    showSelectUnit() {
      this.selectUnit = true
    },
    handleSelectUnit(unit) {
      this.employee.UnitName = unit
      this.selectUnit = false
    },
    handleSubmit() {
      if (this.isEdit) {
        this.updateEmployee()
      }
      else this.addEmployee()
    },
    checkExist() {
      let codeExist = this.employeeList.some(i => (i.EmployeeCode === this.employee.EmployeeCode))
      return codeExist
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
        this.handleCloseEmployeeDetail()
      }, 1000);
    },
    checkValidate() {
      if (this.employee.EmployeeCode === (undefined || '')) {
        this.$refs.employeeCode.$el.style.border = '1px solid red'
        this.$refs.employeeCode.$el.title = 'Mã không được để trống.'
      }
      if (this.employee.FullName === (undefined || '')) {
        this.$refs.fullName.$el.style.border = '1px solid red'
        this.$refs.fullName.$el.title = 'Tên không được để trống.'
      }
      if (this.employee.UnitName === undefined || this.employee.UnitName === 'Bỏ chọn') {
        this.$refs.unitName.setAttribute('style', 'border: 1px solid red')
        this.$refs.unitName.setAttribute('title', 'Đơn vị không được để trống.')
      }
      this.messageFail()
    },
    async addEmployee() {
      if (this.employee.EmployeeCode === '' || this.employee.FullName === '' || this.employee.UnitName === undefined || this.employee.UnitName === 'Bỏ chọn') {
        this.checkValidate()
      } else if (!this.checkExist()) {
        const res = await addEmployeeApi(this.employee)
        if (res.status === 201) {
          this.messageSuccess()
        } else {
          this.messageFail()
        }
      } else {
        this.MisaDialogExist = true
      }
    },
    async updateEmployee() {
      if (this.employee.EmployeeCode === '' || this.employee.FullName === '' || this.employee.UnitName === undefined || this.employee.UnitName === 'Bỏ chọn') {
        this.checkValidate()
      }
      else if (!this.checkExist()) {
        const res = await updateEmployeeApi(this.employee.id, this.employee)
        if (200 === res.status) {
          this.messageSuccess()
        } else {
          this.showMessage = true
          this.typeMessage = 'fail'
        }
      }
      else {
        this.MisaDialogExist = true
      }
    }
  },
}
</script>

<style></style>