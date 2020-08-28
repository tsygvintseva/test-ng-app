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
  newPet = false;
  petsForm: FormGroup;
  openedRightSide = false;
  genderArray = ['М', 'Ж'];
  typeArray = ['Кот', 'Собака', 'Птица'];
  selectedPet: IPet;
  public selectedName;

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

  open(id) {
    if (this.newPet) {
      this.editPet(id);
    } else {
      this.openRightSide();
      this.editPet(id);
    }
  }

  editPet(id) {
    this.selectedName = id;
    this.selectedPet = this.pets.find((pet) => pet.id === id);
    this.petsForm.patchValue(this.selectedPet);
  }

  deletePet(id) {
    this.pets.splice(this.pets.findIndex((pet) => pet.id === id), 1);
  }

  closeForm() {
    this.selectedPet = null;
    this.selectedName = null;
    this.newPet = !this.newPet;
    this.openedRightSide = !this.openedRightSide;
  }

  openRightSide() {
    this.newPet = !this.newPet;
    this.openedRightSide = !this.openedRightSide;
  }

  save(id) {
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

  get name() {
    return this.petsForm.get('name');
  }

  get gender() {
    return this.petsForm.get('gender');
  }

  get type() {
    return this.petsForm.get('type');
  }

  get color() {
    return this.petsForm.get('color');
  }

  get vaccination() {
    return this.petsForm.get('vaccination');
  }
}

