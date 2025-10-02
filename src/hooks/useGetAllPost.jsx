import { setPosts } from "@/redux/postSlice";
import { useGetAllPostsMutation } from "@/service";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetAllPost = () => {
    const dispatch = useDispatch();
    const [ reqPost, resPost ] = useGetAllPostsMutation()
    useEffect(() => {
        reqPost();
    }, []);
    useEffect(() => {
        if(resPost?.isSuccess){
            console.log("resPost", resPost?.data?.data)
            dispatch(setPosts(resPost?.data?.data));
        }
        if(resPost?.isError){
            console.log(resPost?.error?.message);
        }

    },[resPost])
};
export default useGetAllPost;