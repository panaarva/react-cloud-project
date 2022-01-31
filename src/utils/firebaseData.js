const {initializeApp} = require("firebase/app");
const {getFirestore, collection, getDocs, doc, updateDoc} = require('firebase/firestore/lite');
const firebaseConfig = {
    apiKey: "<apiKey>",
    authDomain: "<authDomain>",
    databaseURL: "<databaseURL>",
    projectId: "<projectId>",
    storageBucket: "<storageBucket>",
    messagingSenderId: "<messagingSenderId>",
    appId: "<appId>",
    measurementId: "<measurementId>"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getAllUsers = async () => {
    let data
    try {
        const dataFire = collection(db, 'cloud-project');
        const dataFireSnapshot = await getDocs(dataFire);
        data = dataFireSnapshot.docs[0].data().users
    } catch (e) {
        data = []
    }
    return data
};
export const insertMessage = async (body) => {
    try {
        const dataFire = collection(db, 'cloud-project');
        const dataFireSnapshot = await getDocs(dataFire);
        const docRef = doc(db, 'cloud-project/jfrdmrsL40FYlySWwz5f');
        let arr = dataFireSnapshot.docs[0].data().messages
        arr.push(body)
        await updateDoc(docRef, "messages", arr)
        return {value: "Success", type: "success"}
    } catch (e) {
        console.log(e)
        return {value: "Error", type: "error"}
    }
}
export const getAllMessages = async () => {
    let data
    try {
        const dataFire = collection(db, 'cloud-project');
        const dataFireSnapshot = await getDocs(dataFire);
        data = dataFireSnapshot.docs[0].data().messages
    } catch (e) {
        data = []
    }
    return data
};