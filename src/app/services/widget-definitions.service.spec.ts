import { TestBed } from '@angular/core/testing'

import { WidgetDefinitionsService } from './widget-definitions.service'

describe('WidgetDefinitionsService', () => {
  let service: WidgetDefinitionsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(WidgetDefinitionsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
