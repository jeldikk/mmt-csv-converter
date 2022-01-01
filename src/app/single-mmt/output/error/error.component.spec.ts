import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    component.message = "error-message"
    fixture.detectChanges();
  });

  it('should create ErrorComponent instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have a div container with class .error', ()=>{
    const {debugElement} = fixture;

    const element = debugElement.query(By.css('.error'));
    expect(element).toBeTruthy();
  })

  it('should have bootstrap .alert', ()=>{
    const {debugElement} = fixture;

    const alert = debugElement.query(By.css('.alert'));
    expect(alert).toBeTruthy();
  })

  it('should have .message element with error text', ()=>{
    const {debugElement} = fixture;

    const messageElement = debugElement.query(By.css('.message'));
    expect(messageElement.nativeElement.textContent).toEqual('error-message');
  })
});
