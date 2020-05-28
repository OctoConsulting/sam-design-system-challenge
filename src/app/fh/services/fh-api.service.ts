import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FHSearch } from '../interface/fh-search';

@Injectable({
  providedIn: 'root'
})
export class FhApiService {

  private readonly baseUrl = 'https://api.sam.gov/prod/federalorganizations/v1/';
  private readonly apiKey = '5fhWziQ3OwwABsajnkzBLGjUgwwcC4cevF6crKGP';

  constructor(
    private httpClient: HttpClient
  ) { }

  getOrgs(queryParams?: any): Observable<FHSearch> {
    const paramWithApiKey = {...queryParams, api_key: this.apiKey};
    return this.httpClient.get(`${this.baseUrl}/orgs`, {params: paramWithApiKey}) as Observable<FHSearch>;
  }
}
