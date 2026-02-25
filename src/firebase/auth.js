import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './config';

const googleProvider = new GoogleAuthProvider();

// Login com email e senha
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Registrar novo usuário
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Login com Google
export const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    // Tentar extrair idToken do credential (token de identidade do Google)
    let idToken = null;
    try {
      const credential = GoogleAuthProvider.credentialFromResult(userCredential);
      idToken = credential?.idToken || null;
    } catch (e) {
      // se não for possível extrair, seguir sem idToken (será tratado no caller)
    }

    return { user: userCredential.user, idToken, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Reset de senha
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Observador de estado de autenticação
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};