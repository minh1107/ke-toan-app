<template>
  <div class="form-detail">
    <div class="detail-employee">
      <div class="detail-employee__title">
        <div class="detail-employee__title__item">
          <h1>Thông tin nhân viên</h1>
          <div>
            <input v-model="employee.EmployeeType" type="radio" id="checkbox2" name="typeEmployee"
              value="Khách hàng">
            <label>Là khách hàng</label>
          </div>
          <div>
            <input v-model="employee.EmployeeType" type="radio" id="checkbox2" name="typeEmployee"
              value="Nhà cung cấp">
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
            <MisaInput ref="employeeCode" :placeholder="'Nhập mã nhân viên'"></MisaInput>
          </div>
          <div class="detail-employee__item w-60">
            <label for="">Tên <span style="color: #E60000;">*</span></label>
            <MisaInput ref="employeeFullName" :placeholder="'Nhập tên nhân viên'"></MisaInput>

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
          <div @click="showSelectUnit" ref="employeeUnitName" class="input-custom">
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
            <MisaInput ref="employeeCitizenIdentification" :placeholder="'Số chứng minh nhân dân'"></MisaInput>
          </div>
          <div class="detail-employee__item w-40">
            <label for="">Ngày cấp</label>
            <input type="date" v-model="employee.CitizenIdentificationDate" class="input-custom" />
          </div>
        </div>
        <div class="detail-employee__item w-50">
          <label for="">Chức danh</label>
          <MisaInput ref="employeeTitleInfo" :placeholder="'Nhập chức danh'"></MisaInput>
        </div>
        <div class="detail-employee__item w-50">
          <label for="">Nơi cấp</label>
          <MisaInput ref="employeeIssuedBy" :placeholder="'Nhập nơi cấp'"></MisaInput>
        </div>
        <div class="detail-employee__item w-100">
          <label for="">Địa chỉ</label>
          <MisaInput ref="employeeAddressInfo" :placeholder="'Nhập địa chỉ'"></MisaInput>
        </div>
        <div class="detail-employee__item-group w-100">
          <div class="detail-employee__item w-25">
            <label title="Điện thoại di động">ĐT di động</label>
            <MisaInput ref="employeeMobilePhone" :placeholder="'Nhập só điện thoại di động'"></MisaInput>
          </div>
          <div class="detail-employee__item w-25">
            <label title="Điện thoại cố định">ĐT cố định</label>
            <MisaInput ref="employeeLandline" :placeholder="'Nhập số điện thoại cố định'"></MisaInput>
          </div>
          <div class="detail-employee__item w-25">
            <label for="">Email</label>
            <MisaInput ref="employeeEmailAccount" :placeholder="'Nhập email'"></MisaInput>
          </div>
        </div>
        <div class="detail-employee__item-group w-100">
          <div class="detail-employee__item w-25">
            <label for="">Tài khoản ngân hàng</label>
            <MisaInput ref="employeeAccountNumber" :placeholder="'Nhập tài khoản ngân hàng'"></MisaInput>
          </div>
          <div class="detail-employee__item w-25">
            <label for="">Tên tài khoản</label>
            <MisaInput ref="employeeAccountName" :placeholder="'Nhập tên tài khoản'"></MisaInput>
          </div>
          <div class="detail-employee__item w-25">
            <label for="">Chi nhánh</label>
            <MisaInput ref="employeeAccountBranch" :placeholder="'Nhập chi nhánh'"></MisaInput>
          </div>
        </div>
      </div>
      <hr class="bt-48">
      <div class="detail-employee__action">
        <div @click="handleCloseEmployeeDetail" id="button--cancel-add-and-change" class="button button--secondary">Hủy
        </div>
        <div class="detail-employee__item-group">
          <div class="button button--secondary">Cất</div>
          <div @click="addEmployee" id="button--approve-add-and-change"
            class="button button--primary detail-employee__button-edit">Cất và thêm
          </div>
        </div>
      </div>
    </div>
  </div>
  <MisaDialogExist @onCloseDialog="closeDialog" v-show="MisaDialogExist"></MisaDialogExist>
</template>

<script>
import MisaDialogExist from '@/components/misadialog/MisaDialogExist.vue';
import MisaInput from '@/components/MisaInput.vue';
import { addEmployeeApi } from '../../apis/employee/employee'
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
    }
  },
  components: {
    MisaInput, MisaDialogExist
  },
  data() {
    return {
      MisaDialogExist: false,
      selectUnit: false,
      unitList: [
        "Bỏ chọn", "Misa", "FPT", "Vietel"
      ],
      isChecked: false,
      employee: {}
    }
  },
  created() {
    if (this.isEdit) {
      this.employee = this.employeeList[this.idEdit]
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
    async addEmployee() {
      let codeExist = this.employeeList.some(i => i.EmployeeCode === this.$refs.employeeCode.inputValue)
      if (this.$refs.employeeCode.inputValue === '' || this.$refs.employeeFullName.inputValue === '' || this.employee.UnitName === undefined || this.employee.UnitName === 'Bỏ chọn') {
        if (this.$refs.employeeCode.inputValue === '')
          this.$refs.employeeCode.$el.style.border = '1px solid red'
        this.$refs.employeeCode.$el.title = 'Mã không được để trống.'
        if (this.$refs.employeeFullName.inputValue === '')
          this.$refs.employeeFullName.$el.style.border = '1px solid red'
        this.$refs.employeeFullName.$el.title = 'Tên không được để trống.'
        if (this.employee.UnitName === undefined || this.employee.UnitName === 'Bỏ chọn') {
          this.$refs.employeeUnitName.setAttribute('style', 'border: 1px solid red')
          this.$refs.employeeUnitName.setAttribute('title', 'Đơn vị không được để trống.')
        }
      } else if (codeExist === false) {
        this.$refs.employeeCode.$el.style.border = '1px solid #e6e6e6'
        this.$refs.employeeFullName.$el.style.border = '1px solid #e6e6e6'
        this.$refs.employeeUnitName.setAttribute('style', 'border: 1px solid #e6e6e6')
        const res = await addEmployeeApi(
          this.employee.EmployeeType,
          this.$refs.employeeCode.inputValue,
          this.$refs.employeeFullName.inputValue,
          this.employee.DateOfBirth,
          this.employee.GenderName,
          this.employee.UnitName,
          this.$refs.employeeCitizenIdentification.inputValue,
          this.employee.CitizenIdentificationDate,
          this.$refs.employeeTitleInfo.inputValue,
          this.$refs.employeeIssuedBy.inputValue,
          this.$refs.employeeAddressInfo.inputValue,
          this.$refs.employeeMobilePhone.inputValue,
          this.$refs.employeeLandline.inputValue,
          this.$refs.employeeEmailAccount.inputValue,
          this.$refs.employeeAccountNumber.inputValue,
          this.$refs.employeeAccountName.inputValue,
          this.$refs.employeeAccountBranch.inputValue,
        )
        console.log(res)
        this.handleCloseEmployeeDetail()
        if (res) {
          console.log('first')
        }
      } else {
        this.MisaDialogExist = true
      }
    }
  },

}
</script>

<style></style>