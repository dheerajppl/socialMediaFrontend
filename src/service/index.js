import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const baseUrl = 'http://localhost:5097/api';

export const authAPi = createApi({
    tagTypes: ["auth"],
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/`
    }),
    endpoints: (builder) => ({
        loginAuth: builder.mutation({
            query: (payload) => ({
                url: '/user/login',
                method: 'POST',
                body: payload
             }),
        invalidatesTags: ["auth"],
        }),
        registerAuth: builder.mutation({
            query: (payload) => ({
                url: '/user/register',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ["auth"],    
        }),
        logoutAuth: builder.mutation({
            query: (payload) => ({
                url: '/user/logout',
                method: 'POST',
                body: payload
            }),  
            invalidatesTags: ["auth"],
        }),
    }),
});
export const { 
    useLoginAuthMutation, 
    useRegisterAuthMutation,
    useLogoutAuthMutation
} = authAPi;

export const userApi =createApi({
    tagTypes: ["user"],
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/`,
        prepareHeaders: (headers, { getState }) => {
            if(getState()?.auth?.userToken){
                headers.set('Authorization',  getState()?.auth?.userToken);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        userSuggest: builder.query({
            query: () => ({
                url: '/user/suggested',
                method: 'GET'
            }),
            providesTags: ["user"],
        }),
        getProfile: builder.query({
            query: (id) => ({
                url: `/user/profile/${id}`,
                method: 'GET'
            }),
            providesTags: ["user"],
        }),
        editProfile: builder.mutation({
            query: (payload) => ({
                url: '/user/profile/edit',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ["user"],
        }),
        userFollowOrUnzfollow: builder.query({
            query: (id) => ({
                url: `/user/followorunfollow${id}`,
                method: 'GET'
            }),
            providesTags: ["user"],
        }),

    }),                    
})
export const {
    useUserSuggestQuery,
    useGetProfileQuery,
    useEditProfileMutation,
    useUserFollowOrUnzfollowQuery
} = userApi;

export const postApi =createApi({
    tagTypes: ["post"],
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/`,
        prepareHeaders: (headers, { getState }) => {
            if(getState()?.auth?.userToken){
                headers.set('Authorization',  getState()?.auth?.userToken);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (payload) => ({
                url: '/post/create',
                method: 'POST',
                body: payload
            }),
            providesTags: ["post"],
        }),
        getAllPosts: builder.mutation({
            query: (payload) => ({
                url: '/post',
                method: 'POST',
                body: payload,
            }),
            providesTags: ["post"],
        }),
        getPosts: builder.mutation({
            query: (payload) => ({
                url: '/post/list',
                method: 'POST',
                body: payload,
            }),
            providesTags: ["post"],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/post/${id}`,
                method: 'DELETE',
            }),
            providesTags: ["post"],
        }),
        toogleLike: builder.query({
            query: ({action,id}) => ({
                url: `/post/${action}/${id}`,
                method: 'GET',
                }),
            providesTags: ["post"],
        }),
        createComment: builder.mutation({
            query: (payload) => ({
                url: '/comment/create',
                method: 'POST',
                body: payload
                }),
            providesTags: ["post"],
        }),
        getComment: builder.query({
            query: (id) => ({
                url: `/comment/list/${id}`,
                method: 'GET',
                body: payload
                }),
            providesTags: ["post"],
        }),
        postBookmarks: builder.query({
            query: (id) => ({
                url: `/post/bookmarks/${id}`,
                method: 'GET',
            }),
            providesTags: ["post"],
        })
    }),                    
})
export const {
    useCreatePostMutation,
    useGetAllPostsMutation,
    useGetPostsMutation,
    useDeletePostMutation,
    useToogleLikeQuery,
    useCreateCommentMutation,
    useGetCommentQuery,
    usePostBookmarksQuery,
} = postApi;

export const messageApi =createApi({
    tagTypes: ["message"],
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/`,
        prepareHeaders: (headers, { getState }) => {
            if(getState()?.auth?.userToken){
                headers.set('Authorization',  getState()?.auth?.userToken);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllMessages: builder.query({
            query: (id) => ({
                url: `/message/all/${id}`,
                method: 'GET'
            }),
            providesTags: ["message"],
        }),
        sendMessages: builder.mutation({
            query: ({payload,id}) => ({
                url: `/message/send/${id}`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ["message"],
        }),

    }),                    
})
export const {
    useGetAllMessagesQuery,
    useSendMessagesMutation
} = messageApi;

