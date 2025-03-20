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
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';


function EditCourseBasicInfo({ course }) {
    const [courseName, setCourseName] = useState();
    const [description, setDescription] = useState();
    useEffect(() => {
        setCourseName(course?.courseOutout?.courseName);
        setDescription(course?.courseOutout?.description);
    }, [course])


    const onUpdatehandler = async () => {
        course.courseOutout.courseName = courseName;
        course.courseOutout.description = description;
        const result = await db.update(CourseList).set({
            courseOutout: course.courseOutout
        }).where(eq(CourseList?.id, course?.id))
            .returning({ id: CourseList.id })
        console.log(result);
    }

    return (
        <Dialog>
            <DialogTrigger><HiPencilSquare /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course Title & Description</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input defaultValue={course?.courseOutout?.courseName} onChange={(event) => setCourseName(event?.target.value)} />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea className='w-full h-40 mt-1 border rounded p-2' rows="4" defaultValue={course?.courseOutout?.description} onChange={(event) => setDescription(event?.target.value)} />
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

export default EditCourseBasicInfo