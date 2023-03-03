import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth, createUserDocumentFromAuth, signInWithGooglePopup, signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  useEffect(()=>{
  const func = (async() => {
  const response = await getRedirectResult(auth);
  if(response) {
    const userDocRef = await createUserDocumentFromAuth(response.user)
  }
 console.log(response)
}
  )
  func()
  }, [])

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  const logGoogleRedirectUser = async () => {
    const {user} = await signInWithGoogleRedirect();
    console.log(user)
  }
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with google Popup</button>
      <button onClick={logGoogleRedirectUser}>Sign in with google Redirect</button>

    </div>
  )
}

export default SignIn;
