import React from 'react'
import { Card,Divider,Typography } from 'antd'
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import "../posts/Post.css";

const { Text } =Typography;
function WhatsOnMind() {
  return (
    <Card
    style={{
     
        border:"1px solid #ececec", 
        boxShadow:"3px 3px 5px 1.5px lightgray",
        borderRadius:8
    }}
    className="what-on-mind-card"
    >
        <p style={{ color: "gray" }}><input style={{border:"none",margin:0,outline:"none"}} placeholder='Whats on your mind' id='whats-on-mind' /></p>
        <Divider plain={true} />
        <div style={{display:"flex", flexDirection:"row" ,justifyContent:"space-evenly"}}>
        <div
            style=
            {{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width:80,
                cursor:"pointer"
            }}>
            
                <PersonalVideoIcon style={{width:20,color:"red"}}/><Text style={{fontWeight:600}}>Video</Text>
      
        </div>
        <div
            style=
            {{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width:80,
                cursor:"pointer"
            }}>
            
                <InsertPhotoIcon style={{width:20,color:"green"}}/><Text style={{fontWeight:600}}>Photo</Text>
      
        </div>
        <div
            style=
            {{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width:120,
                cursor:"pointer"
            }}>
            
                <EmojiEmotionsIcon style={{width:20,color:"gold"}}/><Text style={{fontWeight:600}}>Feeling Activity</Text>
      
        </div>
        </div>

    </Card>
  )
}

export default WhatsOnMind