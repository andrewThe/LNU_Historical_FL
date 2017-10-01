import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { FolderStorageComponent } from "./folder-storage/folder-storage.component";
import { ImageFolderComponent } from "./image-folder/image-folder.component";


const appRoutes: Routes = [
  { path: '', component: FolderStorageComponent },
  { path: 'folder/:id', component: ImageFolderComponent },
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{ useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}