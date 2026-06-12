import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelPrestadorComponent } from './painel-prestador.component';

describe('PainelPrestadorComponent', () => {
  let component: PainelPrestadorComponent;
  let fixture: ComponentFixture<PainelPrestadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelPrestadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PainelPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
