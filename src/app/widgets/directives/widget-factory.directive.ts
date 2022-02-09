import { ComponentFactoryResolver, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { WidgetDefinition } from '../../widget-definition'

@Directive({
  selector: '[widgetFactory]',
})
export class WidgetFactoryDirective implements OnInit {
  @Input()
  widgetDefinition: WidgetDefinition
  constructor(
    private vc: ViewContainerRef,
    private cfr: ComponentFactoryResolver // private template: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    const componentRef = this.vc.createComponent(this.cfr.resolveComponentFactory(this.widgetDefinition.component))
    componentRef.instance.widgetConfiguration = this.widgetDefinition.widgetConfiguration
  }
}
