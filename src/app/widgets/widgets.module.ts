import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WidgetsGridComponent } from './widgets-grid/widgets-grid.component'
import { WidTypeAComponent } from './components/wid-type-a/wid-type-a.component'
import { WidTypeBComponent } from './components/wid-type-b/wid-type-b.component'
import { WidgetFactoryDirective } from './directives/widget-factory.directive'
import { WidgetTypeUnknownComponent } from './components/widget-type-unknown/widget-type-unknown.component'
import { MatGridListModule } from '@angular/material/grid-list'
import { ResponsiweColSizePipe } from './pipes/responsiwe-col-size.pipe'
import { WidgetBasicComponent } from './components/_reusable/widget-basic/widget-basic.component'

@NgModule({
  declarations: [
    ResponsiweColSizePipe,
    WidgetBasicComponent,
    WidgetFactoryDirective,
    WidgetFactoryDirective,
    WidgetsGridComponent,
    WidgetTypeUnknownComponent,
    WidTypeAComponent,
    WidTypeBComponent,
  ],
  exports: [WidgetsGridComponent],
  imports: [CommonModule, MatGridListModule],
})
export class WidgetsModule {}
