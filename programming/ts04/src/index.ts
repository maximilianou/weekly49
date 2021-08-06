export * from './core';
export * from './utils';

export function cat(path: string): string{
  return "<html><head><title>Hi!</title></head><body>Hi!!</body></html>";
}

//console.log(`Hi!`);


/*

Is the version within the spec?
-------------------------------

Work closely with build systems. Often, we need to simulate builds in order to analyze their behavior. Today, we're going to re-implement a small portion of a build system: version range resolution.

In this session's exercise, we'll be implementing versionWithinSpec, a function that takes a "version" and a "spec" and tells us whether the version is within the spec.


What is a version?
------------------

A version is a string that consists of either:

1. An integer, OR
2. An integer followed by a period followed by an integer.

Some example versions:

- "36"
- "1.35"
- "2.0"
 
A version that is a plain integer has an implicit ".0" appended to it. For example, "1" is equivalent to "1.0".


What is a spec?
---------------

A spec is a string composed of one or more constraints separated by commas.

A constraint is a combination of an operator and a version.

Some example constraints:

- ">1.3"
- "<=2"
- ">=2.5"

Some example specs:

- ">1.3,<=2"
- ">=2.5,<4"
- ">0,<2"

A version is within a spec if it satisfies all constraints of that spec.

*/

type Version = string;
type Spec = string;

////////////////////////////////////////////////

const stepByStepLt = ( xs: number[], ys: number[]):boolean => {
  if(xs.length > 0 && ys.length > 0){
    let [x, ...xss] = xs;
    let [y, ...yss] = ys;
    return (x < y) ? true : ( x === y ) ? stepByStepLt(xss, yss) : false ;
  }else if(xs.length > 0 && ys.length === 0){
    return false;
  }else{
    return false;
  }
}
console.log(`-- WIP: lt ----------------------`);
console.log('false: ', stepByStepLt( [1,1,2], [1,1,2] ));
console.log('true: ', stepByStepLt( [1,1,2], [1,1,2,2] ));
console.log('false: ', stepByStepLt( [1,1,2,1], [1,1,2] ));
console.log('false: ', stepByStepLt( [1,2,2,1], [1,1,2] ));
console.log('true: ', stepByStepLt( [1,0,2,1], [1,1,2] ));
console.log('false: ', stepByStepLt( [1,0,2,1], [0] ));
console.log(`------------------------`);

const stepByStepGt = ( xs: number[], ys: number[]):boolean => {
  if(xs.length > 0 && ys.length > 0){
    let [x, ...xss] = xs;
    let [y, ...yss] = ys;
    return (x > y) ? true : ( x === y ) ? stepByStepGt(xss, yss) : false ;
  }else if(xs.length > 0 && ys.length === 0){
    return true;
  }else{
    return false;
  }
}
console.log(`-- WIP: gt ----------------------`);
console.log('false: ', stepByStepGt( [1,1,2], [1,1,2] ));
console.log('false: ', stepByStepGt( [1,1,2], [1,1,2,2] ));
console.log('true: ', stepByStepGt( [1,1,2,1], [1,1,2] ));
console.log('true: ', stepByStepGt( [1,2,2,1], [1,1,2] ));
console.log('false: ', stepByStepGt( [1,0,2,1], [1,1,2] ));
console.log('true: ', stepByStepGt( [1,0,2,1], [0] ));
console.log(`------------------------`);

const stepByStepEq = ( xs:number[], ys:number[] ): boolean => {
  let result = true;
  if( xs.length < ys.length ) {
    if( ys.slice(xs.length).some( y => y !== 0 )  ) {
      return false;
    }
  } else if ( xs.length > ys.length ) {
    if( xs.slice(ys.length).some( x => x !== 0 ) ) {
      return false;
    }
  } else if ( xs.length === 0 || ys.length === 0 ) {
    return true;
  } else {
    let [x, ...xss] = xs;
    let [y, ...yss] = ys;
    return x === y ? stepByStepEq(xss, yss) : false ;
  }
  return result;
}
console.log(`-- WIP: Eq ----------------------`);
console.log('true: ', stepByStepEq( [1,1,2], [1,1,2] ));
console.log('true: ', stepByStepEq( [1,1,2], [1,1,2,0] ));
console.log('true: ', stepByStepEq( [1,1,2,0], [1,1,2] ));
console.log('false: ', stepByStepEq( [1,1,2,0,1], [1,1,2] ));
console.log('false: ', stepByStepEq( [1,0,2,1], [1,1,2] ));
console.log('false: ', stepByStepEq( [1,0,2,1], [0] ));
console.log('false: ', stepByStepEq( [1,0,2,1], [] ));
console.log(`------------------------`);

console.log(`-- WIP: startsWith '<=' '<' '>=' '>' ----`);
console.log(`..`);
console.log(`-- WIP: many rules '>1.0,<=4.3.0.7'-----`);
console.log(`..`);

//let comp = {
//  "<=": () => { },
//  ">=": () => { },
//  "<" : () => { },
//  ">" : () => { },
//}
////////////////////////////////////////////////

// versionWithinSpec returns true if and only if the version is within the spec.
function versionWithinSpec(version: Version, spec: Spec) {
  // TODO: fix me!
  return true;
}


const tests = [
  {version: "1", spec: ">=1", expected: true},
  {version: "1", spec: "<2", expected: true},
  {version: "1", spec: ">3", expected: false},
];

tests.forEach((test) => {
  const result = versionWithinSpec(test.version, test.spec);
  
  if (result === test.expected) {
    console.log("OK: " + JSON.stringify(test.version) + ", " + JSON.stringify(test.spec));
  } else {
    console.log();
    console.log("TEST CASE FAILED: " + JSON.stringify(test.version) + ", " + JSON.stringify(test.spec));
    console.log("Expected: " + JSON.stringify(test.expected));
    console.log("Actual: " + JSON.stringify(result));
    console.log();
  }
});
