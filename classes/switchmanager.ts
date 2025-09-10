import { SwitchContext } from "../classes/switchcontext"

//namespace classes {

class SwitchManager {
  private Switches: { [Name: string]: SwitchContext } = {};

  create(name: string): SwitchContext {
    const ctx = new SwitchContext();
    this.Switches[name] = ctx;
    return ctx;
  }

  get(name: string): SwitchContext {
    return this.Switches[name];
  }

  debug(name: string): void {
    const ctx = this.Switches[name];
    console.log(`Switch "${name}" has ${ctx.caseCount()} cases`);
  }

  /**
   * class SwitchManager {
   *   [private] Switches { [Name: string]: SwitchContext }
   *   create(name: string): SwitchContext;
   *   get(name: string): SwitchContext;
   *   debug(name: string): void
   * }
   */

}
//}

