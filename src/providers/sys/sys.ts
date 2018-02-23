import { Injectable } from '@angular/core';
import { HttpProvider, UtilProvider } from '../../providers/common/commonProviders';
import { SysReleaseVersion } from '../../model/sys/sys-release-version';

@Injectable()
export class SysProvider {

  _list: Array<SysReleaseVersion>;
  _latestVersion:any;

  constructor(public http: HttpProvider, public utilProvider: UtilProvider) {
  }

  /**
   * 获取版本信息列表
   * @param sysReleaseVersion 实体
   */
  getList() {
    this.http.post('sys/releaseVersionList', {}).subscribe((data:any) => {
      if (data)
        this._list = data;
      //遍历出最新版本
      this.getLatestVersionInfo(this._list);
    });
  }

  /**
   * 获取最新版本信息
   * @param sysReleaseVersion 实体
   */
  getLatestVersionInfo(list:any) {
    //设定最新版本初始值
    this._latestVersion= list[0];
    //遍历获取最新版本：通过对比创建时间
    list.forEach(data => {
      console.log(typeof data.create_ts);
      if(new Date(data.create_ts.replace("-", "/").replace("-", "/"))>new Date(this._latestVersion.create_ts.replace("-", "/").replace("-", "/"))){
        this._latestVersion=data;
      }
    });



  }



}
