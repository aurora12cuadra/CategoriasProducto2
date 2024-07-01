import { CategoriasComponent } from './categorias/categorias.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'/home',
        pathMatch: 'full'
    },

    {
        path:'home',
        component: HomeComponent,
    },
    {
        path:'operaciones',
        component: OperacionesComponent,
    },
    {
        path:'categorias',
        component: CategoriasComponent,
    },
    {
        path:'productos',
        component: CategoriaFormComponent,
    }
        
];
