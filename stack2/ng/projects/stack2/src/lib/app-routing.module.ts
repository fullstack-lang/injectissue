import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// insertion point for imports
import { BarsTableComponent } from './bars-table/bars-table.component'
import { BarDetailComponent } from './bar-detail/bar-detail.component'
import { BarPresentationComponent } from './bar-presentation/bar-presentation.component'


const routes: Routes = [ // insertion point for routes declarations
	{ path: 'github_com_fullstack_lang_injectissue_stack2_go-bars', component: BarsTableComponent, outlet: 'github_com_fullstack_lang_injectissue_stack2_go_table' },
	{ path: 'github_com_fullstack_lang_injectissue_stack2_go-bar-adder', component: BarDetailComponent, outlet: 'github_com_fullstack_lang_injectissue_stack2_go_editor' },
	{ path: 'github_com_fullstack_lang_injectissue_stack2_go-bar-adder/:id/:originStruct/:originStructFieldName', component: BarDetailComponent, outlet: 'github_com_fullstack_lang_injectissue_stack2_go_editor' },
	{ path: 'github_com_fullstack_lang_injectissue_stack2_go-bar-detail/:id', component: BarDetailComponent, outlet: 'github_com_fullstack_lang_injectissue_stack2_go_editor' },
	{ path: 'github_com_fullstack_lang_injectissue_stack2_go-bar-presentation/:id', component: BarPresentationComponent, outlet: 'github_com_fullstack_lang_injectissue_stack2_go_presentation' },
	{ path: 'github_com_fullstack_lang_injectissue_stack2_go-bar-presentation-special/:id', component: BarPresentationComponent, outlet: 'github_com_fullstack_lang_injectissue_stack2_gobarpres' },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
