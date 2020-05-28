import { Component, OnInit, Inject } from '@angular/core';
import {
  SDS_DIALOG_DATA, SdsDialogRef
} from '@gsa-sam/components';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Org } from '../../interface/org';

@Component({
  selector: 'app-fh-edit-modal',
  templateUrl: './fh-edit-modal.component.html',
  styleUrls: ['./fh-edit-modal.component.scss']
})
export class FhEditModalComponent implements OnInit {

  public form = new FormGroup({});
  public model: any = {
    fhorgname: '',
    dateRange: {
      fromtDate: '',
      toDate: '',
    },
    agencycode: '',
    aacofficecode: ''
  };

  public fields: FormlyFieldConfig[] = [
    {
      key: 'fhorgname',
      type: 'input',
      templateOptions: {
        label: 'Name',
        description: 'Please enter the name for this organization.',
        required: true
      }
    },
    {
      key: 'dateRange',
      type: 'daterangepicker',
      templateOptions: {
        description: 'Please enter the effective start and end dates for this organization. The end date is an optional field, and can be left blank.',
        label: 'Organization Effective Dates',
        required: true
      }
    },
    {
      key: 'agencycode',
      type: 'input',
      hideExpression: () => {
        const show = this.data && this.data.fhorgtype.toLowerCase() === 'sub-tier';
        return !show;
      },
      defaultValue: this.data.agencycode,
      templateOptions: {
        maxLength: 4,
        description: 'Please provide the unique FPDS code for this Sub-Tier. The Agency code is always a 4 character code, and can be alphanumeric.',
        label: 'Agency Code',
        required: true
      }
    },
    {
      key: 'aacofficecode',
      type: 'input',
      hideExpression: () => {
        const show = this.data && this.data.fhorgtype.toLowerCase() === 'office';
        return !show;
      },
      defaultValue: this.data.aacofficecode,
      templateOptions: {
        maxLength: 6,
        description: 'Please provide the AAC code for this Office. The AAC code is always a 6 character code, and can be alphanumeric.',
        label: 'Office AAC Code',
        required: true
      }
    }
  ];

  constructor(public dialogRef: SdsDialogRef<FhEditModalComponent>, @Inject(SDS_DIALOG_DATA) public data: Org) { }

  ngOnInit() {
    this.parseData(this.data);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSave() {
    if (this.form.valid) {
      console.log(this.model);
      const formattedModel = {
        ...this.model,
        effectivestartdate: this.model.dateRange.fromDate,
        enddate: this.model.dateRange.toDate,
      }
      const editedOrg = {...this.data, ...formattedModel};
      this.dialogRef.close(editedOrg)
    }
  }

  private parseData(org: Org): any {
    if (org) {
      this.model.fhorgname = org['fhorgname'];
      this.model.dateRange.fromDate = new Date(org['effectivestartdate']);
      this.model.agencycode = org['agencycode'];
      this.model.aacofficecode = org['aacofficecode'];
    }
  }
}
