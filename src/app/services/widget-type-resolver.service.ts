import { Injectable } from '@angular/core'
import { WidTypeAComponent } from '../widgets/components/wid-type-a/wid-type-a.component'
import { WidTypeBComponent } from '../widgets/components/wid-type-b/wid-type-b.component'
import { WidgetTypeUnknownComponent } from '../widgets/components/widget-type-unknown/widget-type-unknown.component'

@Injectable({
  providedIn: 'root',
})
export class WidgetTypeResolverService {
  constructor() {}

  resolve(prop: string) {
    if (prop.includes('a')) return WidTypeAComponent
    if (prop.includes('b')) return WidTypeBComponent
    return WidgetTypeUnknownComponent
  }
}
