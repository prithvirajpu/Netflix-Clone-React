import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  collection,
  addDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

 
//  FIREBASE CONFIG
 
const firebaseConfig = {
  apiKey: "AIzaSyAJNokF9pNgIdGfBLRk3dGeqdQWkBmiqZg",
  authDomain: "react-clone-3cfc7.firebaseapp.com",
  projectId: "react-clone-3cfc7",
  storageBucket: "react-clone-3cfc7.firebasestorage.app",
  messagingSenderId: "162683213399",
  appId: "1:162683213399:web:f5726427af67587174b512",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

 
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

 // WATCHLIST FUNCTIONS
 
 const addToWatchlist = async (userId, movie) => {
  try {
    const movieRef = doc(db, "watchlist", `${userId}_${movie.id}`);
    await setDoc(movieRef, {
      userId,
      movieId: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      addedAt: new Date(),
    });
    toast.success(" Added to watchlist!");
  } catch (error) {
    console.log(error);
    toast.error(" Failed to add to watchlist");
  }
};

 const getWatchlist = async (userId) => {
  try {
    const q = query(collection(db, "watchlist"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log(error);
    toast.error(" Failed to load watchlist");
    return [];
  }
};

 const removeFromWatchlist = async (userId, movieId) => {
  try {
    const movieRef = doc(db, "watchlist", `${userId}_${movieId}`);
    await deleteDoc(movieRef);
    toast.success(" Removed from watchlist!");
  } catch (error) {
    console.log(error);
    toast.error(" Failed to remove from watchlist");
  }
};

 
export {
  auth,
  db,
  login,
  signup,
  logout,
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
};
