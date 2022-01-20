import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "../../core/services";

@Component({
  selector: "app-logs",
  templateUrl: "./logs.component.html",
  styleUrls: ["./logs.component.scss"],
})
export class LogsComponent implements OnInit {
  logs: string = "this is initial string";
  constructor(
    private router: Router,
    private electronService: ElectronService
  ) {}

  ngOnInit(): void {
    this.electronService.fetchApplicationLog().then((result) => {
      console.log({ result });
      // let parsed = JSON.parse(result);
      // console.log({ parsed });
      this.logs = result.message;
    });
  }

  backToConvert() {
    this.router.navigate(["single-mmt"]);
  }
}
