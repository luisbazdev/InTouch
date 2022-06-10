import { db } from '../../firebase';
import { collection, serverTimestamp, setDoc, doc, arrayUnion, updateDoc } from 'firebase/firestore';

export default function Invitation({session, invitation}){
    
    // Either delete the 'invitation' document
    // after accepting the invitation, or
    // set its state to 'accepted'.

    // Also give the option to reject
    // the invitation.
    async function acceptInvitation(){
        const collRef = collection(db, `users/${session.uid}/groups`)
        const docRef = doc(collRef);

        setDoc(docRef, {
            groupId: invitation.groupId,
            joinedAt: serverTimestamp()
        })

        const groupRef = doc(db, "groups", invitation.groupId);

        await updateDoc(groupRef, {
            members: arrayUnion(session.uid)
        });
    }

    return (
        <div>
            <p>You've been invited to {invitation.groupName} by {invitation.owner}</p>
            <button onClick={acceptInvitation}>Accept</button>
        </div>
    )
}