import { Component, Input, OnInit } from '@angular/core'
import { WidgetConfiguration } from '../../../services/widget-definitions.service'
import { Widget } from '../../../widget-definition'

@Component({
  selector: 'app-widget-type-unknown',
  templateUrl: './widget-type-unknown.component.html',
  styleUrls: ['./widget-type-unknown.component.sass'],
})
export class WidgetTypeUnknownComponent implements OnInit, Widget {
  @Input()
  widgetConfiguration!: WidgetConfiguration
  constructor() {}

  ngOnInit(): void {}
}
