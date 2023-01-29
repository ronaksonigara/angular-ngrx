import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { StoreModule } from '@ngrx/store';
// import { AUTH_STATE_NAME } from './state/auth.selectors';
// import { authReducer } from './state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
// import { AuthEffects } from './state/auth.effects';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // EffectsModule.forFeature(),
    // StoreModule.forFeature(AUTH_STATE_NAME, authReducer),
    AuthRoutingModule,
  ],
})
export class AuthModule {}
