# Component Injection ![CI status](https://img.shields.io/badge/build-passing-brightgreen.svg)
Ngx component injection module.

## Installation
```
npm install ngx-injection
```

app.module.ts
```
import { InjectionModule } from 'ngx-injection'; 

... 
imports: [
    ...
    InjectionModule
    ...
] 
... 
```

## Usage
```
import { InjectionService } from 'ngx-injection';

...
constructor(private _injectionService: InjectionService) { }
...

...
const ref = this._injectionService.injectComponent(TestComponent, {
	inputs: {
	    myInput: 'Hello From Test'
	}, 
    outputs: {
	    myOutput: (e) => { console.log('Hello From Test') }
	}
}, this.template.nativeElement);
...

```

## Configuration

```
/**
* Component injection options interface.
*/
interface InjectionOptions {
    /**
    * Componenet inputs.
    */
    inputs?: any;
    
    /**
    * Component Outputs
    */
    outputs?: any;
}
```
## Notice
**The component which will be injected must be located in `entryComponents`.

## License
[MIT](https://choosealicense.com/licenses/mit/)
