import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-widget-basic',
  templateUrl: './widget-basic.component.html',
  styleUrls: ['./widget-basic.component.sass'],
})
export class WidgetBasicComponent implements OnInit {
  @Input()
  value: string
  constructor() {}

  ngOnInit(): void {}
}
