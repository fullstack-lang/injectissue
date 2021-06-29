import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// insertion point for imports
import { FoosTableComponent } from './foos-table/foos-table.component'
import { FooDetailComponent } from './foo-detail/foo-detail.component'
import { FooPresentationComponent } from './foo-presentation/foo-presentation.component'


const routes: Routes = [ // insertion point for routes declarations
	{ path: 'github_com_fullstack_lang_injectissue_stack1_go-foos', component: FoosTableComponent, outlet: 'github_com_fullstack_lang_injectissue_stack1_go_table' },
	{ path: 'github_com_fullstack_lang_injectissue_stack1_go-foo-adder', component: FooDetailComponent, outlet: 'github_com_fullstack_lang_injectissue_stack1_go_editor' },
	{ path: 'github_com_fullstack_lang_injectissue_stack1_go-foo-adder/:id/:originStruct/:originStructFieldName', component: FooDetailComponent, outlet: 'github_com_fullstack_lang_injectissue_stack1_go_editor' },
	{ path: 'github_com_fullstack_lang_injectissue_stack1_go-foo-detail/:id', component: FooDetailComponent, outlet: 'github_com_fullstack_lang_injectissue_stack1_go_editor' },
	{ path: 'github_com_fullstack_lang_injectissue_stack1_go-foo-presentation/:id', component: FooPresentationComponent, outlet: 'github_com_fullstack_lang_injectissue_stack1_go_presentation' },
	{ path: 'github_com_fullstack_lang_injectissue_stack1_go-foo-presentation-special/:id', component: FooPresentationComponent, outlet: 'github_com_fullstack_lang_injectissue_stack1_gofoopres' },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
