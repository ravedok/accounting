import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTachometerAlt, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from '../movements/movements.reducer';
import { selectMovementsBalance } from '../movements/movements.selectors';
import { Label, SingleDataSet, Colors, Color } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'Inicio';
  icon = 'tachometer-alt';

  incomes: number;
  expenses: number;

  doughnutChartLabels: Label[] = ['Ingresos', 'Gastos'];
  doughnutChartData: SingleDataSet = [];
  doughnutCartColors: Color[] = [
    {
      backgroundColor: ['#28a745', '#dc3545']
    }
  ];

  constructor(private store: Store<AppState>) {
    library.add(faTachometerAlt, faEuroSign);
  }

  ngOnInit() {
    this.store
      .select(selectMovementsBalance)
      .subscribe(({ incomes, expenses }) => {
        this.incomes = incomes;
        this.expenses = expenses;

        this.doughnutChartData = [this.incomes, this.expenses];
      });
  }
}
