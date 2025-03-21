import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/configs/firebaseConfig';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
function CourseBasicInfo({ course ,refreshData}) {
  const [selectedFile,setSelectedFile]=useState();

  useEffect(()=>{
    if(course){
      setSelectedFile(course?.courseBanner);
    }
  },[course])

  /**
   * 
   * @param {*} event 
   */
  const onFileSelected=async(event)=>{
    const file=event.target.files[0];
    console.log(file);
    setSelectedFile(URL.createObjectURL(file));
    const fileName=Date.now()+'jpg';
    const storageRef=ref(storage,fileName);
    await uploadBytes(storageRef,file).then((snapshot)=>{
      console.log('upload file complete');
    }).then(resp=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(storageRef);
        await db.update(CourseList).set({
          courseBanner:downloadUrl
        }).where(eq(CourseList.id,course?.id))
      })
    })
  }

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
          <label htmlFor='upload-image'>
          <Image src={selectedFile?selectedFile:'/placeholder.png'} width={300} height={300} className='w-full rounded-xl h-[250px] object-cover cursor-pointer' alt='image not working'/>
          </label>
          <input type='file' id='upload-image'className='opacity-0' onChange={onFileSelected} />
        </div>
      </div>
      
    </div>
  )
}

export default CourseBasicInfo