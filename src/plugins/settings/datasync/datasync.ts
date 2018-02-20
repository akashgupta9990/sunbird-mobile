import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TelemetryService } from '../../../core/services/telemetry/telemetry.service';
import { Storage } from "@ionic/storage";
import { DataSyncType } from "./datasynctype.enum"

/**
 * Generated class for the DatasyncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const KEY_DATA_SYNC_TYPE = "data_sync_type";

@Component({
  selector: 'page-datasync',
  templateUrl: 'datasync.html',
  providers: [TelemetryService]
})
export class DatasyncPage {
  dataSyncType: DataSyncType;

  OPTIONS: typeof DataSyncType = DataSyncType;

  constructor(public navCtrl: NavController, public navParams: NavParams, private telemetryService: TelemetryService, private storage: Storage) {
    this.init();
  }

  private init() {
    let that = this;
    that.storage.get(KEY_DATA_SYNC_TYPE)
      .then(val => {
        if (val === undefined || val === "" || val === null) {
          return DataSyncType.off
        } else {
          return val
        }
      })
      .then(val => {
        this.dataSyncType = val

        console.error("default value - " + this.dataSyncType)
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatasyncPage');
  }

  onSelected() {
    console.log("Value - " + this.dataSyncType)
    this.storage.set(KEY_DATA_SYNC_TYPE, this.dataSyncType)
  }

  onSyncClick() {
    console.log('Sync called');
    this.telemetryService.sync();
  }



}
