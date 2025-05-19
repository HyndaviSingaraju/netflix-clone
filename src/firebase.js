
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBt47065JdG-kbyZwdjzRpQ2-cwdEsw5tw",
  authDomain: "netflix-clone-25d2b.firebaseapp.com",
  projectId: "netflix-clone-25d2b",
  storageBucket: "netflix-clone-25d2b.firebasestorage.app",
  messagingSenderId: "156149592936",
  appId: "1:156149592936:web:ff782c8091eb601a8e1cdd",
  measurementId: "G-R3SYCXKHF9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    }catch(err){
        console.log(err);
        toast.error(err.code.split('/')[1].split('-').join(" "));
    }
}

const login=async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(err){
        console.log(err);
        toast.error(err.code.split('/')[1].split('-').join(" "));
    }
}

const logout=()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};