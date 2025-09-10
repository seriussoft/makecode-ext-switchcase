import { SwitchContext } from "./classes/switchcontext";
import { SwitchManager } from "./classes/switchmanager";


namespace switchcase {


    /**
     * TODO:    [ ] Import SwitchManager and SwitchContext
     * TODO:    [ ] Hook-Up SwitchManager and SwitchContext (and switchBlock?)
     * TODO:    [ ] Does caseBlockValue need to have the pointer decorator (to point to switchBlock)?
     * TODO:    [ ] Can we put a test "game" inside this project?
     * TODO:    [ ] If we do the above (test "game"), will it bloat people's games who import our switchcase extension? Options?
     * TODO:    [ ] Assign Iconic FFVII Green to the Master Group and it's Children blocks
     * TODO:    [ ] Create Master Group for each of these subgroups and blocks
     * TODO:    [ ] Assign weight so that Master Group is higher up in the list
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
    //% group="Control"
    //% weight=90
    //% draggableParameters
    //% draggableStatement=true
    export function caseBlock(match: any, handler: () => void): void {
        //Placeholder for CodeGen
        //currentSwitchCase.addCase(match, handler)
    }

    /**
     * Case Block Value
     */
    //% block="case $match"
    //% blockId=switchcase_case_block_value
    //% group="Control"
    //% weight=80
    //% draggableParameters
    export function caseBlockValue(match: any): boolean {
      //return match === switchValue || match == switchValue;
      
      return false;
      
    }

    /**
     * Default-Case Block Container
     */
    //% block="default case"
    //% blockId=switchcase_default_case_block
    //% group="Control"
    //% weight=70
    //% draggableStatement=true
    export function defaultCaseBlock(): void {
        //Placeholder for CodeGen
    }

}
