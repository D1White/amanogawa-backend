import { Controller, Get, Query } from '@nestjs/common';

import { SearchParams } from './dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query() params: SearchParams) {
    return this.searchService.search(params?.search || '');
  }
}
