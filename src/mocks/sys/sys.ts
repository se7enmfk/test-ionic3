import {Injectable} from '@angular/core';
import {HttpProvider, UtilProvider} from '../../providers/common/commonProviders';
import {SysReleaseVersion} from '../../model/sys/sys-release-version';

@Injectable()
export class SysProvider {

  _list: Array<SysReleaseVersion>;  //历史版本列表
  _latestVersion: any;

  constructor(public http: HttpProvider, public utilProvider: UtilProvider) {
    this._list = [
      {ver_no: "1.0.0", release_desc: "111", mode_: 'E', token: null, order_cause_: null, orderBy_: null, all_ind_: null, create_ts: '2018-01-24 17:56:13', create_by: 'ADMIN', modify_ts: '2018-01-25 15:54:26', modify_by: 'ADMIN',},
      {ver_no: "2.0.0", release_desc: "此版本描述数据是开发时用于测试的。此次更新了如下内容：1.优化了XX模块;2.处理了XX相关的bug;3.上线了XX功能;4...", mode_: 'E', token: null, order_cause_: null, orderBy_: null, all_ind_: null, create_ts: '2018-01-30 14:45:47', create_by: 'ADMIN', modify_ts: '2018-01-25 15:54:26', modify_by: 'ADMIN',},
      {ver_no: "2.0.1", release_desc: "此版本描述数据是开发时用于测试的。此次更新了如下内容：1.优化了XX模块;2.处理了XX相关的bug;3.上线了XX功能;4...", mode_: 'E', token: null, order_cause_: null, orderBy_: null, all_ind_: null, create_ts: '2018-01-31 14:45:47', create_by: 'ADMIN', modify_ts: '2018-01-25 15:54:26', modify_by: 'ADMIN',},
      {ver_no: "3.0.0", release_desc: "此版本描述数据是开发时用于测试的。此次更新了如下内容：1.优化了XX模块;2.处理了XX相关的bug;3.上线了XX功能;4...", mode_: 'E', token: null, order_cause_: null, orderBy_: null, all_ind_: null, create_ts: '2018-01-31 14:46:47', create_by: 'ADMIN', modify_ts: '2018-01-25 15:54:26', modify_by: 'ADMIN',},
      {ver_no: "3.0.1", release_desc: "此版本描述数据是开发时用于测试的。此次更新了如下内容：1.优化了XX模块;2.处理了XX相关的bug;3.上线了XX功能;4...", mode_: 'E', token: null, order_cause_: null, orderBy_: null, all_ind_: null, create_ts: '2018-01-31 14:46:48', create_by: 'ADMIN', modify_ts: '2018-01-25 15:54:26', modify_by: 'ADMIN',}
    ]
  }

  /**
   * 获取版本信息列表
   * @param sysReleaseVersion 实体
   */
  getList() {
    this._list = this._list;
    //遍历出最新版本
    this.getLatestVersionInfo(this._list);
    /*
     this.http.post('sys/releaseVersionList', {}).subscribe((data: any) => {
     if (data)
     this._list = data;
     //遍历出最新版本
     this.getLatestVersionInfo(this._list);
     });
     */
  }

  /**
   * 获取最新版本信息
   * @param sysReleaseVersion 实体
   */
  getLatestVersionInfo(list: any) {
    //设定最新版本初始值
    this._latestVersion = list[0];
    //遍历获取最新版本：通过对比创建时间
    list.forEach(data => {
      if (new Date(data.create_ts.replace("-", "/").replace("-", "/")) > new Date(this._latestVersion.create_ts.replace("-", "/").replace("-", "/"))) {
        this._latestVersion = data;
      }
    });


  }


}
