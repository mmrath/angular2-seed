import {Component, ViewEncapsulation} from 'angular2/core';

import {UserService} from '../../services/user/user';
import {RoleService} from '../../services/role/role';


import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'angular2/http';

import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {NameList} from '../../services/name_list';
import {UserComponent} from '../user/user';
import {RoleComponent} from '../role/role';

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
  { path: '/role', component: RoleComponent, as: 'Role' }

])
export class AppCmp {}
