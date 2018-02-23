import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AdmUserProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  options = {};
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public admUserProvider: AdmUserProvider) {
  }

  ionViewDidLoad() {
    let course = {
      name: 'Database',
      id: 7
    };
    let newCourse = {
      name: 'Database',
      id: 6,
      cd:8
    };
    let newCourse1 = Object.assign({},newCourse, course);
    course.name = "aaaa";
    console.log(course.name); // writes Database
    console.log(newCourse1); // writes Dataware
  }
  onChartClick(e) {
    console.log(e.dataIndex);
  }
}
