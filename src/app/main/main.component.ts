import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NB_WINDOW,
} from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { ExaminationService } from '../services/examination.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  fullName!: string;
  url!: string;
  items = [{ title: 'Profile' }, { title: 'Logout' }];

  constructor(
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window: Window,
    private sidebarService: NbSidebarService,
    private router: Router,
    private accountService: AccountService,
    private examinationService:ExaminationService,
  ) {}

  ngOnInit() {
    this.accountService.avalibleAccount().subscribe(data=>{
      this.url=data.url;
       this.fullName =
      data.name.charAt(0).toUpperCase() +
      data.name.slice(1) +
      ' ' +
      data.surname.charAt(0).toUpperCase() +
      data.surname.slice(1);
    });
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => 'main/' + title.toLocaleLowerCase())
      )
      .subscribe((title) => this.router.navigateByUrl(title));
  }

  toggle() {
    this.sidebarService.toggle();
  }

  menuItems: NbMenuItem[] = [
    {
      title: 'Home',
      link: 'home',
    },
    {
      title: 'Product',
      children: [
        {
          title: 'Book',
          link: 'book',
        },
        {
          title: 'Shoe',
          link: 'shoe',
        },
        {
          title: 'Mouse',
          link: 'mouse',
        },
        {
          title: 'Phone',
          link: 'phone',
        },
        {
          title: 'Product Settings',
          link: 'product-settings',
          hidden: !this.examinationService.getPermissionToControlPanel(),
        },
      ],
    },
    {
      title: 'Shopping Bag',
      link: "shoppingBag"
    },
    {
      title: 'Control Panel',
      expanded: false,
      hidden: !this.examinationService.getPermissionToControlPanel(),
      children: [
        {
          title: 'Users',
          link: 'controlPanel/users',
        },
        {
          title: 'Roles',
          link: 'controlPanel/roles',
        },
      ],
    },
    {
      title: 'Profile',
      expanded: false,
      children: [
        {
          title: 'Settings',
          link: 'profile',
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
          link: 'logout',
        },
      ],
    },
  ];
}

