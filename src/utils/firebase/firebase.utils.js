import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCyELU2Dfj5rir2Qh7oOK_qzwHUUDkso18",
  authDomain: "crwn-clothing-daba.firebaseapp.com",
  projectId: "crwn-clothing-daba",
  storageBucket: "crwn-clothing-daba.appspot.com",
  messagingSenderId: "776548548531",
  appId: "1:776548548531:web:d58de4640ce7b7801495c6"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef)
  if(!userSnapshot.exists()){
    const  { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error){
      console.log(error.message);
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword= async(email, password)=>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async(email,password) => {
  if(!email || !password ) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);
