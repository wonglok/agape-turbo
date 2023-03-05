import { create } from "zustand";
import { auth, loginGoogle } from "./Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
export const useOnline = create((set, get) => {
  return {
    //

    user: false,
    loginGoogle: async () => {
      //
      return loginGoogle();
    },
    logout: () => {
      signOut(auth);
    },
    onHydration: () => {
      return onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log(uid);

          set({
            user: {
              email: user.email,
              emailVerified: user.emailVerified,
              isAnonymous: user.isAnonymous,
              uid: user.uid,
            },
          });

          //
        } else {
          console.log("no user");
          set({
            user: false,
          });

          // User is signed out
          // ...
        }
      });
    },
  };
});
