import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {WorkerCommunicationService} from './services/worker-communication.service';
import {MainThreadComponent} from "./components/main-thread/main-thread.component";
import {AppComponent} from "./app.component";
import {LastTenElementsComponent} from "./components/last-ten-elements/last-ten-elements.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FloatPipe} from "./pipes/float.pipe";

@NgModule({
  declarations: [
    MainThreadComponent,
    LastTenElementsComponent,
    AppComponent,
    FloatPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    WorkerCommunicationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
