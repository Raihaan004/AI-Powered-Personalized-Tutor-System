"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'

function UserCourseList() {
  const [courseList,setCourseList] = useState();
  const {user} = useUser();

  useEffect(()=>{
    user && getuserCourses();
  },[user])

  const getuserCourses = async() => {
    const result = await db.select().from(CourseList)
    .where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
    setCourseList(result);
  }

  return (
    <div className='my-10'>
      <h2 className='font-bold text-lg'>My AI Courses</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList?.map((course, index)=>(
          <CourseCard course={course} key={index} refreshData={()=>getuserCourses()}/>
        ))}
      </div>
    </div>
  )
}

export default UserCourseList