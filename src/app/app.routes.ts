import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'rooms',
        loadComponent: () => import('./features/rooms/room-list.component').then(m => m.RoomListComponent)
    },
    {
        path: 'my-bookings',
        loadComponent: () => import('./features/bookings/my-bookings.component').then(m => m.MyBookingsComponent)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
