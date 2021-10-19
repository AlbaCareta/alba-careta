import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecteComponent } from './projecte.component';

describe('ProjecteComponent', () => {
  let component: ProjecteComponent;
  let fixture: ComponentFixture<ProjecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjecteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
