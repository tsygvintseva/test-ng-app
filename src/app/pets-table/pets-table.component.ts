import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import mockData from '../app.pets.mock';

@Component({
  selector: 'app-pets-table',
  templateUrl: './pets-table.component.html',
  styleUrls: ['./pets-table.component.scss']
})
export class PetsTableComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  pets = mockData;
  petsForm: FormGroup;
  click = false;
  button = 'Создать';
  title = 'Новый питомец';
  genderArray = ['M', 'Ж'];
  typeArray = ['Кот', 'Собака', 'Птица'];

  initForm() {
    this.petsForm = this.fb.group({
      'name': [ '' , [Validators.required, Validators.minLength(3)]],
      'gender': ['', [Validators.required]],
      'type': [ '' , [Validators.required]],
      'color': [ '' , [Validators.required, Validators.minLength(3)]],
      'vaccination': [ false ],
    })
  }

  onSubmit() {
    // const id = ++this.counter;
    const maxId = this.pets.reduce((max, item) => item.id > max ? item.id : max, 0);
    const id = maxId + 1;
    const pet = {
      id,
      name : this.petsForm.value.name,
      gender : this.petsForm.value.gender,
      type : this.petsForm.value.type,
      color : this.petsForm.value.color,
      vaccination : this.petsForm.value.vaccination,
    };
    this.pets.push(pet);
    this.initForm();
  }

  deletePet(id) {
    this.pets.splice(this.pets.findIndex((pet) => pet.id === id), 1);
  }

  // Валидация
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
}
