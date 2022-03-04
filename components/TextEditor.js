import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import {  getDoc, setDoc,doc } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import {convertFromRaw,convertToRaw} from 'draft-js'
import { useSession } from 'next-auth/react';
import { db } from '../firebase';
import Spinner from './Spinner';

const Editor=dynamic(()=> import('react-draft-wysiwyg').then((mod)=>mod.Editor),
        {
            ssr : false
        }
    )

 function TextEditor() {

    const {data:session}=useSession();
    const router=useRouter();
    const {id}=router.query;
    const [editorState,setEditorState]=useState(EditorState.createEmpty());
    const [loading,setLoading]=useState(true)
    const docCol= doc(db ,"Users", session.user.email,'documents',id)

    
    const getDocument = async()=>{
       const docSnap=await getDoc(docCol);
       return docSnap.data();
      }
         
         
     
  

    const onEditorStateChange= async (editorState)=>{

        setEditorState(editorState);
        await setDoc(docCol ,
                    { 
                        editorState: convertToRaw(editorState.getCurrentContent()) 
                    },
                    {
                        merge:true
                    }
              )
    }


    useEffect(() => {
        getDocument().then((snapshot)=>{
            if(snapshot?.editorState){
                setEditorState( EditorState.createWithContent(convertFromRaw(snapshot?.editorState)))
                setLoading(false)
                
            }
            
        })
    
    }, [])
    
  return (<> 
   {loading ?  <Spinner/> : ( 
    <div className='bg-[#F8F9FA] min-h-screen pb-16 '>
        <Editor
          toolbarClassName="flex sticky  top-0 z-50 !justify-center   mx-auto"
          editorClassName="mt-6 bg-white shadow-lg max-w-4xl mx-auto mb-12 border p-10"
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
    </div>)} 
  </>)
}
export default TextEditor;    