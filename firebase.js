import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyD72tZfJtKAFZZFaGmsMh0yx3VPM_BJCS4',
  authDomain: 'twitter-clone-next-c699e.firebaseapp.com',
  projectId: 'twitter-clone-next-c699e',
  storageBucket: 'twitter-clone-next-c699e.appspot.com',
  messagingSenderId: '1087958833214',
  appId: '1:1087958833214:web:63800779851bcbb347196f',
}

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export default app
export { db, storage }
