import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidTypeBComponent } from './wid-type-b.component'

describe('WidTypeBComponent', () => {
  let component: WidTypeBComponent
  let fixture: ComponentFixture<WidTypeBComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidTypeBComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WidTypeBComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
