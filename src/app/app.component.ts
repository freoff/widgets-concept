import { Component, OnInit } from '@angular/core'
import { WidgetDefinitionsService } from './services/widget-definitions.service'
import { WidgetDefinition } from './widget-definition'
import { WidgetTypeResolverService } from './services/widget-type-resolver.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  widgetDefinitions: WidgetDefinition[]
  constructor(private api: WidgetDefinitionsService, private resolver: WidgetTypeResolverService) {}
  title = 'widget-concept'

  ngOnInit(): void {
    this.api.get().subscribe(widgetConfiguration => {
      const widgetDefinition: WidgetDefinition[] = widgetConfiguration.map(config => {
        return {
          widgetConfiguration: config,
          component: this.resolver.resolve(config.typeProp.prop),
        }
      })
      this.widgetDefinitions = widgetDefinition
    })
  }
}
