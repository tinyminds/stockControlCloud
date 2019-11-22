import { stockItemsRef, authRef, provider } from "../config/firebase";
import { FETCH_STOCKITEMS, FETCH_USER } from "./types";
import * as firebase from "firebase";

export const addStockitem = (newstockItem, uid) => dispatch => {
  firebase.firestore().collection("stockItems")
  .add(newstockItem);
};

export const editStockitem = (stockItems, uid, itemID) => dispatch => {
  firebase.firestore().collection("stockItems")
    .doc(itemID)
    .set(stockItems);
};

export const deleteItem = (deleteItemId, uid) => dispatch => {
  firebase.firestore().collection("stockItems")
    .doc(deleteItemId)
    .delete();
};


export const fetchStockItems = (uid, order, direction) => dispatch => {
  const dataArray = [];
  const idArray = [];
  firebase.firestore().collection("stockItems")
  .orderBy(order, direction)
  .limit(100)
  .onSnapshot(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
       dataArray[dataArray.length]=doc.data();
       idArray[idArray.length]=doc.id;
      });
      dispatch({
        type: FETCH_STOCKITEMS,
        payload: [[dataArray],[idArray]]
      });
  });
 
};
export const fetchStockItemsFilter = (fieldName, fieldValue, comparitor, order) => dispatch => {
  const dataArray = [];
  const idArray = [];
  firebase.firestore().collection("stockItems")
  .where(fieldName, comparitor , fieldValue)
  .orderBy(order, 'asc')
  .limit(100)
  .onSnapshot(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
       dataArray[dataArray.length]=doc.data();
       idArray[idArray.length]=doc.id;
      });
      dispatch({
        type: FETCH_STOCKITEMS,
        payload: [[dataArray],[idArray]]
      });
  });
 
};

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};
