// src/app/material.module.ts
import { NgModule } from '@angular/core';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

import {
    MatButtonModule,
    MatListModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule
} from '@angular/material';

const modules = [
    MatButtonModule,
    MatListModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatBottomSheetModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {}