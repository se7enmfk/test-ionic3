import { PlatformProvider, HttpProvider, UtilProvider, ValidateProvider } from "./common/commonProviders";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ErrorHandler } from "@angular/core";
import { IonicErrorHandler } from "ionic-angular";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Transfer } from '@ionic-native/transfer';

/*provides*/

import { AdmNoticeProvider } from "./adm/adm-notice";
import { AdmUserProvider } from "./adm/adm-user";
import { SysProvider } from "./sys/sys";
import { CusBasicProvider } from "./cus/cus-basic";
import { AdmSysParamProvider } from "./adm/adm-sys-param";


/*mocks*/
/*import { AdmNoticeProvider } from "../mocks/adm/adm-notice";
import { AdmUserProvider } from "../mocks/adm/adm-user";
import { SysProvider } from "../mocks/sys/sys";
import { CusBasicProvider } from "../mocks/cus/cus-basic";
import { AdmSysParamProvider } from "../mocks/adm/adm-sys-param";*/



export const Providers = [

    AdmNoticeProvider,
    AdmSysParamProvider,
    AdmUserProvider,
    CusBasicProvider,
    SysProvider,

    StatusBar,
    SplashScreen,
    InAppBrowser,
    File,
    FileOpener,
    Transfer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

    HttpProvider,
    UtilProvider,
    ValidateProvider,
    PlatformProvider
]

export {
    AdmNoticeProvider,
    AdmSysParamProvider,
    AdmUserProvider,
    CusBasicProvider,
    SysProvider,
}
