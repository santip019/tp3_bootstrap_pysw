import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Destinos } from './pages/destinos/destinos';
import { Precios } from './pages/precios/precios';
import { Blog } from './pages/blog/blog';
import { Phishing } from './pages/phishing/phishing';
import { Agencias } from './pages/agencias/agencias';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'destinos', component: Destinos },
    { path: 'precios', component: Precios },
    { path: 'blog', component: Blog },
    { path: 'agencias', component: Agencias },
    { path: 'contacto', component: Contacto },
    { path: 'phishing', component: Phishing },
];