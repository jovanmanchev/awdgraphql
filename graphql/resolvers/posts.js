const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
    
        async getPosts(){
            try{
                const posts = Post.find().sort( { createdAt: -1 });
                return posts;
            }catch(err){
                throw new Error(err);
            }
        },
        async getPostsByCategory(_, {category}){
            try{
                const posts = Post.find({category}).sort( { createdAt: -1 });
                return posts;
            }catch(err){
                throw new Error(err);
            }
        },
        async getPost(_, {postId}){
            try{
                const post = await Post.findById(postId)
                if(post){
                    return post ;
                }else{
                    throw new Error('Post not found')
                }
            }catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createPost(_, {body, category}, context){
            const user = checkAuth(context);
            
            const newPost = new Post({
                body,
                category,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString() 
            })

            const post = await newPost.save();

            return post;
        },
        async deletePost(_, {postId}, context){
           const user = checkAuth(context);

           try{
            const post = await Post.findById(postId)
            if(user.username === post.username){
                await post.delete();
                return 'post deleted successfully';
            }else{
                throw new AuthenticationError('Action not allowed');
            }

           }catch(err){
            throw new Error(err);
           }

        },
        likePost: async (_, {postId}, context) => {
            const {username} = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                if(post.likes.find(like => like.username === username)){
                    post.likes = post.likes.filter(like => like.username !== username);
                
                }else{
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    });
                    
                }
                await post.save();
                return post;
            }else{
                throw new UserInputError("Post not found");
            }
        }

        

    }
}