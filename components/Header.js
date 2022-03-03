import React, { memo } from 'react'
import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import {signOut} from 'next-auth/react'
import Tooltip from './Tooltips';
import Image from 'next/image';

 function Header({session}) {
  
 
  return (
    <div className='sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white'>
       
        <Button  className='hidden md:inline-flex h-20 w-20 !border-0'
                color='gray' 
                ripple='dark'
                size='regular'
                buttonType='outline'
                block={false}
                rounded={true}
                iconOnly={true} >
            <Icon name="menu" size="3xl"/>
        </Button>

            <Icon name="description" size="5xl" color="blue"/>

            <h1 className='ml-2 text-gray-700 text-2xl'>Docs</h1>

            <div className='flex grow items-center px-5 py-2 bg-gray-100 mx-5 md:mx-20 focus-within:shadow-md transition-shadow'>

                <Icon name="search" size="3xl" color="darkgray"/>
                <input type="text"  
                       placeholder='Search...'
                       className='grow px-5 text-base bg-transparent outline-none'/>

            </div>
            <Button
                color="gray"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="hidden md:inline-flex ml-5 md:ml-20 h-20 w-20 !border-0" >

                <Icon name="apps" size="3xl" color="gray"/>

            </Button>
            <Tooltip text="Sign Out" placement="bottom">


            <Image
              loading='lazy'
              onClick={signOut}
              className="cursor-pointer  rounded-full ml-2"
              src={!!session && session.user.image}
              alt=""
              width={48}
              height={48}
              />
              </Tooltip>
    </div>
  )
}


export default memo(Header) ;