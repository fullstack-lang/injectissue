import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { BarDB } from '../bar-db'
import { BarService } from '../bar.service'

import { FrontRepoService, FrontRepo } from '../front-repo.service'

import { Router, RouterState, ActivatedRoute } from '@angular/router';

export interface barDummyElement {
}

const ELEMENT_DATA: barDummyElement[] = [
];

@Component({
	selector: 'app-bar-presentation',
	templateUrl: './bar-presentation.component.html',
	styleUrls: ['./bar-presentation.component.css'],
})
export class BarPresentationComponent implements OnInit {

	// insertion point for declarations

	displayedColumns: string[] = [];
	dataSource = ELEMENT_DATA;

	bar: BarDB;

	// front repo
	frontRepo: FrontRepo
 
	constructor(
		private barService: BarService,
		private frontRepoService: FrontRepoService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = function () {
			return false;
		};
	}

	ngOnInit(): void {
		this.getBar();

		// observable for changes in 
		this.barService.BarServiceChanged.subscribe(
			message => {
				if (message == "update") {
					this.getBar()
				}
			}
		)
	}

	getBar(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.frontRepoService.pull().subscribe(
			frontRepo => {
				this.frontRepo = frontRepo

				this.bar = this.frontRepo.Bars.get(id)

				// insertion point for recovery of durations
			}
		);
	}

	// set presentation outlet
	setPresentationRouterOutlet(structName: string, ID: number) {
		this.router.navigate([{
			outlets: {
				github_com_fullstack_lang_injectissue_stack2_go_presentation: ["github_com_fullstack_lang_injectissue_stack2_go-" + structName + "-presentation", ID]
			}
		}]);
	}

	// set editor outlet
	setEditorRouterOutlet(ID: number) {
		this.router.navigate([{
			outlets: {
				github_com_fullstack_lang_injectissue_stack2_go_editor: ["github_com_fullstack_lang_injectissue_stack2_go-" + "bar-detail", ID]
			}
		}]);
	}
}
