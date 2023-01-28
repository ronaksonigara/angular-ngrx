import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { Auth_STATE_NAME } from "./state/auth.selectors";
import { authReducer } from "./state/auth.reducer";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(Auth_STATE_NAME, authReducer),
    AuthRoutingModule,
  ],
})
export class AuthModule {}
