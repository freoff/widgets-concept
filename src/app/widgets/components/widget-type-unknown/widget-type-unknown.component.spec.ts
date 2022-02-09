import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WidgetTypeUnknownComponent } from './widget-type-unknown.component'

describe('WidgetTypeUnknownComponent', () => {
  let component: WidgetTypeUnknownComponent
  let fixture: ComponentFixture<WidgetTypeUnknownComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetTypeUnknownComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTypeUnknownComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
