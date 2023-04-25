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
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  FullName!: string;
  url!: string;
  items = [{ title: 'Profile' }, { title: 'Logout' }];

  constructor(
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window: Window,
    private sidebarService: NbSidebarService,
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => 'main/' + title.toLocaleLowerCase())
      )
      .subscribe((title) => this.router.navigateByUrl(title));
    this.FullName =
      this.accountService.avalibleAccount().userName +
      ' ' +
      this.accountService.avalibleAccount().userSurname;
    this.url = this.accountService.avalibleAccount().url;
  }
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  menuItems: NbMenuItem[] = [
    {
      title: 'Home',
      link: 'home',
    },
    {
      title: 'product',
      children: [
        {
          title: 'Book',
          link: "book"
        },
        {
          title: 'Shoe',
          link: "shoe"
        },
        {
          title: 'Mouse',
          link: "mouse"
        },
        {
          title: 'Phone',
          link: "phone"
        },
        {
          title: 'Product Settings',
          link: "product-settings"
        },
      ],
    },
    {
      title: 'Shopping Bag',
    },
    {
      title: 'Control Panel',
      expanded: false,
      hidden: !this.accountService.getPermissionToControlPanel(),
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
