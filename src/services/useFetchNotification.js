import axios from "axios";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { fetchNotificationsApiUrl } from "../apis/apiUrls";
import { sendNotificationMessage } from "../redux/actions/NotificationAction";
import { persistedStore } from "../store";
import { changeTheNotificationMessage } from "../redux/reducers/NotificationReducer";
import { useSelector } from "react-redux";


const useFetchNotification = () => {
    
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.changeTheNotificationMessage);
    //
    const email = localStorage.getItem("email")

    const fetchNotificationsOfUser = useCallback(async(userEmail) => {
        const { data } = await axios.get(fetchNotificationsApiUrl(userEmail));
        data.map(notification => dispatch(sendNotificationMessage(notification)));
    },[])

    useEffect(() => {
        if (!notifications.length) {
            fetchNotificationsOfUser(email);
        }
    }, [fetchNotificationsOfUser, email, notifications.length]);


    
    
   
};


export default useFetchNotification;