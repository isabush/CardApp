import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {LoginPage} from "../login/login";
import {AddCardPage} from "../add-card/add-card";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    setOfCards: any;
    radioOpen: boolean;
    radioResult;

    constructor(public navCtrl: NavController, public data: DataProvider,
                public alertCtrl: AlertController) {

    }

    ionViewDidLoad() {

        this.setOfCards = this.data.getCards();
        console.log(this.setOfCards);
    }

    editCard(card): void {
        let prompt = this.alertCtrl.create({
            title: 'Edit Card',
            message: "Edit the title and description for your card",
            inputs: [
                {
                    name: 'title',
                    value: card.val().title
                },
                {
                    name: 'content',
                    value: card.val().content
                },
                {
                    name: 'image',
                    value: card.val().image
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Edit Card',
                    handler: data => {
                        let index = this.data.cards.indexOf(card);
                        if (index > -1) {

                            let obj = {
                                "title": data.title,
                                "content": data.content
                            };

                            this.data.updateCardInDB(card.key, obj, index);
                        }

                    }
                }
            ]
        });
        prompt.present();
    }

    deleteCard(card): void {
        let confirm = this.alertCtrl.create({
            title: 'Delete Card?',
            message: 'Are you sure you want to delete card?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('cancelled clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.data.removeCardFromDB(card);
                        let index = this.data.cards.indexOf(card);
                        if (index > -1) {
                            this.data.cards.splice(index, 1);
                        }
                    }
                }
            ]
        });
        confirm.present();
    }


    addCard(): void {
        this.navCtrl.push(AddCardPage);
    }

    logout(): void {
        this.data.logoutUser().then((result) => {
            this.navCtrl.setRoot(LoginPage);
        });
    }

}
