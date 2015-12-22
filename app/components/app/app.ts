import {Component, ViewEncapsulation} from 'angular2/core';

import {UserService, RoleService} from '../../services/admin/admin';


import {
RouteConfig,
ROUTER_DIRECTIVES
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'angular2/http';

import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {NameList} from '../../services/name_list';
import {UserComponent,RoleComponent,RoleDetailComponent} from '../admin/admin';

@Component({
  selector: 'app',
  viewProviders: [NameList, UserService, RoleService],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' },
  { path: '/user', component: UserComponent, as: 'User' },
  { path: '/role', component: RoleComponent, as: 'Role' },
  { path: '/role/new', component: RoleDetailComponent, as: 'RoleNew', data: { isNew: true } },
  { path: '/role/:id', component: RoleDetailComponent, as: 'RoleEdit', data: { isNew: false } }

])
export class AppCmp { }
