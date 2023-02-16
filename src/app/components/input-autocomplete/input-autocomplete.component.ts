import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { CompanyListService } from 'src/app/core/services/company-list.service';
import { CompanyInfo } from 'src/app/core/services/interfaces';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAutocompleteComponent {
  public companyName = new FormControl('');
  public list$!: Observable<CompanyInfo[]>;

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.subscribeOnControl();
    }
  }

  constructor(
    private companyListService: CompanyListService,
    private eRef: ElementRef
  ) {
    this.subscribeOnControl();
  }

  public selectCompany(company: CompanyInfo): void {
    this.companyName.setValue(company.name);
    this.subscribeOnControl();
  }

  private subscribeOnControl(): void {
    this.list$ = of([]);
    this.list$ = this.companyName.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((res) => console.log(res)),
      filter((res) => res !== null),
      map((res) => res!),
      switchMap((res) =>
        res.length > 0 ? this.companyListService.getCompanyNames(res) : of([])
      )
    );
  }
}
