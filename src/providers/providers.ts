import { PlatformProvider, HttpProvider, UtilProvider, ValidateProvider } from "./common/commonProviders";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ErrorHandler } from "@angular/core";
import { IonicErrorHandler } from "ionic-angular";

/* import { AdmSysParamProvider } from "./adm/adm-sys-param/adm-sys-param";
import { AdmUserProvider } from "./adm/adm-user/adm-user";
import { AdmRmBranchProvider } from "./adm/adm-rm-branch/adm-rm-branch";
import { AdmRmUserProvider } from "./adm/adm-rm-user/adm-rm-user";
import { CusBasicProvider } from "./cus/cus-basic/cus-basic";
import { CusBindingBankcardProvider } from "./cus/cus-binding-bankcard/cus-binding-bankcard"; */

import { AdmSysParamProvider } from "../mocks/adm/adm-sys-param/adm-sys-param";
import { AdmUserProvider } from "../mocks/adm/adm-user/adm-user";
import { AdmRmBranchProvider } from "../mocks/adm/adm-rm-branch/adm-rm-branch";
import { AdmRmUserProvider } from "../mocks/adm/adm-rm-user/adm-rm-user";
import { CusBasicProvider } from "../mocks/cus/cus-basic/cus-basic";
import { CusBindingBankcardProvider } from "../mocks/cus/cus-binding-bankcard/cus-binding-bankcard";

export {
    AdmSysParamProvider,
    AdmUserProvider,
    AdmRmBranchProvider,
    AdmRmUserProvider,
    CusBasicProvider,
    CusBindingBankcardProvider,
};

export const Providers = [
    AdmSysParamProvider,
    AdmUserProvider,
    AdmRmBranchProvider,
    AdmRmUserProvider,
    CusBasicProvider,
    CusBindingBankcardProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpProvider,
    UtilProvider,
    ValidateProvider,
    PlatformProvider
]