import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { FooDB } from '../foo-db'
import { FooService } from '../foo.service'

import { FrontRepoService, FrontRepo } from '../front-repo.service'

import { Router, RouterState, ActivatedRoute } from '@angular/router';

export interface fooDummyElement {
}

const ELEMENT_DATA: fooDummyElement[] = [
];

@Component({
	selector: 'app-foo-presentation',
	templateUrl: './foo-presentation.component.html',
	styleUrls: ['./foo-presentation.component.css'],
})
export class FooPresentationComponent implements OnInit {

	// insertion point for declarations

	displayedColumns: string[] = [];
	dataSource = ELEMENT_DATA;

	foo: FooDB;

	// front repo
	frontRepo: FrontRepo
 
	constructor(
		private fooService: FooService,
		private frontRepoService: FrontRepoService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
	}

	ngOnInit(): void {
		this.getFoo();

		// observable for changes in 
		this.fooService.FooServiceChanged.subscribe(
			message => {
				if (message == "update") {
					this.getFoo()
				}
			}
		)
	}

	getFoo(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.frontRepoService.pull().subscribe(
			frontRepo => {
				this.frontRepo = frontRepo

				this.foo = this.frontRepo.Foos.get(id)

				// insertion point for recovery of durations
			}
		);
	}

	// set presentation outlet
	setPresentationRouterOutlet(structName: string, ID: number) {
		this.router.navigate([{
			outlets: {
				github_com_fullstack_lang_injectissue_stack1_go_presentation: ["github_com_fullstack_lang_injectissue_stack1_go-" + structName + "-presentation", ID]
			}
		}]);
	}

	// set editor outlet
	setEditorRouterOutlet(ID: number) {
		this.router.navigate([{
			outlets: {
				github_com_fullstack_lang_injectissue_stack1_go_editor: ["github_com_fullstack_lang_injectissue_stack1_go-" + "foo-detail", ID]
			}
		}]);
	}
}
