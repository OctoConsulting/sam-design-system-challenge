export interface Org {
  agencycode: string;
  cgaclist: any[];
  createdBy: string;
  createdDate: Date;
  fhagencyorgname: string;
  fhdeptindagencyorgid: number;
  fhorgid: number;
  fhorgnamehistory: {fhorgname: string; effectivedate: Date}[];
  fhorgparenthistory: {effectivedate: Date; fhfullparentpathid: string; fhfullparentpathname: string}[];
  fhfullparentpathid: string;
  fhfullparentpathname: string;
  fhorgtype: string;
  lastupdateddate: Date;
  status: string;
  updatedby: string;
  fhorgname: string;
  effectivestartdate: string;
  aacofficecode?: string;
}
