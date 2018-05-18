import {Injectable} from '@angular/core';
import firebase, {User} from "firebase";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

    cardsRef: any;
    cards: any = [];
    updateCardIndex: any = "";
    userID: any;

    constructor() {

    }

    getCards(): Array<any> {
        this.userID = firebase.auth().currentUser.uid;
        this.cardsRef = firebase.database().ref(`/userProfile/${this.userID}/cards`);
        this.cardsRef.on('child_added', (data) => {
            // console.log(data);
            this.cards.push(data);
            // console.log("vnjk ", this.cards);
        });
        this.cardsRef.on('child_removed', (data) => {
            /*console.log('data ', data);
            console.log(this.cards);*/
        });
        this.cardsRef.on('child_changed', (data) => {
            this.cards[this.updateCardIndex] = data;
        });
        return this.cards;
    }

    removeCardFromDB(cardToDelete): void {
        firebase.database().ref(`/userProfile/${this.userID}/cards`).child(cardToDelete.key).remove();

    }

    updateCardInDB(key, newData, idx): void {
        this.updateCardIndex = idx;
        firebase.database().ref(`/userProfile/${this.userID}/cards/${key}`).update(newData);
    }

    async addCardToDB(cardObject): Promise <any> {
        // this.cards =[];
        return firebase.database().ref(`/userProfile/${this.userID}`).child('/cards')
            .push(cardObject).then((result) => {
                return result;
            });
    }

    async signInWithEP(loginObject): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(
            loginObject.email,
            loginObject.password);
    }

    async createAccount(email, password, fName, lName): Promise<any> {
        try {
            const newUser: User = await firebase.auth().createUserWithEmailAndPassword(
                email,
                password
            );

            await firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}`).set({
                email: email,
                firstName: fName,
                lastName: lName
            });
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    logoutUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut()
                .then(() => {
                    let loggedOut = true;
                    this.cards = [];
                    resolve(loggedOut);
                })
                .catch((error: any) => {
                    reject(error);
                })
        })
    }
}
