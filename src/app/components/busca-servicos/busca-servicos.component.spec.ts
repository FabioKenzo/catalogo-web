import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaServicosComponent } from './busca-servicos.component';

describe('BuscaServicosComponent', () => {
  let component: BuscaServicosComponent;
  let fixture: ComponentFixture<BuscaServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaServicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscaServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
