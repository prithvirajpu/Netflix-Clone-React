import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAJNokF9pNgIdGfBLRk3dGeqdQWkBmiqZg",
  authDomain: "react-clone-3cfc7.firebaseapp.com",
  projectId: "react-clone-3cfc7",
  storageBucket: "react-clone-3cfc7.firebasestorage.app",
  messagingSenderId: "162683213399",
  appId: "1:162683213399:web:f5726427af67587174b512"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async (name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password)
        const user=res.user;
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
        });
    }catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login=async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout=()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout}