import { ElementRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AppMenuitemComponent } from './app.menuitem.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrl: './app.menu.component.scss',
    standalone: true,
    imports: [
        AppMenuitemComponent
    ]
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, public el: ElementRef) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Management',
                items: [
                    { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['users'] },
                    { label: 'Tags', icon: 'pi pi-fw pi-tags', routerLink: ['tags'] },
                    { label: 'Articles', icon: 'pi pi-fw pi-book', routerLink: ['articles'] },
                    { label: 'Tests', icon: 'pi pi-fw pi-file', routerLink: ['tests'] },
                ]
            }
        ];
    }
}
