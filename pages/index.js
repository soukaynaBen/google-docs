import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import {useSession,getSession} from 'next-auth/react'
import Login from '../components/Login'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import { useCallback, useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc,addDoc,serverTimestamp ,setDoc, collection, getDocs, orderBy,query} from 'firebase/firestore/lite'
import DocumentRow from '../components/DocumentRow'
export default function Home() {
  const {data:session} = useSession();
  const [showModal,setShowModal]=useState(false);
  const [snapshot,setSnapshot]=useState(null);
  const [input,setInput]=useState("");

   const addUser = useCallback( async() =>{
    let usersCol=doc(db,'Users',session.user.email)
      const docRef= await setDoc(usersCol, {
        name:session.user.name,
        email:session.user.email,
        image:session.user.image,
      },{merge:true})
    
      },[session])

 const  getDocuments = useCallback( async()=>{
    const docRef = collection(db,'Users',session?.user?.email,'documents')
    const docSnap = await getDocs( query(docRef,orderBy('timestamp',"desc")));
        setSnapshot(docSnap?.docs);
  }               ,[session])

    useEffect(()=>{
      if (session) {
        addUser()
        getDocuments()
      }
    },[session,addUser,getDocuments])


      
  
      
  
   

  const createDocument=async ()=>{
    if(!input) return;
  const userCollection =collection(db,'Users',session.user.email,'documents')
    const gcs=await addDoc(userCollection,{
      title:input,
      timestamp:serverTimestamp()
    })
    getDocuments();

    setShowModal(false)
    setInput("")
  }
  
  if(!session) {
    return (<Login/>)
    
  }

  const rowdoc=(i)=>(<div key={i}  className='    flex  p-4 rounded-lg  '>
  <div className=' flex grow items-center '>
  <Button className="w-9 h-9 text-gray-300"
  buttonType="link"
  rounded={true}
  iconOnly={true}
  ripple="dark"
  >

    <Icon name='article' size="3xl" />
     
  </Button>
    <p className='ml-5 pl-5 w-32 h-8 pr-10 mr-auto bg-gray-300 rounded-sm '></p>
    <p className='mr-5 pr-5 w-32 h-8 bg-gray-300 rounded-sm '></p>

  </div>
  <Button className="w-9 h-9 bg-gray-300"
  color="gray"
  buttonType="link"
  rounded={true}
  iconOnly={true}
  ripple="dark"
  >
   <span></span>
     
  </Button>
             </div>)
  const modal=(
    <Modal 
    size="sm" 
    active={showModal}
    toggler={()=>setShowModal(false)}
    >
      <ModalBody>
      <input 
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        type="text"
        className="outline-none w-full" 
        placeholder='Enter name of document...'
        onKeyDown={(e)=>e.key==="Enter" && createDocument() }
      />
      </ModalBody>
      <ModalFooter>
       <Button 
       color="blue"
       buttonType="link"
       ripple="dark"
       onClick={()=>setShowModal(false)}
       >
         Cancel
       </Button>
       <Button
            color="blue"
            buttonType="link"
            ripple="light"
            onClick={createDocument}
       >
         Create
       </Button>
      </ModalFooter>
    </Modal>
  )

 
  
  return (
   <div  >
     <Head>
       <title>Google Docs clone</title>
       <link rel="icon" href='/favicon.ico'></link>
     </Head>
     
     <Header session={session} />
      {modal}
     <section className='bg-[#F8F9FA] pb-10 px-10'>
       <div className="max-w-3xl mx-auto">
         <div className='py-6 flex items-center justify-between'>
           <h2 className='text-gray-700 text-lg'>Start a new document</h2>
           <Button 
           color="gray"
           buttonType="outline"
           iconOnly={true}
           ripple="dark"
           className="!border-0"
           >
             <Icon name="more_vert"    size="3xl" /> 
             </Button>
         </div>
          <div className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700' onClick={()=>setShowModal(true)}>
            <Image src="https://links.papareact.com/pju" layout='fill' alt='add document'/>
          </div>
          <p className='ml-2 mt-2 text-sm font-semibold text-gray-700'>Blank</p>
       </div>
     </section>
     <section className='bg-white px-10 md:px-0'>
       <div className='max-w-3xl mx-auto py-8 text-gray-700'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='font-medium grow'>My documents</h2>
            <p className='mr-12'>Date Created</p>
            <Icon name="folder" size="3xl" color="yellow"/>
          </div>
       </div>
          
       {!snapshot? (<div className='animate-pulse mx-auto max-w-screen-md'>
                    {Array(2).fill().map((_,i)=> rowdoc(i) )}
                 </div>
         
                    ) : snapshot.map(doc => (
                        <DocumentRow
                        key={doc.id}
                        id={doc.id}
                        fileName={doc.data().title}
                        date={doc.data().timestamp}
                        getDocuments={ getDocuments }

                        />
                      ))}
     </section>
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