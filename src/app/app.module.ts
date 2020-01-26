import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesignerComponent } from './components/designer/designer.component';
import { AddonViewerComponent } from './components/addon-viewer/addon-viewer.component';
import { HomeComponent } from './components/home/home.component';
import { SelectionComponent } from './components/selection/selection.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabProductComponent } from './components/tab-product/tab-product.component';
import { HttpClientModule } from '@angular/common/http';
import { TabAddonComponent } from './components/tab-addon/tab-addon.component';

@NgModule({
  declarations: [
    AppComponent,
    DesignerComponent,
    AddonViewerComponent,
    HomeComponent,
    SelectionComponent,
    TabsComponent,
    TabProductComponent,
    TabAddonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
