import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { FolderStorageComponent } from "./folder-storage/folder-storage.component";


const appRoutes: Routes = [
  { path: '', component: FolderStorageComponent },
  { path: '**', component: FolderStorageComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}