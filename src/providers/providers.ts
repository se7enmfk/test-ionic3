// import { AdmSysParamProvider } from "./adm/adm-sys-param/adm-sys-param";
// import { AdmUserProvider } from "./adm/adm-user/adm-user";

import { AdmSysParamProvider } from "../mocks/adm/adm-sys-param/adm-sys-param";
import { AdmUserProvider } from "../mocks/adm/adm-user/adm-user";

import { PlatformProvider, HttpProvider, UtilProvider } from "./common/commonProviders";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ErrorHandler } from "@angular/core";
import { IonicErrorHandler } from "ionic-angular";

export {
    AdmSysParamProvider,
    AdmUserProvider,
};

export const Providers = [
    AdmSysParamProvider,
    AdmUserProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpProvider,
    UtilProvider,
    PlatformProvider
]