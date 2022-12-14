import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'records-made',
    loadChildren: () => import('./records-made/records-made.module').then( m => m.RecordsMadePageModule)
  },
  {
    path: 'building-page',
    loadChildren: () => import('./building-page/building-page.module').then( m => m.BuildingPagePageModule)
  },
  {
    path: 'register-tasks',
    loadChildren: () => import('./register-tasks/register-tasks.module').then( m => m.RegisterTasksPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
