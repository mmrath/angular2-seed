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
import {UserComponent, RoleListCmp, RoleCmp, TableDefCmp} from '../core/core';


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
  { path: '/role', component: RoleListCmp, as: 'RoleList' },
  { path: '/role/new', component: RoleCmp, as: 'RoleNew', data: { isNew: true } },
  { path: '/role/:id', component: RoleCmp, as: 'RoleEdit', data: { isNew: false } },
  { path: '/table_def/new', component: TableDefCmp, as: 'TableDefNew', data: { isNew: true } },
  { path: '/table_def/:id', component: TableDefCmp, as: 'TableDefEdit', data: { isNew: false } },
])
export class AppCmp { }
