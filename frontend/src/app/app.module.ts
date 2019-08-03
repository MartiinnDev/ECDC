import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrivateComponent } from './private/private.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { forumPageComponent } from './forum-page/forum-page.component';
import { RoleGuard } from './_guards/role.guard';
import { CommentService } from './_services/comment_service';
import { MentionPipe } from './_pipes/mention.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { ConstructionPageComponent } from './construction-page/construction-page.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomePageComponent,
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        PrivateComponent,
        HomePageComponent,
        ProfilePageComponent,
        forumPageComponent,
        MentionPipe,
        FooterComponent,
        ConstructionPageComponent
    ],
    providers: [
        AuthGuard,
        RoleGuard,
        AlertService,
        AuthenticationService,
        UserService,
        CommentService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }