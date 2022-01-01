import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { SingleMmtComponent } from "./single-mmt.component";
import { TranslateModule } from "@ngx-translate/core";
import { RouterTestingModule } from "@angular/router/testing";

describe("HomeComponent", () => {
  let component: SingleMmtComponent;
  let fixture: ComponentFixture<SingleMmtComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SingleMmtComponent],
        imports: [TranslateModule.forRoot(), RouterTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
