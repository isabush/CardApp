import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataProvider} from "../../providers/data/data";
import {HomePage} from "../home/home";

/**
 * Generated class for the AddCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-card',
  templateUrl: 'add-card.html',
})
export class AddCardPage {

    private addCardForm: FormGroup;
    private loading: Loading;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private formBuilder: FormBuilder, public data: DataProvider,
                private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
        this.addCardForm = this.formBuilder.group({
            title: ['', Validators.compose([Validators.required])],
            content: ['', Validators.compose([Validators.required])],
            image: ['', Validators.compose([Validators.required])]
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddCardPage');
    }

    addCardSubmitForm(): void {
        if (!this.addCardForm.valid) {
            console.log(this.addCardForm.value);
        } else {
            this.data.addCardToDB(this.addCardForm.value).then(authData => {
                this.loading.dismiss().then(() => {
                    this.navCtrl.setRoot(HomePage);
                })
            }, error => {
                let alert = this.alertCtrl.create({
                    message: error.message,
                    buttons: [{
                        text: 'ok',
                        role: 'cancel'
                    }]
                });
                alert.present();
            });
        }
        this.loading = this.loadingCtrl.create();
        this.loading.present();
    }


}
