import { NgModule } from '@angular/core';
import { BranchPipe } from './branch/branch';
import { OtherdocmapPipe } from './otherdocmap/otherdocmap';
import { PddsubmissionmapPipe } from './pddsubmissionmap/pddsubmissionmap';
import { ValuemapPipe } from './valuemap/valuemap';
@NgModule({
	declarations: [
        ValuemapPipe,
        OtherdocmapPipe,
        BranchPipe,
        PddsubmissionmapPipe
    ],
	imports: [],
	exports: [
        ValuemapPipe,
        OtherdocmapPipe,
        BranchPipe,
        PddsubmissionmapPipe
    ]
})
export class PipesModule {}