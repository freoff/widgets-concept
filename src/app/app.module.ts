import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { WidgetsModule } from './widgets/widgets.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, WidgetsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
