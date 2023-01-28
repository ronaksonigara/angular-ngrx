import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { AppState } from "src/app/store/app.state";
import { changeChannelName, customIncrement } from "../state/counter.actions";
import { getChannelName } from "../state/counter.selectors";
import { CounterState } from "../state/counter.state";

@Component({
  selector: "app-custom-counter-input",
  templateUrl: "./custom-counter-input.component.html",
  styleUrls: ["./custom-counter-input.component.scss"],
})
export class CustomCounterInputComponent implements OnInit {
  value: number | undefined;

  // channelName: string | undefined;

  channelName$: Observable<string> | undefined;

  channelNameSubscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.channelNameSubscription = this.store
    //   .select(getChannelName)
    //   .subscribe((channelName) => {
    //     console.log("channel name");
    //     this.channelName = channelName;
    //   });

    this.channelName$ = this.store.select(getChannelName);
  }

  onAdd() {
    this.store.dispatch(customIncrement({ count: +(this?.value || 0) }));
  }

  onChangeChannelName() {
    this.store.dispatch(changeChannelName());
  }
}
