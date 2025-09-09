namespace switchblock {
  class SwitchManager {
      private switches: { [name: string]: SwitchContext } = {};
  
      create(name: string): SwitchContext {
          const ctx = new SwitchContext();
          this.switches[name] = ctx;
          return ctx;
      }
  
      get(name: string): SwitchContext {
          return this.switches[name];
      }
  
      debug(name: string): void {
          const ctx = this.switches[name];
          console.log(`Switch "${name}" has ${ctx.caseCount()} cases`);
      }
  }
}
