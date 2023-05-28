<template>
    <div :class="typeMessage == 'success' ? 'toast__success' : 'toast__error'" class="toast__message">
        <div class="toast__message__box">
            <span :class="typeMessage == 'success' ? 'success--icon' : 'error--icon'"></span>
            <div class="toast__message__content">
                <h3>{{typeMessage == 'success' ? 'Thành công' : 'Thất bại'}}</h3>
            </div>
        </div>
        <div class="icon--close"></div>
    </div>
</template>

<script>
export default {
    name: 'MisaToastMessage',
    props: {
        typeMessage: {
            type: String
        }
    },
}
</script>

<style scoped>
@import url('../../style/base/toastmessage.css');
</style>