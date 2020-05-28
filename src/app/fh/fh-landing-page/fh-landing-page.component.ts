import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FHSearch } from '../interface/fh-search';
import { FhSearchService } from '../services/fh-search.service';
import { PaginationModel } from '@gsa-sam/components/lib/pagination/model/paginationModel';
import { tap } from 'rxjs/operators';
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
