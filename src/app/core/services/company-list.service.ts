import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyInfo } from './interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompanyListService {
  constructor(private http: HttpClient) {}

  private baseURl = 'https://autocomplete.clearbit.com/v1/companies';

  public getCompanyNames(companyName: string): Observable<CompanyInfo[]> {
    return this.http.get<CompanyInfo[]>(
      `${this.baseURl}/suggest?query=${companyName}`
    );
  }
}
