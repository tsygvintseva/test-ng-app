import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import mockData from '../app.pets.mock';
import { ModalComponent } from '../modal/modal.component';

interface IPet {
  id?: number;
  name?: string;
  gender?: string;
  type?: string;
  color?: string;
  vaccination?: boolean;
}

@Component({
  selector: 'app-pets-table',
  templateUrl: './pets-table.component.html',
  styleUrls: ['./pets-table.component.scss']
})

export class PetsTableComponent implements OnInit {

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  pets = mockData;
  pet = {};
  newPet = false;
  petsForm: FormGroup;
  openedRightSide = false;
  genderArray = ['М', 'Ж'];
  typeArray: any = ['Кот', 'Собака', 'Птица'];
  selectedPet: IPet;
  selectedName;

  initForm(): void {
    this.petsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', [Validators.required]],
      type: ['', [Validators.required]],
      color: ['', [Validators.required, Validators.minLength(3)]],
      vaccination: [false],
    });
  }

  onSubmit(): void {
    this.initForm();
  }

  addPet(): void {
    const maxId = this.pets.reduce((max, item) => item.id > max ? item.id : max, 0);
    const id = maxId + 1;
    const pet = {
      id,
      name: this.petsForm.value.name,
      gender: this.petsForm.value.gender,
      type: this.petsForm.value.type,
      color: this.petsForm.value.color,
      vaccination: this.petsForm.value.vaccination,
    };
    this.pets.push(pet);
    this.openRightSide();
  }

  open(id): void {
    if (this.newPet) {
      this.editPet(id);
    } else {
      this.openRightSide();
      this.editPet(id);
    }
  }

  editPet(id): void {
    this.selectedName = id;
    this.selectedPet = this.pets.find((pet) => pet.id === id);
    this.petsForm.patchValue(this.selectedPet);
  }

  deletePet(id): void {
    this.pets.splice(this.pets.findIndex((pet) => pet.id === id), 1);
  }

  deletePetConfirm(id): void {
    const petName = this.pets.find(pet => pet.id === id).name;
    const dialogRef = this.dialog.open(ModalComponent, {
      panelClass: 'myapp-dialog',
      data: { name: petName },
    });

    dialogRef.afterClosed().subscribe(confirmresult => {
      console.log(confirmresult);
      if (confirmresult){
        this.deletePet(id);
        console.log('Delete confirm is approved by user.');
      }
      else {
        console.log('Delete confirm is cancelled by user.');
      }
    });
    }

    closeForm(): void {
    this.selectedPet = null;
    this.selectedName = null;
    this.newPet = !this.newPet;
    this.openedRightSide = !this.openedRightSide;
  }

  openRightSide(): void {
    this.newPet = !this.newPet;
    this.openedRightSide = !this.openedRightSide;
  }

  save(id): void {
    if (id) {
      const tempPet = {
        id,
        name: this.name.value,
        gender: this.gender.value,
        type: this.type.value,
        color: this.color.value,
        vaccination: this.vaccination.value,
      };
      const foundIndex = this.pets.findIndex(pet => pet.id === tempPet.id);
      this.pets[foundIndex] = tempPet;
      this.selectedPet = null;
      this.selectedName = null;
      this.openRightSide();
    } else {
      this.addPet();
    }
  }

  get name(): AbstractControl {
    return this.petsForm.get('name');
  }

  get gender(): AbstractControl {
    return this.petsForm.get('gender');
  }

  get type(): AbstractControl {
    return this.petsForm.get('type');
  }

  get color(): AbstractControl {
    return this.petsForm.get('color');
  }

  get vaccination(): AbstractControl {
    return this.petsForm.get('vaccination');
  }
}

