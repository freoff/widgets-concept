import { Pipe, PipeTransform } from '@angular/core'
import { COLUMNS_COUNT } from '../config/widget-grid.config'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Pipe({
  name: 'responsiweColSize',
  pure: false,
})
export class ResponsiweColSizePipe implements PipeTransform {
  constructor(private breakpointObserver: BreakpointObserver) {}

  transform(value: number): number {
    if (isNaN(value) || !value || value > COLUMNS_COUNT) return COLUMNS_COUNT
    return 12
  }
}
