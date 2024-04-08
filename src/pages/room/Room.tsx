import { useSocket } from '@/context/SocketContext';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Room = () => {
    const { roomId } = useParams();
    const socket = useSocket();
    const { user } = useAuthContext();
    const [hasJoined, setHasJoined] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            socket?.emit('room:join', { roomId, userId: user._id });
        }
    }, []);

    useEffect(() => {
        socket?.on('room:joined', (data: any) => {
            console.log(data);
            if (data.success && data?.usersInRoom?.length > 1) {
                setHasJoined(true);
                // perform some action here
            }
            else if (!data.success) {
                navigate('/');
            }
        });
    }, [socket])


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

        </div>
    )
}

export default Room