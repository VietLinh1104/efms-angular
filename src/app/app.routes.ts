import { Routes } from '@angular/router';
import { TestApi } from './features/test-api/testApi';

export const routes: Routes = [
    { path: '', component: TestApi, pathMatch: 'full' },
];
