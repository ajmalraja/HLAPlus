import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage.component';
import {MessageComponent} from './message/message.component';
import {HaplotypeComponent} from './haplotype/haplotype.component';
import { PopulationComponent } from './population/population.component';
import { UserComponent } from '../account/user/user.component';
import { UpdatepopulationComponent } from './updatepopulation/updatepopulation.component';
import { UpdateHaplotypeComponent } from './update-haplotype/update-haplotype.component';
import { HaplotypechartComponent } from './haplotypechart/haplotypechart.component';
import { AttachmentComponent } from './documents/attachment.component';

const HOMEPAGE_ROUTER: Routes = [
{
path: '',
component : HomepageComponent,

  children: [

     { path: 'Message', component: MessageComponent },

     { path: 'Populations', component: PopulationComponent },

     { path: 'Haplotype', component: HaplotypeComponent },

     { path: 'User', component: UserComponent },
     { path: 'UpdatePopulation/:requiredAction/:Id', component: UpdatepopulationComponent  },
     { path: 'UpdateHaplotype/:requiredAction/:Id', component: UpdateHaplotypeComponent  },
     { path: 'HomepageChart', component: HaplotypechartComponent  },
     { path: 'Attachment', component: AttachmentComponent  },
            ]

         }
];

export const homepageRouter = RouterModule.forChild(HOMEPAGE_ROUTER);
