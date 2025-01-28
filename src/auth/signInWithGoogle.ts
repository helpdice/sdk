import app from "../config/firebase.js";
// import signin from "./signin";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import signup from "./signup.js";

type SignInGoogleProps = {
    onFetching?: () => void;
    onSuccess?: (data: object) => void;
    onError?: (error: unknown | string) => void;
    onSettled?: () => void;
}

// Function to handle Google Sign-In
async function signInWithGoogle({ onSuccess, onError, onFetching, onSettled }: SignInGoogleProps): Promise<void> {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                return signup({
                    name: String(user.displayName),
                    email: String(user.email),
                    username: user.uid,
                    token: token
                }, {
                    onFetching: () => onFetching && onFetching(),
                    onError: (error) => onError && onError(error),
                    onSuccess: (data) => onSuccess && onSuccess(data),
                    onSettled: () => onSettled && onSettled()
                })
            }).catch((error) => {
                onError && onError(error)
                return Promise.reject('Something Went Wrong')
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    } catch (err) {
        onError && onError(err)
    }
}

export default signInWithGoogle;