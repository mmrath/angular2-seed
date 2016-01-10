import {Component, ViewEncapsulation} from 'angular2/core';

import {UserService, RoleService} from '../../services/core/core';


import {
RouteConfig,
ROUTER_DIRECTIVES
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'angular2/http';

import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {NameList} from '../../services/name_list';
import {UserComponent,RoleListCmp,RoleCmp} from '../core/core';


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
  { path: '/role', component: RoleListCmp, as: 'Role' },
  { path: '/role/new', component: RoleCmp, as: 'RoleNew', data: { isNew: true } },
  { path: '/role/:id', component: RoleCmp, as: 'RoleEdit', data: { isNew: false } }

])
export class AppCmp { }
