"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import { Button } from '@/components/ui/button';

function explore() {
  const [courseList,setCourseList]=useState([]);
  const[pageIndex,setPageIndex]=useState(0);
  useEffect(()=>{
    getAllCourse();
    
  },[pageIndex])
  const getAllCourse=async()=>{
    const result = await db.select().from(CourseList).limit(9).offset(pageIndex*9);
    setCourseList(result);
    console.log(result);
  }
  return (
    <div>
      <h2 className='font-bold text-3xl'>Explore more projects</h2>
      <p>Explore more project build with AI by others users</p>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList?.map((course,index)=>(
          <div>
            <CourseCard course={course} displayUser={true}/>
          </div>
        ))}
      </div>
      <div className='flex justify-between mt-5'>
      {pageIndex != 0&& <Button onClick={()=>setPageIndex(pageIndex-1)}>Previous Page</Button>}
      <Button onClick={()=>setPageIndex(pageIndex+1)}>Next Page</Button>
      </div>
    </div>
  )
}

export default explore