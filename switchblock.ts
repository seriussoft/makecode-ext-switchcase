
//import { SwitchContext } from "./classes/switchcontext";
//import { SwitchManager } from "./classes/switchmanager";

//let switchManager = new SwitchManager();

namespace switchcase {

  /**
   * TODO:  [ ] Check ToDo List in case.ts, classes/switchcontext.ts, and classes/switchmanager.ts
   * TODO:  [ ] Import SwitchManager and SwitchContext
   * TODO:  [ ] Hook-Up SwitchManager and SwitchContext
   */

  let switchManager: SwitchManager = new switchcase.SwitchManager();
  let currentSwitch: SwitchContext = switchManager.create("default");
  let currentSwitchName: string = "default";
  console.debug(currentSwitchName);
  

  /**
   * Switch Block Container
   */
  //% block="switch $name looking for $value"
  //% blockId=switchcase_switch_block
  //% group="Control"
  //% weight=199
  //% draggableParameters
  export function switchBlock(name: string, value: any): void {
    /*  
    let cxt = switchManager.get(name);
    
    if (cxt) {
      //nothing will go here, i merely wanted an easy way to handle what's in the else block
    }
    else {
      cxt = switchManager.create(name);
      cxt.setValue(value);
    }
    if (cxt.IsValueSet && myCurrent)
      cxt.execute();
    else
      myCurrentSwitch.execute(value);
    */
    
    let cxt = createSwitchFull(name, value);

    if (!cxt)
      return;

    if (cxt.IsValueSet && cxt.caseCount() > 0)
      cxt.execute();
    else if (cxt.caseCount() > 0)
      cxt.executeFromValue(value);
    else
      return;
  }

  /**
   * Use this after all case blocks have been added to your switch.
   *  It will run the SwitchContext.execute() after pulling the switch by the correct name.
   */
  //% block="switch $name :: execute on registered value against registered cases"
  //% blockId=switchcase_switch_execute
  //% group="Advanced Timing"
  //% weight=190
  //% draggableParameters
  export function executeSwitch(name: string) {
    let cxt = switchManager.create(name);
    if (!cxt) {
      //throw an error?
      return;
    }
    
    if (!cxt.IsValueSet) {
      // throw error?
      return;
    }
      
    cxt.execute();
  }

  /**
   * execute the switch [name] on [value].
   *   Use this when you want to run a registered switch and it's
    *    registered cases against a specific value
   */
  //% block="switch $name :: execute on $value against registered cases"
  //% blockId=switchcase_execute_switch_on_value
  //% group="Advanced Timing"
  //% weight=60
  //% draggableParameters
  export function executeSwitchOnValue(name: string, value: any) {
    let cxt = switchManager.create(name);
    if(!cxt) {
      //throw error?
      return;
    }

    cxt.executeFromValue(value);
  }

  /**
   * Instantiate the SwitchContext, or retrieve it, but do NOT execute on it. Merely assign the value to it.
   */
  //% block="create switch $name looking for $value"
  //% blockId="switchcase_create_switch_full"
  //% group="Advanced Timing"
  //% blockSetVariable=switchContext
  export function createSwitchFull(name: string, value: any): SwitchContext {
    let cxt = createSwitch(name);
    if (cxt)
      cxt.setValue(value);

    return cxt;
  }
    
  /**
   * Get or Create SwitchContext instance.
   */
  //% block="create (or get) switch $name"
  //% blockId="switchcase_create_or_get_switch"
  //% group="Core"
  //% blockSetVariable=switchContext
  export function createSwitch(name: string) : SwitchContext {
    let cxt = switchManager.get(name);
    if(cxt) {
      switchContext = cxt;
      return cxt;
    }

    cxt = switchManager.create(name);
    switchContext = cxt;
    return cxt;
  }

  /**
   * Set the Current Switch by name (from the local switchManager)
   */
  //% block="set active switch name: $name"
  //% blockId=switchcase_set_current_switch_name
  //% group="Debugging & Testing"
  //% blockSetVariable=currentSwitchName
  export function setCurrentSwitch(name: string) {
    currentSwitchName = name;
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
   * weight:  70
   * draggableStatement=true
   * 
   */
  
    

    

    
}

