import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './account/login.components/login.component';
import { AboutComponent } from './about/about.component';
import { AccreditationComponent } from './accreditation/accreditation.component';
import { TermsComponent } from './terms/terms.component';
export const router:Routes =[

{
path : '',
component: LoginComponent
},
{
path: 'Home',
loadChildren: 'app/homepage/homepage.module#HomepageModule',

},

{ path: 'About', component:AboutComponent  },
{ path: 'Accreditation', component:AccreditationComponent  },
{ path: 'Terms', component:TermsComponent  },
];
export const approuter: ModuleWithProviders = RouterModule.forRoot(router);
