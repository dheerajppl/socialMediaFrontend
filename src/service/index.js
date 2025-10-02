import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const baseUrl = 'http://localhost:5000/api';

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

export const userApi = createApi({
    tagTypes: ["user"],
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/`,
        prepareHeaders: (headers, { getState }) => {
            if (getState()?.auth?.userToken) {
                headers.set('Authorization', getState()?.auth?.userToken);
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

export const postApi = createApi({
    tagTypes: ["post"],
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/`,
        prepareHeaders: (headers, { getState }) => {
            if (getState()?.auth?.userToken) {
                headers.set('Authorization', getState()?.auth?.userToken);
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
        toogleLike: builder.mutation({
            query: ({ action, id }) => ({
                url: `/post/${action}/${id}`,
                method: 'POST',
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
        postBookmarks: builder.mutation({
            query: (id) => ({
                url: `/post/bookmarks/${id}`,
                method: 'POST',
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
    useToogleLikeMutation,
    useCreateCommentMutation,
    useGetCommentQuery,
    usePostBookmarksMutation,
} = postApi;

export const messageApi = createApi({
    tagTypes: ["message"],
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/`,
        prepareHeaders: (headers, { getState }) => {
            if (getState()?.auth?.userToken) {
                headers.set('Authorization', getState()?.auth?.userToken);
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
            query: ({ payload, id }) => ({
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

export const fileApi = createApi({
    tagTypes: ["file"],
    reducerPath: "fileApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/`,
        prepareHeaders: (headers, { getState }) => {
            if (getState()?.auth?.userToken) {
                headers.set('Authorization', getState()?.auth?.userToken);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getPreSignedUrl: builder.query({
            query: ({ fileName, fileType, fileSize, folderName }) => ({
                url: `/file/generate-presigned-url?fileName=${fileName}&fileType=${fileType}&fileSize=${fileSize}&folderName=${folderName}`,
                method: "GET",
            }),
        }),
        uploadToS3: builder.mutation({
            async queryFn({ uploadUrl, file }) {
                try {
                    const res = await fetch(uploadUrl, {
                        method: "PUT",
                        body: file,
                        headers: { "Content-Type": file.type },
                    });

                    if (!res.ok) {
                        return {
                            error: {
                                status: "CUSTOM_ERROR",
                                data: await res.text(),
                            }
                        };
                    }

                    return { data: undefined };
                } catch (err) {
                    return {
                        error: {
                            status: "CUSTOM_ERROR",
                            data: err,
                        }
                    };
                }
            },
        }),

        deleteFile: builder.mutation({
            query: ({ fileId }) => ({
                url: `/file/delete/${fileId}`,
                method: "DELETE",
            }),
        }),
        getFile: builder.query({
            query: ({ fileId }) => ({
                url: `/file/get/${fileId}`,
                method: "GET",
            }),
        }),
        uploadImage: builder.mutation({
            query: (data) => ({
                url: "/file/add-img",
                method: "POST",
                body: data,
            }),
        }),
        uploadImageMultiple: builder.mutation({
            query: (data) => ({
                url: "/file/add-multiple-img",
                method: "POST",
                body: data,
            }),
        }),
        deleteCloudinaryImg: ({
            query({ folder_name, id }) {
                return {
                    url: `/file/img-delete?folder_name=${folder_name}&id=${id}`,
                    method: "DELETE",
                };
            },
        }),
    }),

})
export const {
    useLazyGetPreSignedUrlQuery,
    useUploadToS3Mutation,
    useDeleteFileMutation,
    useDeleteCloudinaryImgMutation,
    useLazyGetFileQuery,
    useUploadImageMutation,
    useUploadImageMultipleMutation,
} = fileApi;

