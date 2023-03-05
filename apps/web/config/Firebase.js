// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from 'firebase/analytics'
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithPopup } from "firebase/auth";

import { getDocs } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { useOnline } from "./useOnline";
// import { onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8CsLQFdQTpHqTxe9OBuE8v1AWuykxtD0",
  authDomain: "agape-metaverse.firebaseapp.com",
  databaseURL: "https://agape-shader-editor.firebaseio.com/",
  projectId: "agape-metaverse",
  storageBucket: "agape-metaverse.appspot.com",
  messagingSenderId: "731023934508",
  appId: "1:731023934508:web:f646adef32bed054907d89",
  measurementId: "G-MX9Z5547D9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app)
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// export const onReady = () => {
//   //
//   //
//   return onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       // ...
//       console.log(uid);

//       //
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
// };

export const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  // provider.setCustomParameters({
  //   login_hint: "user@example.com",
  // });

  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      console.log(user);

      useOnline.setState({
        user: {
          email: user.email,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
        },
      });

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(error);

      useOnline.setState({
        user: false,
      });

      // ...
    });
  //
};

//

export const DOCS_COLLECTION = "documents";
export const NODES_COLECTION = "nodes";

export async function addGraphDoc({ title }) {
  try {
    const docRef = await addDoc(collection(db, DOCS_COLLECTION), {
      title: "life is good",
      nodes: [],
      edges: [],
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getNodes() {
  const querySnapshot = await getDocs(collection(db, DOCS_COLLECTION));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}
