import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { WidgetDefinition } from '../../widget-definition'
import { BASE_WIDGET_HEIGHT, COLUMNS_COUNT } from '../config/widget-grid.config'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-widgets-grid',
  templateUrl: './widgets-grid.component.html',
  styleUrls: ['./widgets-grid.component.sass'],
})
export class WidgetsGridComponent implements OnInit, OnDestroy {
  @Input()
  widgetDefinitions!: WidgetDefinition[]
  height = BASE_WIDGET_HEIGHT
  columns = COLUMNS_COUNT
  currentBreakPoint: string
  private $destroyed = new Subject()
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.setCurrentBreakPoint()
    console.log('Widget grids:', this.widgetDefinitions)
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .pipe(takeUntil(this.$destroyed))
      .subscribe(result => this.setCurrentBreakPoint())
  }

  ngOnDestroy(): void {
    this.$destroyed.next()
    this.$destroyed.complete()
  }

  private setCurrentBreakPoint() {
    this.currentBreakPoint = this.breakpointObserver.isMatched(Breakpoints.Small)
      ? Breakpoints.Small
      : this.breakpointObserver.isMatched(Breakpoints.Medium)
      ? Breakpoints.Medium
      : this.breakpointObserver.isMatched(Breakpoints.Large)
      ? Breakpoints.Large
      : Breakpoints.Small
  }
}
