import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      licenseNo:                    [''],
      periodOfValidity:             [''],
      nameOfShip:                   [''],
      callSign:                     [''],
      ownerOfShip:                  [''],
      publicCorrespondenceCategory: [''],
      marinaRegistration:           [''],
      marinaClass:                  [''],
      grossTonnage:                 [''],
      keel:                         [''],
      mainTxParticulars:            [''],
      mainTxPower:                  [''],
      mainTxEmission:               [''],
      mainTxFrequency:              [''],
      emergencyTxParticulars:       [''],
      emergencyTxPower:             [''],
      emergencyTxEmission:          [''],
      emergencyTxFrequency:         [''],
      survivalTxParticulars:        [''],
      survivalTxPower:              [''],
      survivalTxEmission:           [''],
      survivalTxFrequency:          [''],
      transceiverReceiversParticulars: [''],
      transceiverReceiversPower:       [''],
      autoAlarmParticulars:         [''],
      rdfParticulars:               [''],
      radarParticulars:             [''],
      issuedOn:                     [''],
      cnNumber:                     [''],
      officialReceipt:              [''],
      amount:                       [''],
      datePaid:                     [''],
    });
  }

  cancel(): void {
    this.form.reset();
  }

  submit(): void {
    this.router.navigate(['/license'], { state: { formData: this.form.value } });
  }

  submitPrintData(): void {
    this.router.navigate(['/license'], { state: { formData: this.form.value, printData: true } });
  }
}
