import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { FolderStorageComponent } from './folder-storage/folder-storage.component';
import { FolderService } from "./folder-storage/folder.service";
import { ImageFolderComponent } from './image-folder/image-folder.component';
import { ImageService } from "./image-folder/image-service";
import { GalleriaModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    FolderStorageComponent,
    ImageFolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    GalleriaModule
  ],
  providers: [
    FolderService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
