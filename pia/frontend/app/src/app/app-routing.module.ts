import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AdminAcceptingComponent } from './admin-accepting/admin-accepting.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminAllBooksComponent } from './admin-all-books/admin-all-books.component';
import { AdminAllUsersComponent } from './admin-all-users/admin-all-users.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { HistoryRentingComponent } from './history-renting/history-renting.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RentBookComponent } from './rent-book/rent-book.component';
import { RentedBooksComponent } from './rented-books/rented-books.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'user',component:UserComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserComponent},
  {path:'admin',component:AdminComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin/adminAccepting',component:AdminAcceptingComponent},
  {path:'user/profile',component:ProfileComponent},
  {path:'admin/addUser',component:AdminAddUserComponent},
  {path:'admin/allUsers',component:AdminAllUsersComponent},
  {path:'admin/updateUser',component:AdminUpdateUserComponent},
  {path:'changePass',component:ChangePasswordComponent},
  {path:'addBook',component:AddBookComponent},
  {path:'admin/allBooks',component:AdminAllBooksComponent},
  {path:'editBook',component:EditBookComponent},
  {path:'search',component:SearchComponent},
  {path:'rentBook',component:RentBookComponent},
  {path:'rentedBooks',component:RentedBooksComponent},
  {path:'historyRenting',component:HistoryRentingComponent},
  {path:'loginAdmin',component:AdminLoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
