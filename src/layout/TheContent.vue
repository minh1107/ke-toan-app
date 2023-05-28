<template>
    <main class="content">
      <EmployeeList></EmployeeList>
    </main>
</template>
<script>
import EmployeeList from '../view/employee/EmployeeList.vue' 
export default {
    name: 'TheContent',
    components: {
      EmployeeList
    }
}
</script>
<style scoped>
    @import url('../style/layout/content.css');
</style>