import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '@/app/_context/UserInputContext';


function SelectOption() {
      const {userCourseInput, setUserCourseInput}=useContext(UserInputContext);
      const handleInputChange=(fieldName,value)=>{
        setUserCourseInput(prev=>({
          ...prev,
          [fieldName]:value
        }))
      }
    return (
        <div className='px-10 md:px-20 lg:px-44'>
            <div className='grid grid-cols-2 gap-10'>
                <div>
                    <label className='text-sm'>🎓Difficulty Level</label>
                    <Select onValueChange={(value)=>handleInputChange('level',value)} defaultValue={userCourseInput?.level}>
                        <SelectTrigger className="h-14 text-lg w-[400px]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advance">Advance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>🕒Course Duration</label>
                    <Select defaultValue={userCourseInput?.duration} onValueChange={(value)=>handleInputChange('duration',value)}>
                        <SelectTrigger className="h-14 text-lg w-[400px]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1 Hours">1 Hours</SelectItem>
                            <SelectItem value="2 Hours">2 Hours</SelectItem>
                            <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>▶️Add Video</label>
                    <Select defaultValue={userCourseInput?.displayVideo} onValueChange={(value)=>handleInputChange('displayVideo',value)}>
                        <SelectTrigger className=" h-14 text-lg w-[400px]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>📖No of Chapters</label>
                    <Input type="number" className=" w-[400px]" defaultValue={userCourseInput?.noOfChapters} onChange={(event)=>handleInputChange('noOfChapters',event.target.value)}/>
                </div>
            </div>
        </div>
    )
}

export default SelectOption