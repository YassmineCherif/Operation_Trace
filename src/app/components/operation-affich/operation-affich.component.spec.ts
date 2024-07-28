import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationAffichComponent } from './operation-affich.component';

describe('OperationAffichComponent', () => {
  let component: OperationAffichComponent;
  let fixture: ComponentFixture<OperationAffichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationAffichComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationAffichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
