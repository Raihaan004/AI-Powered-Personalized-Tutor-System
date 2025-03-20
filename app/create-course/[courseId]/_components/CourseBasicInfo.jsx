import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from './EditCourseBasicInfo';
function CourseBasicInfo({ course ,refreshData}) {
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h2 className='font-bold text-3xl'>{course?.courseOutout?.courseName} <EditCourseBasicInfo course={course} refreshData={()=>refreshData(true)}/></h2>
          <p className='text-sm text-gray-400 mt-3'>{course?.courseOutout?.description}</p>
          <div>
            <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><HiOutlinePuzzle />{course?.courseOutout?.category}</h2>
            <Button className='w-full mt-5'>Start</Button>
          </div>
        </div>
        <div>
          <Image src={'/placeholder.png'} width={300} height={300} className='w-full rounded-xl h-[250px] object-cover' alt='image not working'/>
        </div>
      </div>
      
    </div>
  )
}

export default CourseBasicInfo