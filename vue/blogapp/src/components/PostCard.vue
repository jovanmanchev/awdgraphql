<script>
    import moment from 'moment'
    export default{
        name: 'PostCard',
        props: ['username', 'likes', 'comments', 'body', 'createdAt', 'id'],
        data(){
            return{
                moment
            }
        },
        methods: {
            likePost(){
                console.log('post liked');
            },
            commentOnPost(){
                console.log('comment')
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
    
    <a class="card-link" @click="likePost">
        <span class="material-symbols-outlined">
favorite
</span>
<span>{{ likes.length }}</span>
    </a>

    <a class="card-link" @click="commentOnPost">
        <span class="material-symbols-outlined">
        comment
</span>
<span>{{ comments.length }}</span>
    </a>
  </div>
</div>
</template>