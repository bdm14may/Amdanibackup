import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

export class Formv  {

    public myForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];

    constructor(private _fb: FormBuilder) {


    }
    ngOnInit() {
        this.myForm = new FormGroup({
            mobileno: new FormControl('', [<any>Validators.required, <any>Validators.minLength(10)]),

        });
        console.log(this.myForm);
        this.myForm.valueChanges.subscribe((form: any) => {
            console.log('form changed to:', form);
        }
        );

    }

}