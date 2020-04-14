import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from '@akfe/core/constants/routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ROUTES)]
})
export class CoreModule {}
