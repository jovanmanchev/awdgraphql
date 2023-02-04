<script>
 export default {
        name: 'PagesPanel',
        props: ['length', 'selectedPage'],
        data(){
            return{
                currentPage: this.page
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
    <div>Current Page: {{ selectedPage }}</div>
    <select @change="changePage" name="page" id="page" class="form-group col-lg-2" v-model="currentPage">
        <option value="" disabled>See other page</option>
        <option :value="0">0</option>
        <option :value="idx" v-for="idx in Math.floor(length / 5)">{{ idx }}</option>
    </select>
    
</template>
