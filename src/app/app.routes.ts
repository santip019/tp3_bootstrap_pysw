import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Destinos } from './pages/destinos/destinos';
import { Precios } from './pages/precios/precios';
import { Blog } from './pages/blog/blog';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'destinos', component: Destinos },
    { path: 'precios', component: Precios },
    { path: 'blog', component: Blog },
];