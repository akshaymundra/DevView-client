import RequestCard from "@/components/home/requestCard/RequestCard";
import { useSocket } from "@/context/SocketContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { IModel } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const socket = useSocket();
    const [requestDataList, setRequestDataList] = useState<IModel.interviewRequestInterface[]>([]);
    const { user } = useAuthContext();

    useEffect(() => {
        socket?.on('interview-request', data => {
            console.log(data);
            if (data.success && user?._id !== data.interviewReq.requester) {
                setRequestDataList([data.interviewReq, ...requestDataList]);
            }
        });
    }, [socket]);

    return (
        <div className="text-sky-600 text-2xl">

            <div className={`flex flex-col gap-2`}>
                {requestDataList.map((data, index) => (
                    <RequestCard key={index} data={data} />
                ))}
            </div>

            <Link to={'request-interview'}>Request interview</Link>

        </div>
    )
}

export default Home