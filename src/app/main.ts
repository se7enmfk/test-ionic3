import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { AppConfig } from './app.config';
declare var __webpack_public_path__: string;   // Make typescript compilation happy
__webpack_public_path__ = AppConfig.WEB_URL + "build/";

platformBrowserDynamic().bootstrapModule(AppModule);
