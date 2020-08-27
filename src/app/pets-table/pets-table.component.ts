import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import mockData from '../app.pets.mock';

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  pets = mockData;
  petsForm: FormGroup;
  openedRightSide = false;
  genderArray = ['М', 'Ж'];
  typeArray = ['Кот', 'Собака', 'Птица'];
  selectedPet: IPet;

  initForm() {
    this.petsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', [Validators.required]],
      type: ['', [Validators.required]],
      color: ['', [Validators.required, Validators.minLength(3)]],
      vaccination: [false],
    });
  }

  onSubmit() {
    this.initForm();
  }

  addPet() {
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

  editPet(id) {
    this.selectedPet = this.pets.find((pet) => pet.id === id);
    this.petsForm.patchValue(this.selectedPet);
  }

  open(id) {
    console.log(id);
    this.openRightSide();
    this.editPet(id);
  }

  deletePet(id) {
    this.pets.splice(this.pets.findIndex((pet) => pet.id === id), 1);
  }

  openRightSide() {
    this.openedRightSide = !this.openedRightSide;
  }

  save(id) {
    console.log(id);
    if (id) {

      const tempPet = {
        id,
        name: this.elName.value,
        gender: this.elGender.value,
        type: this.elType.value,
        color: this.elColor.value,
        vaccination: this.elVaccination.value,
      };

      console.log('tempPet', tempPet);

      const foundIndex = this.pets.findIndex(pet => pet.id === tempPet.id);
      this.pets[foundIndex] = tempPet;

      console.log(this.pets);

      this.openRightSide();
    } else {
      this.addPet();
    }
  }

  get elName() {
    return this.petsForm.get('name');
  }

  get elGender() {
    return this.petsForm.get('gender');
  }

  get elType() {
    return this.petsForm.get('type');
  }

  get elColor() {
    return this.petsForm.get('color');
  }

  get elVaccination() {
    return this.petsForm.get('vaccination');
  }
}
