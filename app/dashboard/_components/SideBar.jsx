"use client"
import { Progress } from '@/components/ui/progress';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { HiOutlineHome, HiOutlineSquare3Stack3D, HiOutlineShieldCheck, HiOutlinePower } from "react-icons/hi2";
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { UserButton, useClerk } from '@clerk/nextjs';

function SideBar() {
    const {userCourseList,setUserCourseList}=useContext(UserCourseListContext);
    const { signOut } = useClerk();
    const router = useRouter();
    const path = usePathname();
    
    const Menu=[
        {
            id: 1,
            name: 'Home',
            icon: <HiOutlineHome />,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Explore',
            icon: <HiOutlineSquare3Stack3D />,
            path: '/dashboard/explore'
        },
        {
            id: 3,
            name: 'Test',
            icon: <HiOutlineShieldCheck />,
            path: '/dashboard/test'
        }
    ]
    
    const handleLogout = async () => {
        await signOut();
        router.push('/');
    }

    return (
        <div className='fixed h-full md:w-64 p-5 shadow-md'>
            <Image src={'/educraftai.svg'} width={160} height={100}/>
            <hr className='my-5'/>
            <ul>
                {Menu.map((item,index)=>(
                    <Link href={item.path} key={item.id}>
                        <div className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3
                        ${path === item.path && 'bg-gray-100 text-black'}`}>
                            <div className='text-2xl'>
                                {item.icon}
                            </div>
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}
                {/* Logout button */}
                <div 
                    onClick={handleLogout}
                    className='flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3'
                >
                    <div className='text-2xl'>
                        <HiOutlinePower />
                    </div>
                    <h2>Logout</h2>
                </div>
                {/* User button */}
                <div className='flex items-center gap-2 text-gray-600 p-3 rounded-lg mb-3'>
                    
                </div>
            </ul>
            <div className='absolute bottom-10 w-[80%]'>
                <Progress value={(userCourseList?.length/5)*100} />
                <h2 className='text-sm my-2'>{userCourseList?.length} Out of 5 Course created</h2>
                <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimited course generate</h2>
            </div>
        </div>
    )
}

export default SideBar