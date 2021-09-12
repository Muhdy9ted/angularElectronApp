import { NgModule } from "@angular/core";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const MaterialComponents = [
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule
]

@NgModule({
    imports: [MaterialComponents],
    exports: [MaterialComponents]
})

export class MaterialModule{}