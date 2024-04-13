import RequestCard from "@/components/home/requestCard/RequestCard";
import { useSocket } from "@/context/SocketContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { IModel } from "@/types";
import { useEffect, useState } from "react";

const Home = () => {

    const socket = useSocket();
    const [requestDataList, setRequestDataList] = useState<IModel.interviewRequestInterface[]>([]);
    const { user, dispatch } = useAuthContext();

    useEffect(() => {
        socket?.on('interview-request', data => {
            console.log(data);
            if (data.success && user?._id !== data.interviewReq.requester) {
                setRequestDataList([data, ...requestDataList]);
            }
        });

        socket?.on('room:clear-interview', data => {
            // console.log(data);
            setRequestDataList(requestDataList.filter(req => req.room !== data.roomId));
        });
    }, [socket]);

    return (
        <div className="">

            <div className={`flex flex-col gap-2`}>
                {requestDataList.map((data, index) => (
                    <RequestCard key={index} data={data} />
                ))}
            </div>

            <br />
            <button
                onClick={() => dispatch({ type: "LOGOUT" })}
            >
                logout
            </button>

        </div>
    )
}

export default Home