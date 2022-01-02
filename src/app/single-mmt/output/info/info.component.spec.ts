import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InfoComponent } from './info.component';

const testInfoMessage = {
  filename: 'test_filename',
  scan_count: 23,
  beam_count: 5,
  timestamps: {
    start: Date.now().toString(),
    end: Date.now().toString()
  }
}

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    component.message = testInfoMessage
    fixture.detectChanges();
  });

  it('should create Info component', () => {
    expect(component).toBeTruthy();
  });

  it('should have div with class .info', ()=>{
    const {debugElement} = fixture;

    const wrapper = debugElement.query(By.css('.info'));
    expect(wrapper).toBeTruthy()
  });

  it('should have .alert-success', ()=>{
    const {debugElement} = fixture;

    const alert = debugElement.query(By.css('.alert-success'));
    expect(alert).toBeTruthy();
  });


});
