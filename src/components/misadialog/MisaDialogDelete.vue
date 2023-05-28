<template>
    <div class="message__employee-delete">
        <div class="message__employee-exist__content">
          <div class="icon--warning"></div>
          <div>Bạn có thực sự muốn xóa nhân viên &lt;NV-0001&gt; không?</div>
        </div>
        <hr>
        <div class="button--group">
          <div @click="onCloseDialog" id="dialog--delete-reject" class="button button--secondary message__employee-exist__button">Hủy bỏ</div>
          <div @click="onDeleteDialog" id="dialog--delete-approve" class="button button--primary message__employee-exist__button handle-close-delete">Đồng ý</div>
        </div>
      </div>
</template> 

<script>
    export default {
        name: 'MisaDialogDelete',
        methods: {
            /**
             * Description: Đóng dialog 
             * Create by: Nguyen Quang Minh
             * Create date: 28-05-2023 21:51:35
             */
          onCloseDialog() {
            this.$emit('onCloseDialog')
          },
            /**
             * Description: Xóa dialog 
             * Create by: Nguyen Quang Minh
             * Create date: 28-05-2023 21:51:44
             */
          onDeleteDialog() {
            this.$emit('onDeleteDialog')
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>