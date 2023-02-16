import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
} from 'rxjs';
import { CompanyListService } from 'src/app/core/services/company-list.service';
import { CompanyInfo } from 'src/app/core/services/interfaces';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAutocompleteComponent),
      multi: true,
    },
  ],
})
export class InputAutocompleteComponent
  implements AfterViewInit, ControlValueAccessor
{
  public companyName = new FormControl('');
  public list$!: Observable<CompanyInfo[]>;
  public onChange: any;
  public onTouch: any;

  @Input() autoFocus = false;
  @Input() edit = false;
  @Input() isDisabled = false;
  @Input() placeholder = '';
  @Input() inputType = 'text';
  @Input() tabIndex = 1;

  @ViewChild('input', { static: false })
  input!: ElementRef;

  @HostListener('document:click', ['$event'])
  clickOutComponent(event: { target: any }) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.list$ = of([]);
      this.subscribeOnControl();
    }
  }

  constructor(
    private companyListService: CompanyListService,
    private eRef: ElementRef
  ) {
    this.subscribeOnControl();
  }

  ngAfterViewInit() {
    if (this.autoFocus) {
      this.onFocus();
    }
  }

  public onFocus(): void {
    this.input.nativeElement.focus();
  }

  public selectCompany(company: CompanyInfo): void {
    this.companyName.setValue(company.name);
    this.onChange(company);
    this.list$ = of([]);
    this.subscribeOnControl();
  }

  public writeValue(value: any): void {
    this.companyName.setValue(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  private subscribeOnControl(): void {
    this.list$ = this.companyName.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((res) => res !== null),
      map((res) => res!),
      switchMap((res) =>
        res.length > 0 ? this.companyListService.getCompanyNames(res) : of([])
      )
    );
  }
}
