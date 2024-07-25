import admin from "firebase-admin";
import { FIREBASE_ADMIN_KEY, FIREBASE_DB_NAME } from '$env/static/private';

let firebaseAdmin;

if (!admin.apps.length) {

    firebaseAdmin = admin.initializeApp({
          credential: admin.credential.cert(FIREBASE_ADMIN_KEY),
          databaseURL: `https://${FIREBASE_DB_NAME}.firebaseio.com`,
          databaseAuthVariableOverride: null
        });
} else{
    firebaseAdmin = admin.apps[0]!;
}




const db = admin.firestore();

// firebaseAuth = getAuth(firebaseApp);
// export the firebase app
export {
    db
    // firebaseAuth
}