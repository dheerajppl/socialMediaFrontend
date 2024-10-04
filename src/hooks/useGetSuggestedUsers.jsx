import { setSuggestedUsers } from "@/redux/authSlice";
import { useUserSuggestQuery } from "@/service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();
    const resSuggestedUser  = useUserSuggestQuery();
    useEffect(() => {
        if(resSuggestedUser?.isSuccess){
            dispatch(setSuggestedUsers(resSuggestedUser?.data?.data));
        }
        if(resSuggestedUser?.isError){
            console.log(resSuggestedUser);
        }

    },[resSuggestedUser])
};
export default useGetSuggestedUsers;