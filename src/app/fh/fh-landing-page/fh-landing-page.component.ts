import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FHSearch } from '../interface/fh-search';
import { FhSearchService } from '../services/fh-search.service';
import { PaginationModel } from '@gsa-sam/components/lib/pagination/model/paginationModel';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { SdsDialogService } from '@gsa-sam/components';
import { FhEditModalComponent } from './fh-edit-modal/fh-edit-modal.component';
import { FHSort } from '../interface/fh-sort';

@Component({
  selector: 'app-fh-landing-page',
  templateUrl: './fh-landing-page.component.html',
  styleUrls: ['./fh-landing-page.component.scss']
})
export class FhLandingPageComponent implements OnInit, OnDestroy {
  public loading = true;
  searchResults: FHSearch;
  paginationModel: PaginationModel = {
    pageNumber: 1,
    pageSize: 25,
    totalPages: undefined
  };
  sortBy: FHSort;

  private unsub$ = new Subject();

  constructor(
    public modal: SdsDialogService,
    private fhSearchService: FhSearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.fhSearchService.get()
    .pipe(takeUntil(this.unsub$))
    .subscribe(
      results => {
        this.loading = false;
        this.paginationModel.totalPages = Math.ceil(results.totalrecords / this.paginationModel.pageSize);
        this.searchResults = results;
      }
    );

    this.activatedRoute.queryParams
    .pipe(takeUntil(this.unsub$))
    .subscribe((params) => {
      this.loading = true;
      this.fhSearchService.search(params);
    });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  search(queryParams?: any) {
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

    modalRef.afterClosed().subscribe(editedData => this.fhSearchService.editOrg(editedData));
  }

  onSortChange($event: FHSort) {
    this.sortBy = $event;
    this.fhSearchService.sort($event);
  }
}
