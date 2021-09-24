import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdMainBannerComponent } from './ad-main-banner.component';

describe('AdMainBannerComponent', () => {
  let component: AdMainBannerComponent;
  let fixture: ComponentFixture<AdMainBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdMainBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdMainBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
