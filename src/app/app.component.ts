import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  
  ngOnInit(): void {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD1ROx73x0JB7uT95GkhF7DhAh8iS6Q3NY",
      authDomain: "jta-instagram-clone-385a1.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-385a1.firebaseio.com",
      projectId: "jta-instagram-clone-385a1",
      storageBucket: "jta-instagram-clone-385a1.appspot.com",
      messagingSenderId: "348920231719"
    };
    firebase.initializeApp(config);
  }
}
