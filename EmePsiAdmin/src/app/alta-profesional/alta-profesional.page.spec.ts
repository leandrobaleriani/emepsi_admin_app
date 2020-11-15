import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AltaProfesionalPage } from './alta-profesional.page';

describe('AltaProfesionalPage', () => {
  let component: AltaProfesionalPage;
  let fixture: ComponentFixture<AltaProfesionalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaProfesionalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AltaProfesionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
