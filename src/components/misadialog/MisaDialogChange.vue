<template>
    <div id="dialog--change" class="message__employee-change">
        <div class="message__employee-exist__content">
            <div class="icon--info-blue"></div>
            <div>Dữ liệu đã bị thay đổi. Bạn có muốn cất không?</div>
        </div>
        <hr>
        <div class="button--group">
            <div id="dialog--change-cancel"
                class="button button--secondary message__employee-exist__button handle-close-exist">Hủy</div>
            <div class="button--group gap--8">
                <div id="dialog--change-reject"
                    class="button button--secondary message__employee-exist__button handle-close-exist">Không</div>
                <div id="dialog--change-approve"
                    class="button button--primary message__employee-exist__button handle-close-exist">Đồng ý</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MisaDialogChange'
}
</script>

<style scoped></style>