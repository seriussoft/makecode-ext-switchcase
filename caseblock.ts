//import { SwitchContext } from "./classes/switchcontext";
//import { SwitchManager } from "./classes/switchmanager";

/**
 * Logic: Switch-Case
 * 
 * color:  "#d9d3c4"
 * color2: "#ceb588"
 * Icons:
 *   lightning-bolt:  "\uf0e7"
 *   fa-scroll:       "\uf70e"
 *   fa-book:         "\uf02d"
 *   fa-file-alt:     "\uf15c"
 */
//% block="Logic: Switch-Case"
//% color="#d9d3c4" weight=300 icon="\uf70e"
//% groups=["Core","Advanced","Debug","Test"]
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

  //% block="PowerUp"
  //% blockId=switchcase_powerup
  export enum PowerUps {
    None = 0x0,
    Fireball = 0x1 << 0,
    Shell = 0x1 << 1,
    Poisonous = 0x1 << 2,
  }

  //% block="PowerDown"
  //% blockId=switchcase_powerdown
  export enum PowerDowns {
    None = 0x0,
    Stunned = 0x1 << 0,
    Weak = 0x1 << 1,
    Poisoned = 0x1 << 2,
  }
    

  /**
   * Case Block Container
   */
  //% block="switch:$name | case $match do $handler"
  //% blockId=switchcase_case_block
  //% group="Core"
  //% weight=90
  //% inlineInputMode="external"
  //% expandInput=true
  //% draggableParameters
  //% draggableStatement=enabled
  //% match.shadow="dropdown"
  //% match.defl="PowerUps.None"
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
  //% block="[Advanced/Test/Debug] | switch $name | does case match $match?"
  //% blockId=switchcase_case_block_value
  //% alias=switchcase_case_block
  //% blockAliasFor="switchcase.caseBlock"
  //% group="Advanced"
  //% weight=80
  //% draggableParameters="reporter"
  //% inlineInputMode="external"
  //% expandInput=true
  //% match.shadow="dropdown"
  //% match.defl="PowerUps.None
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
  //% block="switch $name | default case handles $handle"
  //% blockId=switchcase_default_case_block
  //% group="Core"
  //% weight=70
  //% draggableParameters
  //% draggableStatement="enabled"
  //% inlineInputMode="external"
  //% expandInput=true
  export function defaultCaseBlock(name: string, handler: () => void): void {
    
    let cxt = switchcase.createSwitch(name);

    if (cxt)
      cxt.addDefault(handler);
  }

}
