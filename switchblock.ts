
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
  //% block="switch $value"
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
  //% block="switch $name execute on above cases"
  //% blockId=switchcase_switch_executor
  //% group="Control"
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
   * Instantiate the SwitchContext, or retrieve it, but do NOT execute on it. Merely assign the value to it.
   */
  //% block="create switch:$name with value:$value"
  //% blockId="switchcase_create_switch_full"
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
  //% blockSetVariable=switchContext
  export function createSwitch(name: string) : SwitchContext {
    let cxt = switchManager.get(name);
    if(cxt)
      return cxt;

    cxt = switchManager.create(name);
    return cxt;
  }

  /**
   * Set the Current Switch by name (from the local switchManager)
   */
  //% block="set active name: $name"
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

