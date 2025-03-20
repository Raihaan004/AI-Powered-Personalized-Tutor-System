import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function EditChapters({course,index,refreshData}) {
    const Chapters=course?.courseOutout?.chapters;
    const [chapterName,setChapterName]=useState();
    const [about,setAbout]=useState();
    useEffect(()=>{
        setChapterName(Chapters[index].chapterName);
        setAbout(Chapters[index].about);
    },[course])
    const onUpdatehandler=async()=>{
        course.courseOutout.chapters[index].chapterName=chapterName;
        course.courseOutout.chapters[index].about=about;
        const result = await db.update(CourseList).set({
            courseOutout: course.courseOutout
        }).where(eq(CourseList?.id, course?.id))
        .returning({ id: CourseList.id })
        console.log(result);
        refreshData(true);
    }
    return (
        <Dialog>
            <DialogTrigger><HiPencilSquare /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapter</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input defaultValue={Chapters[index].chapterName} onChange={(event) => setChapterName(event?.target.value)} />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea className='w-full h-40 mt-1 border rounded p-2' rows="4" defaultValue={Chapters[index].about} onChange={(event) => setAbout(event?.target.value)} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onUpdatehandler}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default EditChapters