import { Component, HostBinding, Input, OnInit } from '@angular/core'
import { WidgetConfiguration } from '../../../services/widget-definitions.service'
import { Widget } from '../../../widget-definition'

@Component({
  selector: 'app-wid-type-a',
  templateUrl: './wid-type-a.component.html',
  styleUrls: ['./wid-type-a.component.sass'],
})
export class WidTypeAComponent implements OnInit, Widget {
  @HostBinding('class')
  classes = 'widget'
  @Input()
  widgetConfiguration!: WidgetConfiguration
  constructor() {}

  ngOnInit(): void {}
}
