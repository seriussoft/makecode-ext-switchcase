namespace switchblock {
  class SwitchContext {
    private Cases: { Match: any, Handler: () => void, IsDefault?: boolean }[] = [];

    addCase(match: any, handler: () => void): void {
      this.Cases.push({ Match: match, Handler: handler });
    }

    addDefault(handler: () => void): void {
      this.Cases.push({ Match: null, Handler: handler, IsDefault: true });
    }

    execute(value: any): void {
      let matched = false;
      for (let cb of this.Cases) {
        if (cb.Match === value || cb.Match == value) {
          cb.Handler();
          matched = true;
          break;
        }
      }
      if (!matched) {
        let defaultCase = this.Cases.find(cb => cb.IsDefault);
        if (defaultCase) defaultCase.Handler();
      }
      this.Cases = []; // clear after execution
    }
  }

}
