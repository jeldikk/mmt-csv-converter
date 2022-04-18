import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import * as exp from "constants";
import { Subject } from "rxjs";
import { LoadingService } from "../loading.service";

import { OutputComponent } from "./output.component";

describe("OutputComponent", () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;

  let fakeLoadingService: LoadingService;

  beforeEach(async () => {
    // fakeLoadingService = jasmine.createSpyObj<LoadingService>('LoadingService', {});
    fakeLoadingService = {
      loading: new Subject<{
        isLoading: boolean;
        startedBy: "validate" | "convert";
        type: "error" | "success" | "info" | "loading";
        message: any;
      }>(),
    };

    await TestBed.configureTestingModule({
      declarations: [OutputComponent],
      providers: [
        {
          provide: LoadingService,
          useValue: fakeLoadingService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    // fakeLoadingService.loading = new Subject<{isLoading: boolean, startedBy: "validate" | "convert", type: "error" | "success" | "info" | "loading", message: any}>()
    fixture.detectChanges();
  });

  it("should create OutputComponent instance", () => {
    expect(component).toBeTruthy();
  });

  it("should have div container with class output", () => {
    const { debugElement } = fixture;

    const wrapper = debugElement.query(By.css(".output"));
    expect(wrapper).toBeTruthy();
  });

  it("should show spinner when loader published loading true and not when loading false", () => {
    const { debugElement } = fixture;
    let spinner = debugElement.query(By.css(".spnner-border"));
    expect(spinner).toBeFalsy();

    fakeLoadingService.loading.next({
      isLoading: true,
      type: "loading",
      message: "message",
    });
    fixture.detectChanges();
    spinner = debugElement.query(By.css(".spinner-border"));
    expect(spinner).toBeTruthy();
  });

  it("should render error component when operation failed", () => {
    const { debugElement } = fixture;
    let appError = debugElement.query(By.css("app-error"));
    expect(appError).toBeFalsy();

    fakeLoadingService.loading.next({
      isLoading: false,
      type: "error",
      message: "error message",
    });
    fixture.detectChanges();
    appError = debugElement.query(By.css("app-error"));
    expect(appError).toBeTruthy();
  });

  it("should render success component when operation is success", () => {
    const { debugElement } = fixture;
    let appSuccess = debugElement.query(By.css("app-success"));
    expect(appSuccess).toBeFalsy();

    fakeLoadingService.loading.next({
      isLoading: false,
      type: "success",
      message: "success-message",
    });
    fixture.detectChanges();
    appSuccess = debugElement.query(By.css("app-success"));
    expect(appSuccess).toBeTruthy();
  });

  it("should render info component when validate success", () => {
    const { debugElement } = fixture;
    let appInfo = debugElement.query(By.css("app-info"));
    expect(appInfo).toBeFalsy();

    fakeLoadingService.loading.next({
      isLoading: false,
      type: "info",
      message: {},
    });
    fixture.detectChanges();
    appInfo = debugElement.query(By.css("app-info"));
    expect(appInfo).toBeTruthy();
  });

  it("should update data when loading subject publishes new item", () => {
    fakeLoadingService.loading.next({
      isLoading: true,
      type: "loading",
      message: "message",
    });
    fixture.detectChanges();
    expect(component.loading).toEqual(true);
    expect(component.type).toEqual("loading");
    expect(component.data).toEqual("message");
  });
});
