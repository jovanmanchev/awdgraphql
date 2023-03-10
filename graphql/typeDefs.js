const {gql} = require('apollo-server')

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        category: String!
        likes: [Like]!
    }
    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!

    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
        getPostsByCategory(category: String!): [Post]
    }
    type Mutation{
        register(registerInput: RegisterInput) : User!
        login(username: String!, password: String!): User!
        createPost(body: String!, category: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID): Post!
    }
`
