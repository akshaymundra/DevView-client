
import Button from '@/components/common/buttons/Button'
import { getSkillString } from '@/lib/utils';
import React from 'react'
import { useNavigate } from 'react-router-dom'


const RequestCard: React.FC<any> = ({
    data
}) => {

    const navigate = useNavigate();

    const handleAcceptRequest = () => {
        navigate(`/room/${data.interviewReq.room}`);
    }

    console.log(data);

    return (
        <>
            {data &&
                <div className={`bg-white shadow rounded-xl p-4 text-xs`}>
                    <div className={`flex justify-between`}>
                        <div className={`flex items-center gap-2`}>
                            <div className={`h-3 w-3 rounded-full bg-green-500 mr-2`}></div>
                            <div className={`font-semibold text-lg`}>{data?.user?.fullName}</div>
                        </div>
                    </div>
                    <div className={`text-gray-400 text-xs mt-2`}>
                        {getSkillString(data?.user?.skills)}
                    </div>
                    <p className={`text-gray-500 mt-2`}>
                        {/* <strong>Description: </strong>
                        <br /> */}
                        {data?.interviewReq?.description}
                    </p>
                    <Button
                        varient='success'
                        className='mt-4'
                        onClick={handleAcceptRequest}
                        roundedPill
                    >
                        Accept
                    </Button>
                </div>
            }
        </>
    )
}

export default RequestCard