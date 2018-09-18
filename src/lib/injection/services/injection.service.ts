import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, EmbeddedViewRef, Type } from '@angular/core';
import { InjectionOptions } from './injection-options.interface';

/**
* Injection service is a helper to append components
* dynamically to a known location in the DOM, most
* noteably for dialogs/tooltips appending to body.
* 
*/
@Injectable()
export class InjectionService {
    
    constructor(private _applicationRef: ApplicationRef, private _componentFactoryResolver: ComponentFactoryResolver, private _injector: Injector) { }
    
    /**
    * Gets the root view container to inject the component to.
    * 
    * 
    * @memberOf InjectionService
    */
    public getRootViewContainer(): ComponentRef<any> {
        const rootComponents = this._applicationRef['_rootComponents'];
        if (rootComponents.length) return rootComponents[0];
        
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
    }
    /**
    * Gets the html element for a component ref.
    * 
    * @param componentRef
    * 
    * @memberOf InjectionService
    */
    public getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
    /**
    * Gets the root component container html element.
    * 
    * 
    * @memberOf InjectionService
    */
    public getRootViewContainerNode(): HTMLElement {
        return this.getComponentRootNode(this.getRootViewContainer());
    }
    /**
    * Projects the inputs onto the component
    * 
    * @param component
    * @param options
    * 
    * @memberOf InjectionService
    */
    public projectComponentInputs(component: ComponentRef<any>, options: any): ComponentRef<any> {
        if(options) {
            const props = Object.getOwnPropertyNames(options);
            for(const prop of props) {
                component.instance[prop] = options[prop];
            }
        }
        
        return component;
    }
    /**
    * Projects the outputs onto the component
    * 
    * @param component
    * @param options
    * 
    * @memberOf InjectionService
    */
    public projectComponentOutputs(component: ComponentRef<any>, options: any): ComponentRef<any> {
        if(options) {
            const props = Object.getOwnPropertyNames(options);
            for(const prop of props) {
                component.instance[prop].subscribe((e) => {
                    options[prop](e);
                })
            }
        }
        
        return component;
    }
    
    /**
    * Appends a component to a adjacent location
    * 
    * @param componentClass
    * @param options
    * @param location
    * 
    * @memberOf InjectionService
    */
    public injectComponent<T>(componentClass: Type<T>, options: InjectionOptions = {}, location: Element = this.getRootViewContainerNode()): ComponentRef<any> {
        
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentClass);
        let componentRef = componentFactory.create(this._injector);
        let appRef: any = this._applicationRef;
        let componentRootNode = this.getComponentRootNode(componentRef);
        
        if (options && options.inputs) {
            // project the inputs passed to the component instance
            this.projectComponentInputs(componentRef, options.inputs);
        }
        
        if (options && options.outputs) {
            // project the outputs passed to the component instance
            this.projectComponentOutputs(componentRef, options.outputs);
        }
        
        appRef.attachView(componentRef.hostView);
        
        componentRef.onDestroy(() => {
            appRef.detachView(componentRef.hostView);
        });
        
        location.appendChild(componentRootNode);
        
        return componentRef;
    }
}
