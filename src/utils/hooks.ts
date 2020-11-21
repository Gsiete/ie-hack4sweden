import { useContext, useEffect, useState } from 'react';
import firebase from 'firebase';

import { firestore } from '../firebase';
import AuthContext from '../container/AuthProvider/context';

export const useSubmitter = (collection: string, docId?: string): [boolean, (values: object) => Promise<unknown>] => {
  const [isSending, setIsSending] = useState(false);
  const submitter = async (values: object) => {
    setIsSending(true);
    let result;
    if (docId) {
      result = await firestore.collection(collection).doc(docId).set(values, { merge: true});
    } else {
      result = await firestore.collection(collection).add(values);
    }
    setIsSending(false);
    return result;
  }
  return [isSending, submitter];
}

type FetchedDoc = { id: string, ref: firebase.firestore.DocumentReference } & firebase.firestore.DocumentData;
export const useFetcher = (collection: string, where?: [string, firebase.firestore.WhereFilterOp, unknown]) => {
  const [loadedDocs, setLoadedDocs] = useState<FetchedDoc[] | undefined>(undefined);
  const whereStr = where ? where.map((v) => JSON.stringify(v)).join() : '';
  useEffect(() => {
    (async () => {
      const collectionRef = firestore.collection(collection);
      const query = where ? collectionRef.where(...where) : collectionRef;
      const result = await query.get();
      setLoadedDocs(result.docs.map(({ id, ref, data }) => ({ id, ref, ...data() })));
    })();
  }, [collection, whereStr]);
  return loadedDocs;
}

export const useDocFetcher = (collection: string, docId?: string) => {
  const [loadedDoc, setLoadedDoc] = useState<FetchedDoc | undefined | null>(undefined);
  useEffect(() => {
    (async () => {
      if (!docId) {
        return;
      }
      const docSnap = await firestore.collection(collection).doc(docId).get();
      setLoadedDoc(docSnap.exists ? { id: docSnap.id, ref: docSnap.ref, ...docSnap.data() } : null);
      firestore.collection(collection).doc(docId)
        .onSnapshot((doc) => setLoadedDoc(doc.exists ? { id: doc.id, ref: doc.ref, ...doc.data() } : null));
    })();
  }, [collection, docId])
  return loadedDoc;
}

export const useFetchUserData = () => {
  const user = useContext(AuthContext);
  return useDocFetcher('users', user?.uid);
}

export const useUserDataSubmitter = () => {
  const user = useContext(AuthContext);
  return useSubmitter('users', user?.uid);
};
