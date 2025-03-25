"use client"
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { GenerateChapterContentAI } from '@/configs/AiModel';
import LoadingDialog from '../_components/LoadingDialog';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';


function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  useEffect(() => {
    params && GetCourse();
  }, [params, user])
  const GetCourse = async () => {
    const result = await db.select().from(CourseList).where(and(eq(CourseList.courseId, params?.courseId), eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))
    setCourse(result[0]);
    console.log(result);
  }

  const GenerateChapterLayout = () => {
    setLoading(true);
    const chapters = course?.courseOutout?.chapters;
    chapters.forEach(async (chapters, index) => {
      const PROMPT = 'Explain the concept in Detail on Topic: ' + course?.name + ', Chapter: ' + chapters?.chapterName + ', in JSON Format with list of array with field as title, describe the detail, Code Example(Code field in <precode> format) if applicable';
      console.log(PROMPT)
      // if (index < 3) {
        try {
          let videoId='';
          // Generate Video URL
          service.getVideos(course?.name+':'+chapters?.chapterName).then(resp=>{
            console.log(resp);
            videoId=resp[0]?.id?.videoId;
          })
          //generate Chapter Content
          const result = await GenerateChapterContentAI.sendMessage(PROMPT);
          console.log(result?.response?.text());
          const content = JSON.parse(result?.response?.text());


          //save Chapter Content + video URL
          await db.insert(Chapters).values({
            chapterId: index,
            courseId: course?.courseId,
            content: content,
            videoId: videoId
          })
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
        await db.update(CourseList).set({
          publish: true
        })
        router.replace('/create-course/'+course?.courseId+'/finish');
      //}
    })
  }
  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
      <LoadingDialog loading={loading} />
      {/**Basic Info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      {/**Course Detail */}
      <CourseDetail course={course} />
      {/**List of Lessons */}
      <ChapterList course={course} refreshData={() => GetCourse()} />
      <Button className='my-10' onClick={GenerateChapterLayout}>Generate Course</Button>
    </div>
  )
}

export default CourseLayout