import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent } //redirects to 404 page
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
}),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
