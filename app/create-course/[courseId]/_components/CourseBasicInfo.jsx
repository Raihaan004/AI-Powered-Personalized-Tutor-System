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
import Link from 'next/link';
function CourseBasicInfo({ course ,refreshData, edit=true}) {
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
          <h2 className='font-bold text-3xl'>{course?.courseOutout?.courseName}{edit&& <EditCourseBasicInfo course={course} refreshData={()=>refreshData(true)}/>}</h2>
          <p className='text-sm text-gray-400 mt-3'>{course?.courseOutout?.description}</p>
          <div>
            <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><HiOutlinePuzzle />{course?.courseOutout?.category}</h2>
            {!edit && <Link href={'/course/'+course?.courseId+'/start'}>
            <Button className='w-full mt-5'>Start</Button></Link>}
          </div>
        </div>
        <div className="relative">
  <label htmlFor='upload-image' className="block relative">
    <Image 
      src={[
        '/gradient-1.gif',
        '/gradient-2.gif',
        '/gradient-3.gif',
        '/gradient-4.gif',
      ][Math.floor(Math.random() * 4)]} 
      width={300} 
      height={300} 
      className='w-full rounded-xl h-[250px] object-cover cursor-pointer' 
      alt='Random gradient image'
    />
    
    {/* Overlay for the quote */}
    <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
      {(() => {
        const quotes = [
          {
            text: "Education is the most powerful weapon which you can use to change the world.",
            author: "Nelson Mandela",
            color: "white"
          },
          {
            text: "The beautiful thing about learning is that no one can take it away from you.",
            author: "B.B. King",
            color: "white"
          },
          {
            text: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.",
            author: "Pelé",
            color: "white"
          },
          {
            text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
            author: "Mahatma Gandhi",
            color: "white"
          },
          {
            text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
            author: "Dr. Seuss",
            color: "white"
          },
          {
            text: "Education is the most powerful weapon which you can use to change the world.",
            author: "Nelson Mandela",
            color: "white"
          },
          {
            text: "The beautiful thing about learning is that no one can take it away from you.",
            author: "B.B. King",
            color: "white"
          },
          {
            text: "An investment in knowledge pays the best interest.",
            author: "Benjamin Franklin",
            color: "white"
          },
          {
            text: "Education is not the learning of facts, but the training of the mind to think.",
            author: "Albert Einstein",
            color: "white"
          },
          {
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill",
            color: "white"
          },
          {
            text: "Do what you can, with what you have, where you are.",
            author: "Theodore Roosevelt",
            color: "white"
          },
          {
            text: "Don’t watch the clock; do what it does. Keep going.",
            author: "Sam Levenson",
            color: "white"
          },
          {
            text: "The only limit to our realization of tomorrow is our doubts of today",
            author: "Franklin D. Roosevelt",
            color: "white"
          },
          {
            text: "Your future is created by what you do today, not tomorrow.",
            author: "Robert Kiyosaki",
            color: "white"
          },
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        return (
          <div className={`bg-black bg-opacity-50 rounded-xl p-4 max-w-[90%]`}>
            <p className={`text-lg italic text-${randomQuote.color} drop-shadow-md`}>
              "{randomQuote.text}"
            </p>
            <footer className={`mt-2 text-sm text-${randomQuote.color} font-medium`}>
              — {randomQuote.author}
            </footer>
          </div>
        );
      })()}
    </div>
  </label>
  
  {edit && <input type='file' id='upload-image' className='opacity-0 absolute' onChange={onFileSelected} />}
</div>
      </div>
      
    </div>
  )
}

export default CourseBasicInfo