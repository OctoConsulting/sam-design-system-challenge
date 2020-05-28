import { Injectable } from "@angular/core";
import { FHSearch } from '../interface/fh-search';
import { Subject } from 'rxjs';
import { FhApiService } from './fh-api.service';
import { Org } from '../interface/org';

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

  private currentSearchParams: any;

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
      this._searchResults.orglist = this.replaceResultsWithEditedVersions(this._searchResults.orglist);
      this.searchResultSubject.next({...this._searchResults});
    })
  }

  editOrg(org: Org) {
    this._editedOrgs.set(org.fhorgid, org);
    if (this._searchResults) {
      this._searchResults.orglist = this.replaceResultsWithEditedVersions(this._searchResults.orglist);
      this.searchResultSubject.next({...this._searchResults}); 
    }
  }

  private replaceResultsWithEditedVersions(orglist: Org[]) {
    const replacedOrglist = orglist.map(result => 
      this._editedOrgs.has(result.fhorgid) ? this._editedOrgs.get(result.fhorgid) : result);
    return replacedOrglist;
  }

}