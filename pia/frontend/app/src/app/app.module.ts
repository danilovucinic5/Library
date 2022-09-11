import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminAcceptingComponent } from './admin-accepting/admin-accepting.component';
import { ProfileComponent } from './profile/profile.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminAllUsersComponent } from './admin-all-users/admin-all-users.component';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminAllBooksComponent } from './admin-all-books/admin-all-books.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { SearchComponent } from './search/search.component';
import { RentBookComponent } from './rent-book/rent-book.component';
import { RentedBooksComponent } from './rented-books/rented-books.component';
import { HistoryRentingComponent } from './history-renting/history-renting.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    RegisterComponent,
    AdminAcceptingComponent,
    ProfileComponent,
    AddBookComponent,
    AdminAddUserComponent,
    AdminAllUsersComponent,
    AdminUpdateUserComponent,
    ChangePasswordComponent,
    AdminAllBooksComponent,
    EditBookComponent,
    SearchComponent,
    RentBookComponent,
    RentedBooksComponent,
    HistoryRentingComponent,
    HomeComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
