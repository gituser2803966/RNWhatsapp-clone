import firestore from '@react-native-firebase/firestore';

export async function AddUserToDatabase(user){
    const { uid, firstName, lastName, photoURL, createAt, UpdateAt } = user;
    const userRef = firestore().collection('Users');
    await userRef.add({
        uid,firstName,lastName,photoURL,createAt,UpdateAt
    })
}

export function GetUserList(){
    var docRef = db.collection("Users").doc();
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

