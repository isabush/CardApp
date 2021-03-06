import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import firebase, {Unsubscribe} from "firebase";
import {firebaseConfig} from "./firebase.config";
import {HomePage} from "../pages/home/home";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = LoginPage;

    constructor(platform: Platform, statusBar: StatusBar,
                splashScreen: SplashScreen) {

        firebase.initializeApp(firebaseConfig);

        const unsubscribe: Unsubscribe = firebase
            .auth().onAuthStateChanged(user => {
                if (user) {
                    this.rootPage = HomePage;
                    unsubscribe();
                } else {
                    this.rootPage = LoginPage;
                    unsubscribe();
                }
            });

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}

