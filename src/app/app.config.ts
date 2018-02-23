/**
 * App配置信息
 */
export class AppConfig {


  static GESTURE_PASSWORD = "gesture_password";
  static SYS_NAME = "FTX";
  static SYS_USER = "TestUser";
  static SYS_PARAM = "SysParam";
  static TOKEN = "token";
  static BURIED_POINT = "buried_point";

  // static WEB_URL = "http://192.168.1.108:8100/";
  // static API_URL = 'http://192.168.1.108:2080/AppFrameworkServer/';

  static WEB_URL = "";
  static API_URL = 'http://localhost:2080/AppFrameworkServer/';
  // static API_URL = 'http://uat.ftecx.com:2080/AppFrameworkServer/';

  static gesture_num = 5;

  static APK_DOWNLOAD = 'http://localhost:2080/AppFrameworkServer/';
  static APP_DOWNLOAD = 'http://localhost:2080/AppFrameworkServer/';

  static APP_VERSION = '3.0.1';
}

export class ImageConfig {

  static personHead = AppConfig.WEB_URL + 'assets/imgs/person/personHead.png';
  static logo = AppConfig.WEB_URL + 'assets/imgs/ftxLogo/Fintech.png';

}
