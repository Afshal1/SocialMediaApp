import React, { useEffect } from 'react'
import { Layout, Typography, Input, Button } from 'antd'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import useNotifications from '../../helper/useNotifications';
import ProfilePic from "../user/Profile.jpeg"
import "./Header.css";
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetchNotification from '../../services/useFetchNotification';
import { updateNotificationMessage } from '../../redux/actions/NotificationAction';
import { over } from "stompjs";
import SockJS from 'sockjs-client';
import { incrementNotifications, sendNotificationMessage } from '../../redux/actions/NotificationAction';



var stompClient = null;

const { Title } = Typography;
const { Text } = Typography;
const { Search } = Input;
function Header() {

    const receiver = 'afshal'
    const username = localStorage.getItem("username")
    const dispatch = useDispatch();

    const notificationsCount = useSelector(state => state.changeTheNotification);
    const notifications = useSelector(state => state.changeTheNotificationMessage);
   
    
    

    const [handleNotifications] = useNotifications();
    const display = useRef(null);

    const acceptFriendRequest = (notification) => {
        onAcceptFriendRequest();
        dispatch(updateNotificationMessage(notification));
    }


    const onAcceptFriendRequest = () => {
        
        if(stompClient){
            let notification = {
                id: Math.floor(Math.random()),
                notificationSenderName:"arham",
                notification:"Arham accepted your friend request",
                notificationSenderProfilePic: "Profile Pic" ,
                notificationStatus:"Accepted",
                friendRequestReceiver:receiver,
                roomId:"1"
            } 
            stompClient.send('/app/receive-notification',{},JSON.stringify(notification));
        }
    }

    const connectionWithSocket = () => {
        let Sock = new SockJS("http://localhost:5000/ws");
        stompClient = over(Sock);
        stompClient.connect({},onAcceptedRequestConnected,onError);
    
    }


    const onError = (err) => {
        console.log(err);
    }

    const onAcceptedRequestConnected = () => {
        stompClient.subscribe("/user/" + "1" + "/receive/private",onFriendRequestAcceptanceNotificationReceived);
    }

    const onFriendRequestAcceptanceNotificationReceived = (payload) => {
        
        let response = JSON.parse(payload.body);
        if(username == receiver){
            dispatch(incrementNotifications());
            dispatch(sendNotificationMessage(response));
        }
        
    }


    useFetchNotification();

    useEffect(() => {
        connectionWithSocket();
        display.current.style.display = "none";
        console.log(username);
       
    }, []);


    return (
        <Layout className='header-layout'>
            <Title
                level={2}
                style=
                {{
                    marginBottom: "0.8em",
                    fontFamily: "Lato,Poppins,Muli,sans-serif",
                    color: "#008ad3",
                    fontWeight: "bolder"
                }}
                id="title-header"
            >facebook</Title>
            <Search
                style={{ width: "20em" }}
                allowClear
                placeholder="Search"
                enterButton
                className="search-bar"
            />
            <div id='icons-layout'>
                <PersonIcon
                    style={{
                        color: "black",
                        backgroundColor: "#F2F3F5",
                        borderRadius: "100%",
                        padding: "3px",
                        width: 31,
                        height: 31,
                        cursor: "pointer"
                    }} />
                <div
                    style=
                    {{
                        display: "flex",
                        position: "relative",
                        justifyContent: "center",
                        position: "relative",
                        width: 45
                    }}
                >
                    <span
                        style=
                        {{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            fontWeight: 550,
                            backgroundColor: "red",
                            borderRadius: "100%",
                            paddingLeft: 5,
                            paddingRight: 5,
                            fontSize: 11,
                            color: "white"
                        }}
                    >
                        {notificationsCount != 0 ? notificationsCount : null}
                    </span>
                    <NotificationsIcon
                        style={{
                            backgroundColor: "#F2F3F5",
                            borderRadius: "100%",
                            padding: "3px",
                            width: 31,
                            height: 31,
                            cursor: "pointer"
                        }}
                        id="notification-icon"
                        onClick={() => handleNotifications(display)}
                    />

                    <div
                        ref={display}
                        style={{
                            width: 390,
                            height: 550,
                            position: "absolute",
                            border: "0.5px solid #ececec",
                            boxShadow: "3px 3px 5px 1.5px lightgray",
                            zIndex: 5,
                            marginTop: 40,
                            marginRight: 100,
                            background: "white",
                            borderRadius: 8,
                            display: "flex",
                            flexDirection: "column"
                        }}
                        id="notifications"
                    >
                        <h2
                            style=
                            {{
                                fontSize: 29,
                                marginLeft: 20,
                                marginBottom:26,
                                fontWeight: "bolder"
                            }}
                            className="notifications-title"
                        >Notifications</h2>

                        {
                            notifications != 0 ?
                                notifications.map((notification,index) => {

                                    return (

                                        <div
                                            style=
                                            {{
                                                display: "flex",
                                                paddingLeft: 20,
                                                marginTop: 10,
                                                alignItems: "center",
                                                width: "100%",
                                                cursor: "pointer",
                                                position: "relative",
                                                height: 70
                                            }}
                                            key={index}
                                            className="notification-content"
                                        >

                                            <img src={ProfilePic} alt=""
                                                style=
                                                {{
                                                    width: 37,
                                                    height: 37,
                                                    borderRadius: "100%",
                                                    marginRight: 10
                                                }}
                                            />

                                            <Text
                                                style=
                                                {{
                                                    fontSize: 14.5,
                                                    fontWeight: 550,
                                                    color: "#65676b"
                                                }}
                                                className="notification-message"
                                            >{notification.notification}
                                            </Text>
                                            {
                                                notification.notificationStatus == "Pending" ?

                                                    <>
                                                        <Button type='primary'
                                                            style=
                                                            {{
                                                                marginRight: 8,
                                                            }}
                                                            onClick={() => acceptFriendRequest(notification)}
                                                        >Accept</Button>
                                                        <Button color='white' 
                                                        style=
                                                        {{
                                                            marginRight:3.25
                                                        }}
                                                        >Decline</Button>
                                                    </>
                                                    :
                                                    <Button type='primary' disabled
                                                    style=
                                                    {{
                                                        marginLeft:25
                                                    }}
                                                    >
                                                        {notification.notificationStatus}
                                                    </Button>
                                            }
                                        </div>
                                    )
                                }
                                )
                                :
                                null
                        }
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Header