import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ship-station-license',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ship-station-license.component.html',
  styleUrls: ['./ship-station-license.component.scss']
})
export class ShipStationLicenseComponent implements OnInit {

  form!: FormGroup;
  isReadonly = false;
  isPreview  = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
    // Patch data passed from the edit page
    const state = history.state?.formData;
    if (state) {
      this.form.patchValue(state);
      // If print data was requested, trigger after a short delay for render
      if (history.state?.printData) {
        setTimeout(() => this.printDataOnly(), 300);
      }
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      licenseNo:        [''],
      periodOfValidity: [''],
      nameOfShip:       [''],
      callSign:         [''],
      ownerOfShip:      [''],
      publicCorrespondenceCategory: [''],
      marinaRegistration: [''],
      marinaClass:        [''],
      grossTonnage:       [''],
      keel:               [''],
      mainTxParticulars: [''],
      mainTxPower:       [''],
      mainTxEmission:    [''],
      mainTxFrequency:   [''],
      emergencyTxParticulars: [''],
      emergencyTxPower:       [''],
      emergencyTxEmission:    [''],
      emergencyTxFrequency:   [''],
      survivalTxParticulars: [''],
      survivalTxPower:       [''],
      survivalTxEmission:    [''],
      survivalTxFrequency:   [''],
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
      issuedOn:        [''],
      cnNumber:        [''],
      officialReceipt: [''],
      amount:          [''],
      datePaid:        [''],
    });
  }

  patchSampleData(): void {
    this.form.patchValue({
      licenseNo: '', periodOfValidity: '', nameOfShip: '',
      callSign: '', ownerOfShip: '', publicCorrespondenceCategory: '',
      mainTxParticulars: '', mainTxPower: '', mainTxEmission: '', mainTxFrequency: '',
      emergencyTxParticulars: '', emergencyTxPower: '', emergencyTxEmission: '', emergencyTxFrequency: '',
      issuedOn: '', cnNumber: '',
    });
  }

  toggleMode(): void {
    this.isReadonly = !this.isReadonly;
    this.isReadonly ? this.form.disable() : this.form.enable();
  }

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

  // Print full form with background/template
  print(): void {
    window.print();
  }

  // Back to edit page
  backToEdit(): void {
    this.router.navigate(['/']);
  }

  // Print data only — blank page, values in exact positions, then return to edit
  printDataOnly(): void {
    const paper = document.querySelector('.a4-paper') as HTMLElement;
    if (!paper) return;

    const paperRect = paper.getBoundingClientRect();
    const inputs = Array.from(
      paper.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')
    );

    // Build absolutely-positioned spans for each non-empty input value
    // Also track the lowest bottom edge to set exact container height
    let maxBottom = 0;
    const filledInputs = inputs.filter(el => el.value.trim() !== '');

    const dataItems = filledInputs.map(el => {
        const rect   = el.getBoundingClientRect();
        const top    = rect.top    - paperRect.top;
        const left   = rect.left   - paperRect.left;
        const bottom = rect.bottom - paperRect.top;
        if (bottom > maxBottom) maxBottom = bottom;
        const fs = window.getComputedStyle(el).fontSize;
        const ff = window.getComputedStyle(el).fontFamily;
        const lh = parseFloat(window.getComputedStyle(el).lineHeight) || parseFloat(fs) * 1.4;

        // For textareas with multiple lines, render each line as a separate span
        if (el.tagName === 'TEXTAREA') {
          const lines = el.value.split('\n');
          return lines.map((line, i) =>
            `<span style="position:absolute;top:${top + i * lh}px;left:${left}px;` +
            `width:${rect.width}px;height:${lh}px;` +
            `font-size:${fs};font-family:${ff};color:#000;` +
            `overflow:hidden;white-space:nowrap;line-height:${lh}px;">` +
            `${line}</span>`
          ).join('');
        }

        // Single-line inputs
        return `<span style="position:absolute;top:${top}px;left:${left}px;` +
               `width:${rect.width}px;height:${rect.height}px;` +
               `font-size:${fs};font-family:${ff};color:#000;` +
               `overflow:hidden;white-space:nowrap;line-height:${rect.height}px;">` +
               `${el.value}</span>`;
      }).join('');

    // Use actual content height — prevents blank extra page
    const contentHeight = maxBottom + 20;

    // Create a hidden iframe with a completely blank document
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;border:none;';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument!;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head>
      <style>
        @page { size:A4 portrait; margin:0; }
        html, body { margin:0; padding:0; background:#fff; height:auto; }
        .wrap { position:relative; width:${paperRect.width}px; height:${contentHeight}px; overflow:hidden; }
      </style>
    </head><body><div class="wrap">${dataItems}</div></body></html>`);
    doc.close();

    // After print closes: remove iframe and go back to edit mode
    const cleanup = () => {
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
      this.isPreview  = false;
      this.isReadonly = false;
      this.form.enable();
    };

    iframe.onload = () => {
      iframe.contentWindow!.focus();
      iframe.contentWindow!.print();
      iframe.contentWindow!.addEventListener('afterprint', cleanup, { once: true });
      setTimeout(cleanup, 3000); // fallback
    };
  }
}
