import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ship-station-license',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ship-station-license.component.html',
  styleUrls: ['./ship-station-license.component.scss']
})
export class ShipStationLicenseComponent implements OnInit {

  form!: FormGroup;
  isReadonly  = false;
  isPreview   = false;  // preview mode: readonly + paper-only view

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.patchSampleData();
  }

  // ── Form construction ──────────────────────────────────────────────────────
  private buildForm(): void {
    this.form = this.fb.group({
      // Basic fields
      licenseNo:        [''],
      periodOfValidity: [''],

      // Table 1 – Ship info
      nameOfShip:       [''],
      callSign:         [''],
      ownerOfShip:      [''],
      publicCorrespondenceCategory: [''],

      // Marina row – between Table 1 and Table 2
      marinaRegistration: [''],
      marinaClass:        [''],
      grossTonnage:       [''],
      keel:               [''],

      // Table 2 – Row 5: Main Transmitter(s)
      mainTxParticulars: [''],
      mainTxPower:       [''],
      mainTxEmission:    [''],
      mainTxFrequency:   [''],

      // Table 2 – Row 6: Emergency Transmitter(s)
      emergencyTxParticulars: [''],
      emergencyTxPower:       [''],
      emergencyTxEmission:    [''],
      emergencyTxFrequency:   [''],

      // Table 2 – Row 7: Survival Craft Transmitter(s)
      survivalTxParticulars: [''],
      survivalTxPower:       [''],
      survivalTxEmission:    [''],
      survivalTxFrequency:   [''],

      // Table 2 – Row 8: Other Equipment sub-rows
      transceiverReceiversParticulars: [''],
      transceiverReceiversPower:       [''],
      transceiverReceiversEmission:    [''],
      transceiverReceiversFrequency:   [''],

      autoAlarmParticulars: [''],
      autoAlarmPower:       [''],
      autoAlarmEmission:    [''],
      autoAlarmFrequency:   [''],

      rdfParticulars: [''],
      rdfPower:       [''],
      rdfEmission:    [''],
      rdfFrequency:   [''],

      radarParticulars: [''],
      radarPower:       [''],
      radarEmission:    [''],
      radarFrequency:   [''],

      // Bottom fields
      issuedOn:        [''],
      cnNumber:        [''],
      officialReceipt: [''],
      amount:          [''],
      datePaid:        [''],
    });
  }

  // ── Sample data for testing ────────────────────────────────────────────────
  patchSampleData(): void {
    this.form.patchValue({
      licenseNo:        '',
      periodOfValidity: '',
      nameOfShip:       '',
      callSign:         '',
      ownerOfShip:      '',
      publicCorrespondenceCategory: '',
      mainTxParticulars: '',
      mainTxPower:       '',
      mainTxEmission:    '',
      mainTxFrequency:   '',
      emergencyTxParticulars: '',
      emergencyTxPower:       '',
      emergencyTxEmission:    '',
      emergencyTxFrequency:   '',
      issuedOn: '',
      cnNumber:  '',
    });
  }

  // ── Toggle readonly / edit mode ────────────────────────────────────────────
  toggleMode(): void {
    this.isReadonly = !this.isReadonly;
    if (this.isReadonly) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  // ── Preview mode ──────────────────────────────────────────────────────────
  togglePreview(): void {
    this.isPreview = !this.isPreview;
    if (this.isPreview) {
      this.isReadonly = true;
      this.form.disable();
    } else {
      this.isReadonly = false;
      this.form.enable();
    }
  }

  // ── Print full form (with template) ───────────────────────────────────────
  print(): void {
    window.print();
  }

  // ── Print data only (values aligned on invisible template) ────────────────
  printDataOnly(): void {
    document.body.classList.add('print-data-only');
    window.print();
    window.addEventListener('afterprint', () => {
      document.body.classList.remove('print-data-only');
    }, { once: true });
  }
}
