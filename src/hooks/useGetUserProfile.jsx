import { setUserProfile } from "@/redux/authSlice";
import { useGetProfileQuery } from "@/service";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    const resProfile = useGetProfileQuery(userId);
    // const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        if(resProfile?.isSuccess) {
            dispatch(setUserProfile(resProfile?.data?.data));
        }
        if(resProfile?.isError){
            console.log(resProfile?.error);
        }
    }, [resProfile]);
};
export default useGetUserProfile;