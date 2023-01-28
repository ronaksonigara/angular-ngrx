import { Component, OnDestroy, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { AppState } from "src/app/store/app.state";
import { getCounter } from "../state/counter.selectors";
// import { CounterState } from "../state/counter.state";

@Component({
  selector: "app-counter-output",
  templateUrl: "./counter-output.component.html",
  styleUrls: ["./counter-output.component.scss"],
})
export class CounterOutputComponent implements OnInit {
  counter: number | undefined;

  counter$: Observable<number> | undefined;

  // counterSubscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.counterSubscription = this.store
    //   .select(getCounter)
    //   .subscribe((counter) => {
    //     console.log("Counter Observable called");
    //     this.counter = counter;
    //   });

    /**
     * https://medium.com/angular-in-depth/angular-question-rxjs-subscribe-vs-async-pipe-in-component-templates-c956c8c0c794
     */

    this.counter$ = this.store.select(getCounter);
  }

  // ngOnDestroy(): void {
  //   this.counterSubscription.unsubscribe();
  // }
}
