<template>
    <div id="dialog--exist" class="message__employee-exist">
        <div class="message__employee-exist__content">
          <div class="icon--warning"></div>
          <div>Mã nhân viên &lt;NV-0001&gt; đã tồn tại trong hệ thống, vui lòng kiểm tra lại.</div>
        </div>
        <hr>
        <div id="dialog--exist-approve" @click="closeDialog" class="button button--primary message__employee-exist__button handle-close-exist">Đồng ý</div>
      </div>
</template>

<script>
    export default {
        name: 'MisaDialogExist',
        methods: {
            /**
             * Description: Đóng dialog 
             * Create by: Nguyen Quang Minh
             * Create date: 28-05-2023 21:52:08
             */
          closeDialog() {
            this.$emit('onCloseDialog')
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>