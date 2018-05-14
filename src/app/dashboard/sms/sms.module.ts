import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsHistoryComponent } from './sms-history/sms-history.component';
import { SmsComponent } from './sms.component';
import { SmsSubNavbarComponent } from './sms-sub-navbar/sms-sub-navbar.component';
import { RouterModule } from '@angular/router';
import { SmsSettingsComponent } from './sms-settings/sms-settings.component';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { ManualSmsComponent } from './manual-sms/manual-sms.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: SmsComponent,
        children: [
          { path: 'sms-history', component:  SmsHistoryComponent},
          { path: 'sms-settings', component:  SmsSettingsComponent},
          { path: 'send-sms', component:  SendSmsComponent},
          { path: 'manual-sms', component:  ManualSmsComponent},
        ]
      },
      { path: '**', redirectTo: '/' }
    ])
  ],
  declarations: [
    SmsHistoryComponent, 
    SmsComponent, 
    SmsSubNavbarComponent, 
    SmsSettingsComponent, 
    SendSmsComponent, 
    ManualSmsComponent
  ]
})
export class SmsModule { }
