import * as admin from 'firebase-admin';
//initialize the database and the collection
const db = admin.firestore();
const usersCollection = 'users';

exports.getUsers = async function () {
  try {
    console.log('services-getUsers')
    const userQuerySnapshot = await db.collection(usersCollection).get();
    const users: any[] = [];
    userQuerySnapshot.forEach(
      (doc)=>{
        users.push({
          id: doc.id,
          data:doc.data()
        });
      }
    );
    return users;
  } catch (error) {
    return error
  }
}
exports.getUserByEmail = async function (userEmail: string) {
  try {
    let user: any
    user = await db.collection(usersCollection).doc(userEmail).get()
    if(!user.exists) 
      return {id:'notFound', data:'not found'}
    else
      return {id:user.id, data:user.data()}
  } catch (error) {
    return error
  }
}
exports.postUser = async function (user: any) {
  try {
    const newUser = {
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
      location: user.location
    }
    const newDoc = await db.collection(usersCollection).doc(user.email).set(newUser);
    console.log(newDoc)
    return newDoc
  } catch (err) {
    return err
  }
}

