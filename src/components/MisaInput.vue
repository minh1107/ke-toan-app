<template>
    <input type="text" class="input-custom"
    @input="$emit('update:modelValue', $event.target.value)"
    :value="modelValue" 
    >
</template>

<script>
    export default {
        name: 'MisaInput',
        props: {
            modelValue: String,
        },
        data() {
            return {
            }
        }
    }
</script>

<style scoped>

</style>