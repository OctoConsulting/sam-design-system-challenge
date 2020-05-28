import { Injectable } from "@angular/core";
import { FHSearch } from '../interface/fh-search';
import { Subject } from 'rxjs';
import { FhApiService } from './fh-api.service';

/**
 * Main state management service for FH t2 workspace.
 * Responsible for performing search and updates to the page
 */
@Injectable()
export class FhSearchService {

  private _searchResult: FHSearch;

  private searchResultSubject = new Subject<FHSearch>();

  constructor(
    private fhApiService: FhApiService
  ) {}

  get() {
    return this.searchResultSubject.asObservable();
  }

  search(queryParams?: any) {
    this.fhApiService.getOrgs(queryParams).toPromise().then((response) => {
      this._searchResult = response;
      this.searchResultSubject.next(this._searchResult);
    });
  }

}
