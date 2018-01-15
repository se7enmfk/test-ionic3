import { NgModule } from '@angular/core';
import { SysFilterPipe } from './sys-filter/sys-filter';
import { FilterPipe } from './filter/filter';
@NgModule({
	declarations: [SysFilterPipe,
    FilterPipe],
	imports: [],
	exports: [SysFilterPipe,
    FilterPipe]
})
export class PipesModule {}
