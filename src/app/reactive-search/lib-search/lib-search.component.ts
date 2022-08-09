import { HttpClient } from '@angular/common/http';
import { ReactiveSearchService } from './../service/reactive-search.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, EMPTY, map, tap } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any> = EMPTY;
  total: number = 0;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {
      this.results$ = this.httpClient
        .get(
          this.SEARCH_URL +
            '?fields=' + fields + '&sarch=' + value
        )
        .pipe(
          tap((response: any) => (this.total = response.total)),
          map((response: any) => response.results)
        );
    }
  }
}
