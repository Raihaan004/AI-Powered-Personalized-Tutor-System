"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'

function UserCourseList() {
  const [courseList,setCourseList] = useState();
  const {userCourseList,setUserCourseList} = useContext(UserCourseListContext);
  const {user} = useUser();

  useEffect(()=>{
    user && getuserCourses();
  },[user])

  const getuserCourses = async() => {
    const result = await db.select().from(CourseList)
    .where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
    setCourseList(result);
    setUserCourseList(result);
  }

  return (
    <div className='my-10'>
      <h2 className='font-bold text-lg'>My AI Courses</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList?.length>0?courseList?.map((course, index)=>(
          <CourseCard course={course} key={index} refreshData={()=>getuserCourses()}/>
        )):
        
          [1,2,3,4,5].map((item,index)=>(
            <div key={index} className='w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]'>

            </div>
          ))
        
        }
      </div>
    </div>
  )
}

export default UserCourseList