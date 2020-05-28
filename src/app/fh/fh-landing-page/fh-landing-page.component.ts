import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FHSearch } from '../interface/fh-search';
import { FhSearchService } from '../services/fh-search.service';
import { PaginationModel } from '@gsa-sam/components/lib/pagination/model/paginationModel';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Org } from '../interface/org';
import { SdsDialogService } from '@gsa-sam/components';
import { FhEditModalComponent } from './fh-edit-modal/fh-edit-modal.component';

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
    public modal: SdsDialogService,
    private fhSearchService: FhSearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchResults$ = this.fhSearchService.get().pipe(
      tap((response: {totalrecords: number, orglist: any[]}) => {
        this.paginationModel.totalPages = Math.ceil(response.totalrecords / this.paginationModel.pageSize);
      })
    );

    this.activatedRoute.queryParams.subscribe((params) => {
      this.fhSearchService.search(params);
    });
  }

  search(queryParams?: any) {
    queryParams['status'] = 'INACTIVE';
    this.router.navigate(['fh'], {queryParams, queryParamsHandling: 'merge'});
  }

  onPageChange(page: PaginationModel) {
    this.paginationModel = page;
    const queryParams = {
      limit: page.pageSize,
      offset: (page.pageNumber - 1) * page.pageSize
    };

    this.search(queryParams);
  }

  onFilterChange(queryParams: any) {
    this.search(queryParams);
  }

  onEditOrg(org: any) {
    const modalRef = this.modal.open(FhEditModalComponent, {
      width: 'medium',
      data: org
    });
    modalRef.afterClosed().subscribe(editedData => this.onEditSave(editedData));
  }

  onEditSave(data: any) {
    // onEdit Save
  }

}
