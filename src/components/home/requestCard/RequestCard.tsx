
import Button from '@/components/common/buttons/Button'
import { IModel } from '@/types'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface dataTypes {
    data: IModel.interviewRequestInterface
}

const RequestCard: React.FC<dataTypes> = ({
    data
}) => {

    const navigate = useNavigate();

    const handleAcceptRequest = () => {
        navigate(`/room/${data.room}`);
    }

    return (
        <div className={`bg-white shadow rounded-xl p-4 text-xs`}>
            <div className={`flex justify-between`}>
                <div className={`flex items-center`}>
                    <div className={`h-3 w-3 rounded-full bg-sky-600 mr-2`}></div>
                    <div className={`font-semibold`}>{data.topic}</div>
                </div>
                <div className={`font-semibold`}>{data.status}</div>
            </div>
            <div className={`text-gray-500 mt-2`}>{data.description}</div>
            <div className={`flex justify-between mt-4`}>
                <div className={`text-gray-500`}>{data.requestedTime}</div>
                <div className={`text-gray-500`}>Room: {data.room}</div>
            </div>
            <Button
                varient='success'
                className='mt-4'
                onClick={handleAcceptRequest}
            >
                Accept
            </Button>
        </div>
    )
}

export default RequestCard