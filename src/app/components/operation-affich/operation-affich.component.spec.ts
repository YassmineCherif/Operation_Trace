import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationListComponent } from './operation-affich.component'; 

describe('OperationAffichComponent', () => {
  let component: OperationListComponent;
  let fixture: ComponentFixture<OperationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
