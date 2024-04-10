import RoomPeerManage from '@/components/room/peer/RoomPeerManage';
import { useSocket } from '@/context/SocketContext';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Room = () => {
    const { roomId } = useParams();
    const socket = useSocket();
    const { user } = useAuthContext();
    const [hasJoined, setHasJoined] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();

    const handleUserJoined = useCallback((data: any) => {
        console.log(data)
        if (data.success) {
            setAuthorized(true);
            if (data?.usersInRoom?.length > 1) {
                setHasJoined(true);
            }
        }
        else if (!data.success) {
            setAuthorized(false);
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (user) {
            socket?.emit('room:join', { roomId, userId: user._id });
        }
    }, []);

    useEffect(() => {
        socket?.on('room:joined', handleUserJoined);

        return () => {
            socket?.off('room:joined', handleUserJoined);
        }
    }, [socket, handleUserJoined]);


    if (!authorized) {
        return <div>Loadin...</div>
    }

    return (
        <div>
            <div>Room</div>

            {hasJoined
                ?
                <div>
                    someone joind the room
                </div>
                :
                <div>
                    waiting for someone to accept the interview request.
                </div>
            }

            <RoomPeerManage
                roomId={roomId}
                hasJoined={hasJoined}
            />

        </div>
    )
}

export default Room