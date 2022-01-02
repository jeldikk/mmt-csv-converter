import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

export interface ILoaderMessage {
  isLoading: boolean;
  type: "error" | "success" | "info" | "loading";
  message: any;
}

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  loading = new Subject<ILoaderMessage>();

  constructor() {}
}
