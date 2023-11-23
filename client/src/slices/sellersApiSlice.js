import { apiSlice } from "./apiSlice";
const SELLERS_URL = '/users';

export const sellersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query:(data) => ({
                url: `${SELLERS_URL}/login`,
                method:'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query:(data) => ({
                url: `${SELLERS_URL}/register`,
                method:'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query:()=>({
                url:`${SELLERS_URL}/logout`,
                method:'POST'
            })
        }),
        

    })
})


export const {useLoginMutation,useLogoutMutation,useRegisterMutation, useUpdateSellerMutation} = sellersApiSlice