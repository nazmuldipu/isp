import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsHistoryComponent } from './sms-history/sms-history.component';
import { SmsComponent } from './sms.component';
import { SmsSubNavbarComponent } from './sms-sub-navbar/sms-sub-navbar.component';
import { RouterModule } from '@angular/router';
import { SmsSettingsComponent } from './sms-settings/sms-settings.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: SmsComponent,
        children: [
          { path: 'sms-history', component:  SmsHistoryComponent},
          { path: 'sms-settings', component:  SmsSettingsComponent},
        ]
      },
      { path: '**', redirectTo: '/' }
    ])
  ],
  declarations: [
    SmsHistoryComponent, 
    SmsComponent, 
    SmsSubNavbarComponent, 
    SmsSettingsComponent
  ]
})
export class SmsModule { }
