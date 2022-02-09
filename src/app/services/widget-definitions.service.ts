import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

export interface WidgetConfiguration {
  typeProp: {
    width: number
    height: number
    prop: string
  } & Record<string, any>
}

@Injectable({
  providedIn: 'root',
})
export class WidgetDefinitionsService {
  constructor() {}

  get(): Observable<WidgetConfiguration[]> {
    return of([
      { typeProp: { prop: 'xxaxx', value: 'someValueFor', width: 4, height: 1 } },
      { typeProp: { prop: 'xxaxx', value: 'someValueFor', width: 4, height: 1 } },
      { typeProp: { prop: 'xxaxx', value: 'someValueFor', width: 4, height: 1 } },
      { typeProp: { prop: 'xxaxx', value: 'someValueFor', width: 4, height: 1 } },
      { typeProp: { prop: 'xxbxx', value: 'someValueFor', width: 8, height: 2 } },
      { typeProp: { prop: 'xxaxx', value: 'someValueFor', width: 4, height: 1 } },
      { typeProp: { prop: 'should-a-other', value: 'someValueFor', width: 12, height: 2 } },
      { typeProp: { prop: 'unknown', value: 'this is not know widget definition', width: 4, height: 1 } },
    ])
  }
}
