
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { deleteDoc, doc } from 'firebase/firestore/lite';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { memo } from 'react';
import { db } from '../firebase';
import Tooltip from './Tooltips';

function DocumentRow({id,fileName,date, getDocuments}) {
    const router=useRouter();
    const {data:session}=useSession();

    const deleteItem=async ()=>{
      const docRef=doc(db,"Users",session?.user?.email,'documents',id)
           await deleteDoc(docRef)
           getDocuments();
    }
    
    
  return (
    <div  className='mx-auto max-w-screen-md flex  p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer '>
        <div className=' flex grow items-center ' onClick={()=>router.push(`/doc/${id}`)}>
          <Icon name='article' size="3xl" color="blue"/>
          <p className='grow pl-5 w-10 pr-10 truncate'>{fileName}</p>
          <p className='pr-5 text-sm'>{date?.toDate().toLocaleDateString()}</p>

        </div>
        <Button className="pt-1 w-9 h-9"
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        onClick={deleteItem}
        >
          <Tooltip text="delete" placement="top">

            <Icon 
            name="close"
            size="xl"
               
            />
            </Tooltip>
        </Button>
    </div>
  )
}

export default memo(DocumentRow)  ;