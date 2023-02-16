import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CompanyInfo } from 'src/app/core/services/interfaces';

@Component({
  selector: 'app-autocomplete-item',
  templateUrl: './autocomplete-item.component.html',
  styleUrls: ['./autocomplete-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteItemComponent {
  @Input() company: CompanyInfo | undefined;
  @Output() selectedCompany = new EventEmitter<CompanyInfo>();

  public companySelect(): void {
    this.selectedCompany.emit(this.company);
  }
}
