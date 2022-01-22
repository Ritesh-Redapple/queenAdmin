import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../@vex/layout/layout.component';
import { VexRoutes } from '../@vex/interfaces/vex-route.interface';
import { AuthGuard } from '../app/pages/auth/auth.guard';

const childrenRoutes: VexRoutes = [
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: 'dashboards/analytics',
    pathMatch: 'full',
  },
  {
    path: 'dashboards/analytics',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboards/dashboard-analytics/dashboard-analytics.module').then(m => m.DashboardAnalyticsModule),
  },
  {
    path: 'playerlist',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/playerlist/playerlist.module').then(m => m.PlayerlistModule),
  },
  
  {
    path: 'statistics',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/statistics/statistics.module').then(m => m.StatisticsModule),
  },
  {
    path: 'tournaments',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tournament/tournament.module').then(m => m.TournamentModule),
  },
  {
    path: 'nlh_tables',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/nlh-tables/nlh-tables.module').then(m => m.NlhTableModule),
  },
  {
    path: 'transactions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionModule),
  },
  {
    path: 'country',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/countrylist/countrylist.module').then(m => m.CountryModule),
    
  },
  {
    path: 'coin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/coin/coin.module').then(m => m.CoinModule),
    
  },
  
  {
    path: 'withdrawcoin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/withdrawcoin/coin.module').then(m => m.CoinModule),
    
  },
  {
    path: 'agent',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/agent/agent.module').then(m => m.AgentModule),
    
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
  },
   {
    path: 'user-management',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
  },
  
  {
    path: 'tournamenthistory',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tournament-history/tournament.module').then(m => m.TournamentModule),
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule),
  },
];
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },  
  {
    path: '',
    component: LayoutComponent,
    children: childrenRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
