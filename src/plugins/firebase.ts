import type { FirebaseApp } from "firebase/app";
import type { Auth as FirebaseAuth } from "firebase/auth";
import type { Firestore as FirebaseFirestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * @description Firebaseの管理画面から取得したAPIオブジェクト
 * @note 環境変数は`.env.local`ファイルに定義しています
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * @description FirebaseAppを返す
 */
export const app = (): FirebaseApp | undefined => {
  // if (typeof window === "undefined") return; // バックエンドで実行されないようにする

  return getApps()[0] || initializeApp(firebaseConfig);
};

export const auth: FirebaseAuth = getAuth(app());
export const db: FirebaseFirestore = getFirestore(app());
export const storage: FirebaseStorage = getStorage(app());
