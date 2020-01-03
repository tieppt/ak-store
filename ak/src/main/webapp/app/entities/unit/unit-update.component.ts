import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUnit, Unit } from 'app/shared/model/unit.model';
import { UnitService } from './unit.service';

@Component({
  selector: 'ak-unit-update',
  templateUrl: './unit-update.component.html'
})
export class UnitUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    companyId: [],
    name: [null, [Validators.required, Validators.maxLength(10)]],
    description: [null, [Validators.maxLength(200)]],
    isActive: []
  });

  constructor(protected unitService: UnitService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ unit }) => {
      this.updateForm(unit);
    });
  }

  updateForm(unit: IUnit) {
    this.editForm.patchValue({
      id: unit.id,
      companyId: unit.companyId,
      name: unit.name,
      description: unit.description,
      isActive: unit.isActive
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const unit = this.createFromForm();
    if (unit.id !== undefined) {
      this.subscribeToSaveResponse(this.unitService.update(unit));
    } else {
      this.subscribeToSaveResponse(this.unitService.create(unit));
    }
  }

  private createFromForm(): IUnit {
    return {
      ...new Unit(),
      id: this.editForm.get(['id']).value,
      companyId: this.editForm.get(['companyId']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      isActive: this.editForm.get(['isActive']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnit>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
