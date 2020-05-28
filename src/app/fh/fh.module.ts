import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhLandingPageComponent } from './fh-landing-page/fh-landing-page.component';
import { Routes, RouterModule } from '@angular/router';
import { FhPageControlsComponent } from './fh-landing-page/fh-page-controls/fh-page-controls.component';
import { FhResultCardComponent } from './fh-landing-page/fh-result-card/fh-result-card.component';
import { FhFiltersComponent } from './fh-landing-page/fh-filters/fh-filters.component';
import { FhNavHeaderComponent } from './fh-landing-page/fh-nav-header/fh-nav-header.component';
import { FhSubHeaderComponent } from './fh-landing-page/fh-sub-header/fh-sub-header.component';
import { FhEditModalComponent } from './fh-landing-page/fh-edit-modal/fh-edit-modal.component';
import { PaginationModule, SdsDialogModule, } from '@gsa-sam/components';
import { FhSearchService } from './services/fh-search.service';
import { SdsAccordionModule, SdsToolbarModule, SdsSearchResultListModule, SdsSearchModule  } from '@gsa-sam/components';
import { SdsFiltersModule, SdsFormlyModule } from '@gsa-sam/sam-formly';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { SdsActionsMenuModule } from '@gsa-sam/layouts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DisableSuggestionsDirective } from '../common/directives/disable-suggestions.directive';

const routes: Routes = [
  {
    path: '',
    component: FhLandingPageComponent
  }
];

@NgModule({
  declarations: [
    FhLandingPageComponent,
    FhPageControlsComponent,
    FhResultCardComponent,
    FhFiltersComponent,
    FhNavHeaderComponent,
    FhSubHeaderComponent,
    FhEditModalComponent,
    DisableSuggestionsDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    SdsFormlyModule,
    SdsSearchResultListModule,
    SdsSearchModule,
    PaginationModule,
    SdsAccordionModule,
    SdsToolbarModule,
    SdsFiltersModule,
    SdsActionsMenuModule,
    SdsDialogModule,
    FontAwesomeModule
  ],
  entryComponents: [
    FhEditModalComponent
  ],
  providers: [
    FhSearchService
  ]
})
export class FhModule { }
