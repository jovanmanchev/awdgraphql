<script>
    import moment from 'moment'
    import LikeButton from './LikeButton.vue'
    export default{
        components:{
            LikeButton
        },
        name: 'PostCard',
        props: ['username', 'likes', 'comments', 'body', 'createdAt', 'id'],
        data(){
            return{
                moment
            }
        },
        methods: {
           
            commentOnPost(){
                console.log('comment')
            },
            handleLike(event){
              
            }
            
        },
        computed:{
            canLike(){
                if(!localStorage.getItem('jwtToken'))
                    return

                const usernameUser = localStorage.getItem('username')
                
                for(const like of this.likes){
                    console.log(localStorage.getItem('user'))
                    if(like.username === usernameUser)
                        return false 
                }
                return true
            }
        }
       
    }
</script>

<template>
  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">{{ username }}</h5>
    <router-link :to="{name: 'PostDetail', params: {id}}" class="card-subtitle mb-2 text-muted">{{ moment(createdAt).fromNow() }}</router-link>
    <p class="card-text">{{ body }}.</p>
    
    <LikeButton :likes = "likes" :postId = "id" @liked = "handleLike" />
  


    <a class="card-link" @click="commentOnPost">
        <span class="material-symbols-outlined">
        comment
</span>
<span>{{ comments.length }}</span>
    </a>
  </div>
</div>
</template>


<style scoped>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}


</style>
