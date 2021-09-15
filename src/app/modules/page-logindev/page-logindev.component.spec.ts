import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLogindevComponent } from './page-logindev.component';

describe('PageLogindevComponent', () => {
  let component: PageLogindevComponent;
  let fixture: ComponentFixture<PageLogindevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLogindevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogindevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
