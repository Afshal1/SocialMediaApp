import React , { useEffect } from 'react'
import { Layout, Typography } from "antd";
import ProfilePic from "./Profile.jpeg"
import "./User.css";
import WhatsOnMind from '../whatsOnMind/WhatsOnMind';
import UserInfo from './UserInfo';
import PostsFeed from '../posts/PostsFeed';
import usePostOfUserWithFriends from '../../services/usePostsOfUserWithFriends';
import { usePost } from '../../hooks/context/PostContext';


const { Title } = Typography;
const { Text } = Typography;
function User() {

    
    const [ fetchPostsOfUserWithFriends ] = usePostOfUserWithFriends();
    const { value } = usePost();
    const [ posts, setPosts] = value;


    const email = "afshal@gmail.com";
  
    useEffect( () => {
  
      fetchPostsOfUserWithFriends(email);
  
    },[]);

    return (
        <Layout className='user-layout'>
            <div
                style=
                {{
                    border: "1px solid red",
                    height: "15rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position: "relative"
                }}>
                <img style={{ border: "1px solid black", width: "100%", height: "100%" }} />
                <img src={ProfilePic} style=
                    {{
                        border: "1px solid yellow",
                        height: 150, width: 150,
                        boxSizing: "border-box",
                        borderRadius: "100%",
                        position: "absolute",
                        top: 150
                    }} />

            </div>
            <div style=
                {{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <Title level={3} style={{ marginTop: 75 }}>Afshal Hassan</Title>
                <Text
                    style=
                    {{
                        fontFamily: "Lato,Poppins,Muli,sans-serif",
                        fontWeight: 550,
                        color: "gray"
                    }}>
                    55 Friends</Text>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginTop:50,border:"1px solid red"}}>
               <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly",width:"100%",}}>
                <WhatsOnMind/>
                <UserInfo/>
                </div>
                {posts.map((post,index) => {
                return(
                   post.userEmail=="afshal@gmail.com" ? <PostsFeed image={post.postImage} description={post.postDescription} creator={post.userEmail} createdDate={post.createdAt} likes={post.likes} hearts={post.hearts} key={index}/>
                   :
                   null
                );
            })}
            </div>
        </Layout>
    )
}

export default User