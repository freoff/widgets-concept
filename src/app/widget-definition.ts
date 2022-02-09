import { Component } from '@angular/core'
import { WidTypeAComponent } from './widgets/components/wid-type-a/wid-type-a.component'
import { WidgetConfiguration } from './services/widget-definitions.service'

export interface Widget {
  widgetConfiguration: WidgetConfiguration
}

export interface WidgetDefinition {
  widgetConfiguration: WidgetConfiguration
  component: new (...args: any[]) => Widget
}
