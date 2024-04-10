import { useEffect, useRef, useState } from "react";
import Peer, { MediaConnection } from 'peerjs';
import { useSocket } from "@/context/SocketContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";


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

        socket?.on('room:peer-disconnect', () => {
            if (remoteVideoRef.current?.srcObject) {
                let stream = remoteVideoRef.current.srcObject as MediaStream;
                let tracks = stream.getTracks();
                tracks.map(track => track.stop());
                remoteVideoRef.current.srcObject = null;
            }
            if (currentUserVideoRef.current?.srcObject) {
                let stream = currentUserVideoRef.current.srcObject as MediaStream;
                let tracks = stream.getTracks();
                tracks.map(track => track.stop());
                currentUserVideoRef.current.srcObject = null;
            }
            navigate('/');
        })

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
    const handleCallEnd = () => {
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
            tracks.forEach((track) => track.stop());
            currentUserVideoRef.current.srcObject = null;
        }

        if (remoteVideoRef.current?.srcObject) {
            let stream = remoteVideoRef.current.srcObject as MediaStream;
            let tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            remoteVideoRef.current.srcObject = null;
        }

        socket?.emit('room:peer-disconnect', { roomId, peerId });

        navigate('/');

    };


    return (
        <div className="">
            <h1>Current user id is {peerId}</h1>
            <div className="flex gap-2">
                <div>
                    you
                    <video height={100} width={200} ref={currentUserVideoRef} />
                </div>
                <div>
                    remote video
                    <video height={100} width={200} ref={remoteVideoRef} />
                </div>
            </div>
            {currentCall &&
                <button
                    onClick={handleCallEnd}
                >
                    End Call
                </button>
            }
        </div>
    );
};

export default RoomPeerManage;