import { useEffect, useRef, useState } from "react";
import Style from "./RoomPeerManage.module.css";
import Peer, { MediaConnection } from 'peerjs';
import { useSocket } from "@/context/SocketContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/buttons/Button";
import { MdCallEnd } from "react-icons/md";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { FaVideoSlash } from "react-icons/fa6";


interface RoomPeerManageProps {
    hasJoined: boolean;
    roomId?: string;
}

const RoomPeerManage: React.FC<RoomPeerManageProps> = ({
    hasJoined,
    roomId
}) => {
    const socket = useSocket();
    const { user } = useAuthContext();
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const currentUserVideoRef = useRef<HTMLVideoElement>(null);
    const peerInstance = useRef<Peer | null>(null);
    const [currentCall, setCurrentCall] = useState<MediaConnection | null>(null);
    const navigate = useNavigate();

    // user control 
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);


    // set up the peer connection on component mount 
    useEffect(() => {
        const peer = new Peer();
        let stream: MediaStream | null = null;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(userStream => {
                stream = userStream;

                if (currentUserVideoRef.current) {
                    currentUserVideoRef.current.srcObject = stream;
                    currentUserVideoRef.current.play();
                    currentUserVideoRef.current.muted = true;
                }
            }).catch(err => console.log(err));

        peer.on('open', (id) => {
            setPeerId(id);
            socket?.emit('room:peer-connect', { roomId, peerId: id, userId: user?._id })
        });

        peerInstance.current = peer;

        return () => {
            if (peerInstance.current) {
                peerInstance.current.destroy();
            }
        }
    }, []);


    // listen to the call when the remote peer call the current peer
    useEffect(() => {
        // listening for call from remote peer
        const peer = peerInstance.current;
        if (hasJoined && peer && currentUserVideoRef.current?.srcObject) {
            let stream = currentUserVideoRef.current.srcObject as MediaStream;
            peer.on('call', call => {
                if (stream) {
                    call.answer(stream);
                    setCurrentCall(call);

                    call.on('stream', remoteStream => {
                        if (remoteVideoRef.current && remoteStream) {
                            remoteVideoRef.current.srcObject = remoteStream;
                            remoteVideoRef.current.play();
                        }
                    });
                }
            })
        }
    }, [hasJoined, peerId, currentUserVideoRef])

    // this effect listens to the socket 
    useEffect(() => {
        socket?.on('room:peer-connect', (data: any) => {
            const peerList = data.peerList;
            peerList.map((obj: any) => {
                if (obj.userId !== user?._id) setRemotePeerIdValue(obj.peerId);
            });
        });

        socket?.on('room:peer-disconnect', () => handleCallEnd(true));

    }, [socket]);

    // call the remote peer 
    useEffect(() => {
        if (peerId && hasJoined && peerInstance.current && remotePeerIdValue && remotePeerIdValue !== peerId) {
            const peer = peerInstance.current;
            console.log('calling remote peer')
            if (currentUserVideoRef.current?.srcObject) {
                let currentCall = peer?.call(remotePeerIdValue, currentUserVideoRef.current.srcObject as MediaStream);
                setCurrentCall(currentCall);
            }
        }
    }, [peerId, hasJoined, remotePeerIdValue]);

    // end the call and clean up the resources
    const handleCallEnd = (onRemote = false) => {
        if (currentCall) {
            currentCall.close();
            setCurrentCall(null);
        }

        if (peerInstance.current) {
            peerInstance.current.disconnect();
            peerInstance.current.destroy();
        }

        if (currentUserVideoRef.current?.srcObject) {
            let stream = currentUserVideoRef.current.srcObject as MediaStream;
            let tracks = stream.getTracks();
            tracks.forEach((track) => track.enabled = false);
            // tracks.forEach((track) => track.stop());
            currentUserVideoRef.current.srcObject = null;
        }

        if (remoteVideoRef.current?.srcObject) {
            let stream = remoteVideoRef.current.srcObject as MediaStream;
            let tracks = stream.getTracks();
            tracks.forEach((track) => track.enabled = false);
            // tracks.forEach((track) => track.stop());
            remoteVideoRef.current.srcObject = null;
        }
        if (!onRemote) {
            socket?.emit('room:peer-disconnect', { roomId, peerId });
        }
        navigate('/');
    };

    // handle controls 
    // handle controls 
    const handleVideoToggle = () => {
        if (currentUserVideoRef.current?.srcObject) {
            let stream = currentUserVideoRef.current.srcObject as MediaStream;
            let videoTracks = stream.getVideoTracks();
            videoTracks.forEach((track) => track.enabled = !track.enabled);
            setIsVideoOff(!isVideoOff);
        }
    }

    const handleMuteToggle = () => {
        if (currentUserVideoRef.current?.srcObject) {
            let stream = currentUserVideoRef.current.srcObject as MediaStream;
            let audioTracks = stream.getAudioTracks();
            audioTracks.forEach((track) => track.enabled = !track.enabled);
            setIsMuted(!isMuted);
        }
    }

    return (
        <div className={`${Style.container}`}>
            <div className={`h-full w-full p-4`} >
                <div className={`${Style.video_container} relative`}>

                    <div className={`absolute bottom-0 right-0 rounded-lg`}>
                        <video className={`${Style.my_video}`} ref={currentUserVideoRef} />
                    </div>

                    {hasJoined ?
                        <video className={`${Style.remote_video}`} ref={remoteVideoRef} />
                        :
                        <p
                            className={`text-center text-white text-lg`}
                        >Waiting for someone to join...</p>
                    }
                </div>
                <div className={`${Style.actions_container}`}>
                    <Button
                        onClick={() => handleCallEnd(false)}
                        varient="danger"
                        roundedFull
                        iconButton
                    >
                        <MdCallEnd style={{ color: "white", fontSize: '1.2rem' }} />
                    </Button>
                    <Button
                        onClick={handleMuteToggle}
                        varient="danger"
                        roundedFull
                        iconButton
                    >
                        {isMuted ?
                            <FaMicrophoneSlash
                                style={{ color: "white", fontSize: '1.2rem' }}
                            />
                            :
                            <FaMicrophone
                                style={{ color: "white", fontSize: '1.2rem' }}
                            />
                        }
                    </Button>
                    <Button
                        onClick={handleVideoToggle}
                        varient="danger"
                        roundedFull
                        iconButton
                    >
                        {isVideoOff ?
                            <FaVideoSlash
                                style={{ color: "white", fontSize: '1.2rem' }}
                            />
                            :
                            <FaVideo
                                style={{ color: "white", fontSize: '1.2rem' }}
                            />
                        }
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default RoomPeerManage;