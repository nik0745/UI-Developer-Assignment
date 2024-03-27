import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AllprofileComponent } from './allprofile/allprofile.component';

const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent },
  {path:'', component: HomeComponent},
  {path:'allprofile', component: AllprofileComponent},
  {path:"home",component:HomeComponent},
  {path:'updateuser/:id', component: UpdateUserComponent },
  {path:'updatepic/:id', component:UpdateProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
