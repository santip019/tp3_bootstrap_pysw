import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Destinos } from './pages/destinos/destinos';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'destinos', component: Destinos },
];