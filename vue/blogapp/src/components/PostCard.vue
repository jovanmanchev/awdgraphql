<script>
import moment from 'moment'
import LikeButton from './LikeButton.vue'
import DeleteButton from './DeleteButton.vue'
import PostCardComments from './PostCardComments.vue'
import PostComment from './PostComment.vue'
export default {
    components: {
        LikeButton,
        DeleteButton,
        PostCardComments,
        PostComment
    },
    name: 'PostCard',
    props: ['username', 'likes', 'comments', 'body', 'createdAt', 'id'],
    data() {
        return {
            moment,
            showComments: false,
            commentsCount: this.comments.length
        }
    },
    methods: {

        changeShowComments() {
            
            this.showComments = !this.showComments;
        }

    },
    computed: {
        canLike() {
            if (!localStorage.getItem('jwtToken'))
                return

            const usernameUser = localStorage.getItem('username')

            for (const like of this.likes) {
                console.log(localStorage.getItem('user'))
                if (like.username === usernameUser)
                    return false
            }
            return true
        },
        canDelete() {
            if (!localStorage.getItem('jwtToken'))
                return

            const usernameUser = localStorage.getItem('username')
            if (usernameUser === this.username)
                return true;
            return false
        }
    }

}
</script>

<template>
    <div class="card mb-2">
        <div class="card-body">
            <h5 class="card-title">{{ username }}</h5>

            <p class="card-text">{{ body }}.</p>
            <button @click="changeShowComments">Show comments</button>
            <PostCardComments :id="id" :body="body" :username="username" :comments="comments" v-if="showComments" />
            <LikeButton :likes="likes" :postId="id" />
            <PostComment :postId = "id"/>
            <span>{{ commentsCount }}</span>
            <DeleteButton :postId="id" v-if="canDelete" />
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
