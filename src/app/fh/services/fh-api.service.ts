import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FHSearch } from '../interface/fh-search';

@Injectable({
  providedIn: 'root'
})
export class FhApiService {

  private readonly baseUrl = '';
  private readonly apiKey = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  getOrgs(queryParams?: any): Observable<FHSearch> {
    const paramWithApiKey = {...queryParams, api_key: this.apiKey};
    return this.httpClient.get(`${this.baseUrl}`, {params: paramWithApiKey}) as Observable<FHSearch>;
  }
}
