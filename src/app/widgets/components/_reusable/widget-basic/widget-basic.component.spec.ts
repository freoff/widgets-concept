import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetBasicComponent } from './widget-basic.component'

describe('WidgetBasicComponent', () => {
  let component: WidgetBasicComponent
  let fixture: ComponentFixture<WidgetBasicComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetBasicComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetBasicComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
