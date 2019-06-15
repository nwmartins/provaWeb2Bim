import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinaListComponent } from './vacina-list.component';

describe('VacinaListComponent', () => {
  let component: VacinaListComponent;
  let fixture: ComponentFixture<VacinaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacinaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
