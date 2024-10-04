import { setMessages } from "@/redux/chatSlice";
import { setPosts } from "@/redux/postSlice";
import { useGetAllMessagesQuery } from "@/service";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessage = () => {
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.auth);
    const resMessages = useGetAllMessagesQuery(selectedUser?._id);
    useEffect(() => {
        if(resMessages.isSuccess){
            dispatch(setMessages(resMessages?.data?.data));
        }
        if(resMessages?.isError) {
            console.log(resMessages.error);
        }
    }, [resMessages]);
};
export default useGetAllMessage;