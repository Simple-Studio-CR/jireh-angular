import {Routes} from '@angular/router';

const Routing: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/clients.module').then((m) => m.ClientsModule),
  },
  {
    path: 'providers',
    loadChildren: () =>
      import('./providers/providers.module').then((m) => m.ProvidersModule),
  },
  {
    path: 'items',
    loadChildren: () =>
      import('./items/items.module').then((m) => m.ItemsModule),
  },
  {
    path: 'equipment',
    loadChildren: () =>
      import('./equipment/equipment.module').then((m) => m.EquipmentModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
