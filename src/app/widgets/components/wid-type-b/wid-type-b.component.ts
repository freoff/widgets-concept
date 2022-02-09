import { Component, Input, OnInit } from '@angular/core'
import { WidgetConfiguration } from '../../../services/widget-definitions.service'
import { Widget } from '../../../widget-definition'

@Component({
  selector: 'app-wid-type-b',
  templateUrl: './wid-type-b.component.html',
  styleUrls: ['./wid-type-b.component.sass'],
})
export class WidTypeBComponent implements OnInit, Widget {
  @Input()
  widgetConfiguration!: WidgetConfiguration
  constructor() {}

  ngOnInit(): void {}
}
