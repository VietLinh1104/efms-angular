import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Pageable, PageTransactions, ResponsePageTransactions, TransactionAPIService, Transactions } from "src/app/data-access/api"; // <-- Đảm bảo Transaction được import
import { Observable, map } from "rxjs";
import { ZardTableComponent  } from "@shared/components/table/table.component";

@Component({
  selector: 'test-api',
  standalone: true,
  imports: [CommonModule,ZardTableComponent  ],
  templateUrl: './testApi.html'
})
export class TestApi implements OnInit {

  data!: Observable<ResponsePageTransactions>;
  
  // SỬA ĐỔI: Thay đổi kiểu từ PageTransactions sang Transaction[]
  transactionsContent$!: Observable<PageTransactions>; 

  pagination: Pageable = {
    page: 1,
    size: 4
  };

  constructor(private transactionsService: TransactionAPIService) {
  } 

  ngOnInit(): void {
    this.data = this.transactionsService.getAllTransactions(this.pagination);
    
    // **LOGIC ĐÃ ĐÚNG:** Trả về mảng (Transaction[])
    this.transactionsContent$ = this.data.pipe(
      map(response => response.data as PageTransactions)
    );
  }

  prevPage() {
    if (this.pagination.page! > 0) {
      this.pagination.page!--;
      this.data = this.transactionsService.getAllTransactions(this.pagination);
      this.transactionsContent$ = this.data.pipe(
        map(response => response.data as PageTransactions)
      );
    }
  }

  nextPage() {
    this.pagination.page!++;
    this.data = this.transactionsService.getAllTransactions(this.pagination);
    this.transactionsContent$ = this.data.pipe(
      map(response => response.data as PageTransactions)
    );
  }
}