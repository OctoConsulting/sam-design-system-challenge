import { Injectable } from "@angular/core";
import { FHSearch } from '../interface/fh-search';
import { Subject } from 'rxjs';
import { FhApiService } from './fh-api.service';
import { Org } from '../interface/org';
import { FHSort } from '../interface/fh-sort';

/**
 * Main state management service for FH t2 workspace.
 * Responsible for performing search and updates to the page
 */
@Injectable()
export class FhSearchService {

  // Reference to all orgs that were edited. API does not support edit, so
  // edits are mocked
  private _editedOrgs = new Map<number, any>();

  private _searchResults: FHSearch;

  private searchResultSubject = new Subject<FHSearch>();

  // Search parameters - by default pull 25 results at a time
  private currentSearchParams: any = {
    limit: 25,
    offset: 0
  }

  private currentSortBy: FHSort = FHSort.NAME;

  constructor(
    private fhApiService: FhApiService
  ) {}

  get() {
    return this.searchResultSubject.asObservable();
  }

  search(queryParams?: any) {
    this.currentSearchParams = this.currentSearchParams ? {...this.currentSearchParams, ...queryParams} : queryParams;
    this.fhApiService.getOrgs(queryParams).toPromise().then((response) => {
      this._searchResults = response;
      this._searchResults.orglist = this.formatSearchResults(this._searchResults.orglist);
      this._searchResults.orglist
      this.searchResultSubject.next({...this._searchResults});
    });
  }

  editOrg(org: Org) {
    this._editedOrgs.set(org.fhorgid, org);
    if (this._searchResults) {
      this._searchResults.orglist = this.replaceResultsWithEditedVersions(this._searchResults.orglist);
      this._searchResults.orglist = this.sortResults(this._searchResults.orglist);
      this.searchResultSubject.next({...this._searchResults}); 
    }
  }

  sort(sortBy: FHSort) {
    this.currentSortBy = sortBy;
    let sortedSearchResults = {...this._searchResults, orglist: this.sortResults(this._searchResults.orglist)};
    this.searchResultSubject.next(sortedSearchResults);
  }

  private formatSearchResults(orglist: Org[]) {
    orglist = this.replaceResultsWithEditedVersions(orglist);
    orglist = this.sortResults(orglist);

    return orglist;
  }

  private replaceResultsWithEditedVersions(orglist: Org[]) {
    const replacedOrglist = orglist.map(result => 
      this._editedOrgs.has(result.fhorgid) ? this._editedOrgs.get(result.fhorgid) : result);
    return replacedOrglist;
  }

  /**
   * Public API does not support sorting, hence we do client side sorting on
   * whatever fraction of total results we get.
   * @param orglist 
   */
  private sortResults(orglist: Org[]) {
    switch(this.currentSortBy) {
      case FHSort.NAME:
        orglist = orglist.sort((orgA, orgB) => orgA.fhorgname.localeCompare(orgB.fhorgname));
        break;
      case FHSort.ORG_ID:
        orglist = orglist.sort((orgA, orgB) => orgA.agencycode.localeCompare(orgB.agencycode));
        break;
    }

    return orglist;
  }
}

