import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AltaCalendarioPage } from './alta-calendario.page';

describe('AltaCalendarioPage', () => {
  let component: AltaCalendarioPage;
  let fixture: ComponentFixture<AltaCalendarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaCalendarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AltaCalendarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
