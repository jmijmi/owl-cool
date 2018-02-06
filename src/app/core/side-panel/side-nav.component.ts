/**
 * side-nav.component
 */

import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators/filter';
import { SideNavItem } from './side-nav-item.interface';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})

export class SideNavComponent implements OnInit, OnDestroy {

    private _routerSub: Subscription;

    private _currentUrl: string;
    get currentUrl(): string {
        return this._currentUrl;
    }

    private _showTabletNav: boolean;
    get showTabletNav(): boolean {
        return this._showTabletNav;
    }

    private _homeItems: SideNavItem[];
    get homeItems(): SideNavItem[] {
        return this._homeItems;
    }

    private _owlItems: SideNavItem[];
    get owlItems(): SideNavItem[] {
        return this._owlItems;
    }

    private _viewPortSizeChangeSub = Subscription.EMPTY;

    constructor( private _router: Router,
                 private appService: AppService,
                 private cdRef: ChangeDetectorRef ) {
        this._viewPortSizeChangeSub = this.appService.viewPortSizeChange
            .subscribe(( event: any ) => {
                this.checkShowTabletNavState(event.isDesktopSize);
            });
    }

    public ngOnInit() {
        this._routerSub = this._router.events
            .pipe(
                filter(e => e instanceof NavigationEnd)
            )
            .subscribe(( event: NavigationEnd ) => {
                this._currentUrl = event.url;
            });

        this._owlItems = [
            {
                name: 'owl ng',
                level: 1,
                slug: 'owlng',
                children: [
                    {
                        name: 'Getting Start',
                        slug: '/owlng/getting-start',
                        level: 2
                    },
                    {
                        name: 'Ripple Effect',
                        slug: '/owlng/ripple-effect',
                        level: 2
                    },
                ]
            }
        ];

        this._homeItems = [
            {
                name: 'Home',
                level: 1,
                slug: 'home',
            }
        ];
    }

    public ngOnDestroy(): void {
        this._routerSub.unsubscribe();
        this._viewPortSizeChangeSub.unsubscribe();
    }

    private checkShowTabletNavState( isDesktopSize: boolean ): void {
        this._showTabletNav = !isDesktopSize;
        this.cdRef.markForCheck();
    }
}