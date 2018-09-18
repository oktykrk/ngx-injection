import { Component, Input, OnInit, EventEmitter, Output, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { InjectionService } from '../lib/injection/services/injection.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	
	@ViewChild('template') template: ElementRef;
	
	constructor(private _injectionService: InjectionService) { }
	
	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
		
		setInterval(() => {
			const ref = this._injectionService.injectComponent(TestComponent, {
				inputs: {
					myInput: 'Hello From Test'
				},
				outputs: {
					myOutput: (e) => { console.log('Hello From Test') }
				}
			}, this.template.nativeElement);

			setTimeout(() => {
				ref.destroy();
			}, 1500);
		}, 3000)
	}
}

@Component({
	selector: 'app-test',
	template: `
	<h1>{{myInput}}</h1>
	`
})
export class TestComponent implements OnInit {
	@Input() myInput: string;
	@Output() myOutput = new EventEmitter();
	
	
	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
		
		this.myOutput.emit();
	}
}
