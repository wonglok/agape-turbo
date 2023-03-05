// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore'

import { getDocs } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB8CsLQFdQTpHqTxe9OBuE8v1AWuykxtD0',
  authDomain: 'agape-metaverse.firebaseapp.com',
  databaseURL: 'https://agape-shader-editor.firebaseio.com/',
  projectId: 'agape-metaverse',
  storageBucket: 'agape-metaverse.appspot.com',
  messagingSenderId: '731023934508',
  appId: '1:731023934508:web:f646adef32bed054907d89',
  measurementId: 'G-MX9Z5547D9',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// export const analytics = getAnalytics(app)
export const db = getFirestore(app)

export const DOCS_COLLECTION = 'documents'
export const NODES_COLECTION = 'nodes'

export async function addGraphDoc({ title }) {
  try {
    const docRef = await addDoc(collection(db, DOCS_COLLECTION), {
      title: 'life is good',
      nodes: [],
      edges: [],
    })

    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export async function getNodes() {
  const querySnapshot = await getDocs(collection(db, DOCS_COLLECTION))
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`)
  })
}
