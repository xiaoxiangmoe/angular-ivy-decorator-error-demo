import { Component,
  Type,
  ɵComponentDef as ComponentDef,
  ɵDirectiveDef as DirectiveDef,
  ɵPipeDef as PipeDef} from '@angular/core';
import { HelloWorldComponent } from '../hello-world/hello-world.component';

@Component({
  selector: 'app-hello-foobar',
  templateUrl: './hello-foobar.component.html',
  styleUrls: ['./hello-foobar.component.scss']
})
@ComponentDeps({
  'directives': [
    HelloWorldComponent
  ],
  pipes:[]
})
export class HelloFoobarComponent   {

  constructor() { }


}


export interface ComponentDepsConfig {
  directives?: Type<any>[];
  pipes?: Type<any>[];
}
function getDirectiveDef<T>(t: Type<T>): DirectiveDef<T> {
  if (t['ɵdir']) {
    return t['ɵdir'] as DirectiveDef<T>;
  }
  if (t['ɵcmp']) {
    return t['ɵcmp'] as ComponentDef<T>;
  }
  throw new Error('No Angular definition found for ' + t.name);
}
function getDirectiveDefs(types: Type<any>[]): DirectiveDef<any>[] {
  return types.map(t => getDirectiveDef(t));
}

function getPipeDef<T>(t: Type<T>): PipeDef<T> {
  if (t['ɵpipe']) {
    return t['ɵpipe'] as PipeDef<T>;
  }
  throw new Error('No Angular definition found for ' + t.name);
}

export function getPipeDefs(types: Type<any>[]): PipeDef<any>[] {
  return types.map(t => getPipeDef(t));
}
export function ComponentDeps(config: ComponentDepsConfig) {
  return (componentType: Type<any>) => {
    const def = componentType['ɵcmp'] || componentType['ngComponentDef'];
    // directives or components
    def.directiveDefs = [
      ...getDirectiveDefs(config.directives || [])
    ];
    // pipes
    def.pipeDefs = [
      ...getPipeDefs(config.pipes || [])
    ];
  };
}
