import { MatButtonModule } from '@angular/material';
import { NgModule } from "@angular/core";
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';



@NgModule({
  imports: [MatButtonModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTableModule, MatBadgeModule, MatMenuModule, MatPaginatorModule, MatTooltipModule, MatTabsModule, MatSortModule, MatExpansionModule, MatCardModule],
  exports: [MatButtonModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatIconModule, MatTableModule, MatBadgeModule, MatMenuModule, MatPaginatorModule, MatTooltipModule, MatTabsModule, MatSortModule, MatExpansionModule, MatCardModule],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class MaterialModule { }