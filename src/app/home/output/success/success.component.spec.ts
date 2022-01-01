import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SuccessComponent } from './success.component';

describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
    component.message = "success-message"
    fixture.detectChanges();
  });

  it('should create SuccessComponent instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have a div container with class .success', ()=>{
    const {debugElement} = fixture;

    const wrapper = debugElement.query(By.css('.success'));
    expect(wrapper).toBeTruthy();
  });

  it('should have a .alert-success', ()=>{
    const {debugElement} = fixture;

    const alert = debugElement.query(By.css('.alert-success'));
    expect(alert).toBeTruthy();
  });

  it('should have a .message', ()=>{
    const {debugElement} = fixture;

    const message = debugElement.query(By.css('.message'));
    expect(message.nativeElement.textContent).toEqual('success-message')
  })
});
