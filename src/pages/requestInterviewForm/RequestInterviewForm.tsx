import Button from '@/components/common/buttons/Button'
import StyledInput from '@/components/common/inputFields/StyledInput'
import { useSocket } from '@/context/SocketContext'
import { HttpService } from '@/services'
import { IModel } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const RequestInterviewForm: React.FC = () => {
  const http = new HttpService();
  const { handleSubmit, register, formState: { errors } } = useForm<IModel.InterviewRequestData>({ resolver: zodResolver(IModel.InterviewRequestSchema) });
  // const socket = useSocket();
  const navigate = useNavigate();

  const onSubmit = async (data: IModel.InterviewRequestData) => {
    try {
      const response = await http.service(true).push<any, IModel.InterviewRequestData>('/interview/request', data);

      if (response.success) {
        const roomId = response.interviewReq.room;
        navigate(`/room/${roomId}`);
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <StyledInput
            label='Topic'
            name='topic'
            type='text'
            register={register}
            error={errors.topic}
            placeholder='Enter the topic for interview'
            required
          />

          <StyledInput
            label='Description'
            name='description'
            type='text'
            register={register}
            error={errors.description}
            placeholder='Enter the description for interview'
            required
          />

          <Button
            varient='primary'
            type='submit'
          >
            Request Interview
          </Button>

        </form>
      </div>
    </div>
  )
}

export default RequestInterviewForm