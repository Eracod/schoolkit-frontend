import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormFieldComponent } from '../forms/form-field/form-field.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [FormFieldComponent, SvgIconComponent, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  @Input() placeholder = 'Search...';
  @Input() borderRadius = '';
  @Input() height = '0px';
  @Output() search = new EventEmitter<string>();

  public searchControl = new FormControl<string>('', { nonNullable: true });

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => this.search.emit(value));
  }
}
