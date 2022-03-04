import React, { useCallback, useEffect, useState } from 'react'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import {getSession,useSession,signOut} from 'next-auth/react'
import { db } from '../../firebase'
import { useRouter } from 'next/router'
import Login from '../../components/Login'
import { getDoc,doc } from 'firebase/firestore/lite'
import TextEditor from '../../components/TextEditor'
import Tooltip from '../../components/Tooltips'
import Image from 'next/image'


export  default  function Document() { 
  const router=useRouter();
  const {id}=  router.query;
  const  {data:session,status}=useSession();
  const [snapshot,setsnapShot]=useState(null);
  

    const  getDocument = useCallback(async  ()=>{

      const docCol= doc(db ,"Users", session.user.email,'documents',id)
      const docSnap=await getDoc(docCol);
      setsnapShot(docSnap.data())
      return docSnap.data();
      
    },[session,id]) 
    
    
    useEffect(() => {
      if (session) {
          
        const load= getDocument()
        load.then(dataExist=>{if(!dataExist){
            router.replace('/')
     
           }} );
          
        }
        
      }, [session,router,getDocument])
      
      
      if(status=="unauthenticated") return <Login/>;
  return (   <div>

          <header className='flex  items-center p-3  shadow-md'>
              <Tooltip text='Home page' placement="right">

              <span className='cursor-pointer' onClick={()=> router.push('/')}>
                  <Icon
              name="description"
              size="5xl"
              color="blue"
              />
              </span>
              </Tooltip>
              <div className=' grow   px-2 mr-auto'>
                  <h2 className='w-72 md:w-[500px] lg:w-[700px]  text-ellipsis overflow-hidden whitespace-nowrap'>{ !!snapshot? snapshot?.title :"..."}</h2>
                  <div className=' flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600'>
                    <p className='option'>File</p>
                    <p className='option'>Edit</p>
                    <p className='option'>View</p>
                    <p className='option'>Insert</p>
                    <p className='option'>Format</p>
                    <p className='option'>Tools</p>
                  </div>
              </div>
          <Button 
          className="hidden md:inline-flex h-10 mr-2"
          color="lightBlue"
          buttonType="filled"
          size="regular"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          >
            <Icon name="people" size="md"/> SHARE
          </Button>
          <Tooltip text="Sign Out" placement="bottom">
        
              <Image loading='lazy' width={40} height={40} onClick={()=>signOut()} className='  rounded-full cursor-pointer ' src={ !!session && `${session?.user?.image}` } alt="user image" />
          </Tooltip>


          </header>
             <TextEditor  /> 
            </div>
      )
    }


   
    export async function  getServerSideProps(context){
        const session=await getSession(context)
      return {
        props:{
           session
        }
      }
   
    }