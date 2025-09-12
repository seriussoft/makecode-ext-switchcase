//import { SwitchContext } from "./classes/switchcontext";
//import { SwitchManager } from "./classes/switchmanager";


namespace switchcase {


    /**
     * TODO:    [X] Import SwitchManager and SwitchContext
     * TODO:    [X] Hook-Up SwitchManager and SwitchContext (and switchBlock?)
     * TODO:    [ ] Does caseBlockValue need to have the pointer decorator (to point to switchBlock)?
     * TODO:    [ ] Can we put a test "game" inside this project?
     * TODO:    [ ] If we do the above (test "game"), will it bloat people's games who import our switchcase extension? Options?
     * TODO:    [ ] Assign Iconic FFVII Green to the Master Group and it's Children blocks
     * TODO:    [ ] Create Master Group for each of these subgroups and blocks
     * TODO:    [X] Assign weight so that Master Group is higher up in the list
     * TODO:    [ ] Assign [Advanced] to Master Group so it is only available for advanced users (maybe?)
     * TODO:    [ ] Need Subgroups... How to implement?
     */

  /**
   * Switch Block
   * File:    "switch.ts"
   * switchBlock(value: any);
   * block:   "switch $value"
   * blockId: switchcase_switch_block
   * group:   "Control"
   * weight:  90
   * draggableParameters
   * draggableStatements=true
   * 
   */

  /**
   * Switch Context
   * File:    "classes/switchcontext.ts"
   * SwitchContext { }
   * 
   */

  /**
   * Switch Manager
   * File:    "classes/switchmanager.ts"
   * SwitchManager { }
   * 
   */
  
    

  /**
   * Case Block Container
   */
  //% block="case $match do $handler"
  //% blockId=switchcase_case_block
  //% group="Core"
  //% weight=90
  //% draggableParameters=reporter
  //% draggableStatement=reporter
  export function caseBlock(name: string, match: any, handler: () => void): void {
    //Placeholder for CodeGen
    //currentSwitchCase.addCase(match, handler)
    //let cxt = switchManager.get

    //this should try to get before creating, so unless that changes,
    //  this code should suffice as uber simple as it is... 
    let cxt = switchcase.createSwitch(name);
    if (cxt) {
      cxt.addCase(match, handler);
    }
    // else {
    //   cxt = switchcase.getSwitch(name);
    // }

    // cxt.addCase(match, handler);
  }

  /**
   * Case Block Value
   * Outside of debugging, testing, or rare niche scenarios: this may not be useful
   */
  //% block="[Advanced/Test/Debug] switch $name matches case $match?"
  //% blockId=switchcase_case_block_value
  //% group="Advanced"
  //% weight=80
  //% draggableParameters=reporter
  export function caseBlockValue(name: string, match: any): boolean {
    //return match === switchValue || match == switchValue;
    let cxt = switchcase.createSwitch(name);
    if (cxt && cxt.IsValueSet)
      return cxt.matches(match);

    return false;
    
  }

  /**
   * Default-Case Block Container
   */
  //% block="default case"
  //% blockId=switchcase_default_case_block
  //% group="Control"
  //% weight=70
  //% draggableStatement=enabled
  export function defaultCaseBlock(name: string, handler: () => void): void {
    
    let cxt = switchcase.createSwitch(name);

    if (cxt)
      cxt.addDefault(handler);
  }

}
