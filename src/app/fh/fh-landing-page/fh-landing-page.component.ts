import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FHSearch } from '../interface/fh-search';
import { FhSearchService } from '../services/fh-search.service';
import { PaginationModel } from '@gsa-sam/components/lib/pagination/model/paginationModel';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-fh-landing-page',
  templateUrl: './fh-landing-page.component.html',
  styleUrls: ['./fh-landing-page.component.scss']
})
export class FhLandingPageComponent implements OnInit {

  searchResults$: Observable<FHSearch>;
  paginationModel: PaginationModel = {
    pageNumber: 1,
    pageSize: 25,
    totalPages: undefined
  };

  constructor(
    private fhSearchService: FhSearchService
  ) { }

  ngOnInit() {
    this.searchResults$ = this.fhSearchService.get().pipe(
      tap((response: {totalrecords: number, orglist: any[]}) => {
        this.paginationModel.totalPages = Math.ceil(response.totalrecords / this.paginationModel.pageSize);
      })
    );
  }

  search(queryParams?: any) {
    this.fhSearchService.search(queryParams);
  }

  onPageChange($event) {
    // todo - Change page
  }

}
