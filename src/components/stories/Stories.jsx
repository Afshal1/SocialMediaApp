import { Box } from '@mui/system';
import Modal from 'antd/es/modal/Modal';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import "./Stories.css";


const stories = [
    {
        id: 1,
        url: "http://localhost:5000/videos/c7b01bab-3eb3-42aa-ba87-79ae4997d2de.mp4"
    },
    {
        id: 2,
        url: "http://localhost:5000/videos/d2506aa3-148a-4c42-8dfa-fbf11b6e8893.mp4"
    }
]


function Stories() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState(null);
    const videoRef = useRef();


    const playVideo = () => {
        videoRef.current.play();
    }
    // const pauseVideo = () => {
    //     videoRef.current.pause();
    // }
    const openStoriesModal = (story) => {
        setModalInfo(story);
        setModalOpen(true);
        setTimeout(() => {
            playVideo();
        }, 500);
    }

    const ModalContent = (props) => {
        console.log(props.story);
        if (modalInfo != null) {
            return (
                <Modal open={isModalOpen} footer={null} closable={false} className="ant-modal-content">
                    <div className='modal-box' onClick={closeStoriesModal}>
                        <Box>
                            <video style={{ width: "100%", height: "100%", boxSizing: "border-box", borderRadius: 8 }} src={props.story.url} ref={videoRef} controls />
                        </Box>
                    </div>
                </Modal>
            );
        }

    }

    const closeStoriesModal = () => {
        setTimeout(() => {
            setModalOpen(false);
        }, 300);

    }

    return (
        <div
            style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", marginTop: 20 }}
        >
            

            {
                stories.map(story => {
                    return (
                        <div
                            style={{
                                width: "10em",
                                height: "15em",
                                borderRadius: 8,
                                boxShadow: "3px 3px 5px 1.5px lightgray",
                                marginLeft: 10,
                                marginRight: 25,
                                position: "relative",
                            }}
                            className="video-component"
                            onClick={() => openStoriesModal(story)}
                            key={story.id}
                        >
                            <video style={{ width: "100%", height: "100%", boxSizing: "border-box", borderRadius: 8 }} className="video" src={story.url} autoPlay muted loop />
                            <span style={{ position: "absolute", left: "37%", top: "87%", color: "whitesmoke", fontWeight: 600, fontSize: 13.5 }} className="video-title">Audi Lifestyle</span>
                        </div>
                    )
                })
            }
            {isModalOpen && <ModalContent story={modalInfo} />}
        </div>
    )
}

export default Stories;