<script>
 export default {
        name: 'PagesPanel',
        props: ['length'],
        data(){
            return{
                currentPage: 0
            }
        },
        methods: {
            changePage(){
                this.$emit('pageChanged', {
                    page: this.currentPage
                })
            }
        }
    }
</script>
<template>
    <select @change="changePage" name="page" id="page" v-model="currentPage">
        <option value="0">0</option>
        <option :value="idx" v-for="idx in Math.floor(length / 5)">{{ idx }}</option>
    </select>
    
</template>
