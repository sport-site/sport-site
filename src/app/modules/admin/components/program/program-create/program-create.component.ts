import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from 'src/app/general/services/program.service';
import { AlertService } from 'src/app/modules/admin/services/alert.service';
import { IProgram } from 'src/app/modules/programs/shared/interfaces';

@Component({
    selector: 'app-program-create',
    templateUrl: './program-create.component.html',
    styleUrls: ['./program-create.component.scss'],
})
export class ProgramCreateComponent implements OnInit {
    public form!: FormGroup;
    constructor(
        private programSerivce: ProgramService,
        private alert: AlertService
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            title: new FormControl(null, Validators.required),
            bgImageProgram: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            direction: new FormControl(null, Validators.required),
            type: new FormControl(null, Validators.required),
            text: new FormControl(null, Validators.required),
        });
    }

    public submit() {
        if (this.form.invalid) {
            return;
        }

        const program: IProgram = {
            title: this.form.value.title,
            bgImageProgram: this.form.value.bgImageProgram,
            description: this.form.value.description,
            text: this.form.value.text,
            direction: this.form.value.direction,
            type: this.form.value.type,
        };

        this.programSerivce.postProgram(program).subscribe(() => {
            this.form.reset();
            this.alert.succes('Программа тренировок добавлена!');
        });
    }
}
