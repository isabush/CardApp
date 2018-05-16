import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    setOfCards: any;

    constructor(public navCtrl: NavController, public data: DataProvider, public alertCtrl: AlertController) {

    }

    ionViewDidLoad() {
        this.data.getCards().then((result) => {
            console.log('result ', result);
            console.log('result ' + result);
            this.setOfCards = result;
        })
    }

    editCard(card): void {
        let prompt = this.alertCtrl.create({
            title: 'Edit Card',
            message: "Edit the title and description for your card",
            inputs: [
                {
                    name: 'title',
                    value: card.title
                },
                {
                    name: 'content',
                    value: card.content
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
                            this.data.cards[index].title = data.title;
                            this.data.cards[index].content = data.content;
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
        let prompt = this.alertCtrl.create({
            title: 'Create a new card',
            message: "Enter a title and description for your new card",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                },
                {
                    name: 'content',
                    placeholder: 'Description'
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
                    text: 'Create Card',
                    handler: data => {

                        //this.data.cards.push(data);

                        this.data.addCardToDB(data);

                    }
                }
            ]
        });
        prompt.present();
    }


}
