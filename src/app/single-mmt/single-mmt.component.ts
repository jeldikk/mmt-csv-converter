import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ElectronService } from "../core/services";
import { LoadingService } from "./loading.service";

@Component({
  selector: "app-single-mmt",
  templateUrl: "./single-mmt.component.html",
  styleUrls: ["./single-mmt.component.scss"],
})
export class SingleMmtComponent implements OnInit, OnDestroy {
  inputForm: FormGroup;
  interval: any;
  updatedTime: Date;
  validationError = false;

  constructor(
    private loadingService: LoadingService,
    private electronService: ElectronService
  ) {}

  ngOnInit(): void {
    console.log("HomeComponent INIT");

    this.inputForm = new FormGroup({
      mmtFilePath: new FormControl("", [Validators.required]),
      outputFolderPath: new FormControl("", [Validators.required]),
    });

    this.interval = setInterval(() => {
      this.updatedTime = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    // this.loadingSubscription.unsubscribe();
    console.log("home component destroyed");
    clearInterval(this.interval);
  }

  convertFile() {
    const { mmtFilePath, outputFolderPath } = this.inputForm.value;
    this.loadingService.loading.next({
      isLoading: true,
      type: "loading",
      message: "converting .mmt to csv",
    });

    this.electronService
      .convertFile(mmtFilePath, outputFolderPath)
      .then((response) => {
        const { status } = response;
        if (status === "error") {
          this.validationError = true;
          this.loadingService.loading.next({
            isLoading: false,
            type: "error",
            message: response.message,
          });
        } else {
          this.validationError = false;
          this.loadingService.loading.next({
            isLoading: false,
            type: "success",
            message: response.message,
          });
        }
      })
      .catch((err) => {
        this.loadingService.loading.next({
          isLoading: false,
          type: "error",
          message: "naa thokka",
        });
      });
  }

  validateFile() {
    const { mmtFilePath } = this.inputForm.value;

    this.loadingService.loading.next({
      isLoading: true,
      type: "loading",
      message: "Validation and Retrieving Info from mmt file",
    });

    this.electronService
      .validateFile(mmtFilePath)
      .then((response) => {
        const { status } = response;
        if (status === "error") {
          this.validationError = true;
          this.loadingService.loading.next({
            isLoading: false,
            type: "error",
            message: response.message,
          });
        } else {
          this.validationError = false;
          this.loadingService.loading.next({
            isLoading: false,
            type: "info",
            message: response,
          });
        }
      })
      .catch((_) => {
        this.loadingService.loading.next({
          isLoading: false,
          type: "error",
          message: "Error occured while validating input file",
        });
      });
  }

  selectFileDialog() {
    this.electronService
      .openFileDialog("openFile", "select .mmt file")
      .then((result) => {
        const { canceled, filePaths } = result;
        if (!canceled) {
          this.inputForm.get("mmtFilePath").setValue(filePaths[0]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  selectFolderDialog() {
    this.electronService
      .openFileDialog("openDirectory", "select output folder")
      .then((result) => {
        const { canceled, filePaths } = result;
        if (!canceled) {
          this.inputForm.get("outputFolderPath").setValue(filePaths[0]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  openGithub(event: Event) {
    event.preventDefault();
    this.electronService.openGithubCode();
  }
}
