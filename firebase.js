import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyD4xR4TLWLfO3vnfklZ-jeCzEUET9ZeTk0",
  authDomain: "docs-bf9b9.firebaseapp.com",
  projectId: "docs-bf9b9",
  storageBucket: "docs-bf9b9.appspot.com",
  messagingSenderId: "331487880915",
  appId: "1:331487880915:web:e61e01422accbaac299626"
};
  const app = initializeApp(firebaseConfig);
  
  export const db = getFirestore(app);

  