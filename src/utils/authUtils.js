import { auth, provider } from '../firebase'; 
import { signOut, signInWithPopup } from "firebase/auth";

export const handleLogin = async (navigate) => {
    try {
        await signInWithPopup(auth, provider);
        navigate('/home');
    } catch (error) {
        console.error("Error during login:", error);
    }
};

export const handleLogout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error during logout:", error);
    }
};
