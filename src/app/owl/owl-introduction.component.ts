/**
 * owl-introduction.component
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { OwlIntroductionService } from './owl-introduction.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-owl-introduction',
    templateUrl: './owl-introduction.component.html',
    styleUrls: ['./owl-introduction.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})

export class OwlNGIntroductionComponent implements OnInit, OnDestroy {

    public title: string;
    public desc: string;

    private subId: Subscription;

    constructor( private introductionService: OwlIntroductionService,
                 private cdRef: ChangeDetectorRef ) {
    }

    public ngOnInit() {
        this.subId = this.introductionService.introductionStream
            .subscribe(( event: any ) => {
                this.updateIntroduction(event);
            });
    }

    public ngOnDestroy(): void {
        this.subId.unsubscribe();
    }

    private updateIntroduction( introduction: any ): void {
        this.title = introduction.title;
        this.desc = introduction.desc;
        this.cdRef.markForCheck();
    }
}
