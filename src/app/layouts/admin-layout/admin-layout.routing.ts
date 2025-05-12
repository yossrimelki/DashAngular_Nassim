import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { ChatbotComponent } from '../../chatbot/chatbot.component';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PowerBiDisplayComponent } from '../../power-bi-display/power-bi-display.component';
import { RoleGuard } from '../../auth/guards/role.guard';
import { MlPageComponent } from '../../ml-page/ml-page.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
{ path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
{ path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard] },
{ path: 'table-list',     component: TableListComponent, canActivate: [AuthGuard] },
{ path: 'chatbot',        component: ChatbotComponent, canActivate: [AuthGuard] },
    { path: 'production',     component: PowerBiDisplayComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'production_manager' } },
    { path: 'marketing',      component: PowerBiDisplayComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'marketing_manager' } },
{ path: 'logistics',      component: PowerBiDisplayComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'logistics_manager' } },
{ path: 'ml', component: MlPageComponent, canActivate: [AuthGuard] },
];
