import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { PrivateComponent } from './private/private.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { forumPageComponent } from './forum-page/forum-page.component';
import { RoleGuard } from './_guards/role.guard';
import { ConstructionPageComponent } from './construction-page/construction-page.component';

const appRoutes: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'private-area', component: PrivateComponent, canActivate: [AuthGuard, RoleGuard] },
    { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
    { path: 'forum', component: forumPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'under-construction', component: ConstructionPageComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);