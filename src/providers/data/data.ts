import {Injectable} from '@angular/core';
import firebase from "firebase";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

    cardsRef: any;
    cards: any;

    constructor() {

    }

    getCards(): Promise<any> {
        this.cardsRef = firebase.database().ref('cards');
        return this.cardsRef.once('value').then(snapshot => {
            return this.snapshotToArray(snapshot);
        });
    }

    snapshotToArray(snapshot) {
        let returnArr = [];
        snapshot.forEach(function (childSnapshot) {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    }

    addCardToDB(newCard): void {
        firebase.database().ref('cards').push(newCard);
    }

}
