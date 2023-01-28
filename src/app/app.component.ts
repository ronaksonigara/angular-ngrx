import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import {
  getErrorMessage,
  getLoadingSpinner,
} from './store/shared/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showLoader$: Observable<boolean> | undefined;
  errorMessage$: Observable<string> | undefined;
  constructor(private store: Store<AppState>) {
    this.showLoader$ = this.store.select(getLoadingSpinner);
    this.errorMessage$ = this.store.select(getErrorMessage);
  }
}
