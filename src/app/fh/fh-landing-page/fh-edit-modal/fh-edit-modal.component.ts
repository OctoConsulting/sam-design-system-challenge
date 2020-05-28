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
    agencyCode: '',
    L3Code: ''
  };

  public fields: FormlyFieldConfig[] = [
    {
      key: 'fhorgname',
      type: 'input',
      templateOptions: {
        label: 'Name',
        required: true
      }
    },
    {
      key: 'dateRange',
      type: 'daterangepicker',
      templateOptions: {
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
      templateOptions: {
        label: 'Agency Code',
        required: true
      }
    },
    {
      key: 'l3Code',
      type: 'input',
      hideExpression: () => {
        const show = this.data && this.data.fhorgtype.toLowerCase() === 'office';
        return !show;
      },
      templateOptions: {
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
      const editedOrg = {...this.data, ...this.model};
      this.dialogRef.close(editedOrg)
    }
  }

  private parseData(org: Org): any {
    if (org) {
      this.model.fhorgname = org['fhorgname'];
      this.model.dateRange.fromDate = new Date(org['createddate']);
      this.model.agencyCode = org['agencycode'];
    }
  }
}
