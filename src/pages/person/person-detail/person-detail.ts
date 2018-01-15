import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { BasePage } from "../../pages";
import { UtilProvider } from '../../../providers/common/commonProviders';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-person-detail',
  templateUrl: 'person-detail.html',
})
export class PersonDetailPage extends BasePage {

  private ftxForm: FormGroup;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public actionSheetCtrl: ActionSheetController,
    private formBuilder: FormBuilder) {
    super(navCtrl, viewCtrl, navParams, utilProvider);

    this.ftxForm = this.formBuilder.group({
      'user_name': ['', [Validators.required, Validators.maxLength(5)]],
      'gender': ['F', [Validators.required]],
      'mobile': ['', [Validators.required]],
      'email': ['', [Validators.required]]
    });
  }

  openActionSheet() {

    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择',
      buttons: [
        {
          text: '男',
          handler: () => {
            this.ftxForm.value.gender = 'M';
          }
        },
        {
          text: '女',
          handler: () => {
            this.ftxForm.value.gender = 'F';
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });

    actionSheet.present();
  }
}
