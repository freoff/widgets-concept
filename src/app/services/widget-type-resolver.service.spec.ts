import { TestBed } from '@angular/core/testing'

import { WidgetTypeResolverService } from './widget-type-resolver.service'

describe('WidgetTypeResolverService', () => {
  let service: WidgetTypeResolverService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(WidgetTypeResolverService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
