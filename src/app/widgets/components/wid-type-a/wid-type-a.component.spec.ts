import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidTypeAComponent } from './wid-type-a.component'

describe('WidTypeAComponent', () => {
  let component: WidTypeAComponent
  let fixture: ComponentFixture<WidTypeAComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidTypeAComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WidTypeAComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
