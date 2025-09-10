
import { SwitchContext } from "./classes/switchcontext";
import { SwitchManager } from "./classes/switchmanager";

let switchManager = new SwitchManager();

namespace switchcase {

  /**
   * TODO:  [ ] Check ToDo List in case.ts, classes/switchcontext.ts, and classes/switchmanager.ts
   * TODO:  [ ] Import SwitchManager and SwitchContext
   * TODO:  [ ] Hook-Up SwitchManager and SwitchContext
   */

  let currentSwitch: SwitchContext;

    /**
     * Switch Block Container
     */
    //% block="switch $value"
    //% blockId=switchcase_switch_block
    //% group="Control"
    //% weight=100
    //% draggableParameters
    export function switchBlock(value: any): void {
        //this is just a container; actual logic is in codegen
        //Placeholder for CodeGen

      currentSwitch.execute(value);   

    }

    /**
     * Case Block Container
     * File:    "case.ts"
     * caseBlock(match: any, handler = () => void);
     * block:   "case $match do $handler"
     * blockId: switchcase_case_block
     * group:   "Control"
     * weight:  90
     * draggableParameters
     * draggableStatement=true
     */
  
  /**
   * Case Block Value
   * File:    "case.ts"
   * caseBlockValue(match: any) : boolean;
   * block:   "case $match $switch"
   * blockId: switchcase_case_block_value
   * group:   
   */

  /**
   * Default Case Block
   * 
   * block:   "default case"
   * blockId: switchcase_default_case_block
   * group:   "Control"
   * weight:  80
   * draggableStatement=true
   * 
   */
  
    

    /**
     * Default-Case Block Container
     */
    /**********************
    //% block="default case"
    //% blockId=switchcase_default_case_block
    //% group="Control"
    //% weight=80
    //% draggableStatement=true
    export function defaultCaseBlock(): void {
        //Placeholder for CodeGen
    }
    *********************/

    
}

