//import { SwitchContext } from "./switchcontext";

namespace switchcase {
  export class SwitchManager {
    private Switches: { [Name: string]: SwitchContext } = {};

    constructor() {
      this.create("default");
    }

    create(name: string): SwitchContext {
      const ctx = new SwitchContext(name, {});
      this.Switches[name] = ctx;
      return ctx;
    }

    createWithValue(name: string, value: any): SwitchContext {
      let cxt = this.create(name);
      cxt.setValue(value);
      return cxt;
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
}


