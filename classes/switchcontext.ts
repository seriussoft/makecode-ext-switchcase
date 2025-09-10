
namespace switchcase {
  export class SwitchContext {
    private Cases: { Match: any, Handler: () => void, IsDefault?: boolean }[] = [];
    private Value: any;
    public IsValueSet: boolean;

    addCase(match: any, handler: () => void): void {
      this.Cases.push({ Match: match, Handler: handler });
    }

    addDefault(handler: () => void): void {
      this.Cases.push({ Match: null, Handler: handler, IsDefault: true });
    }

    execute(): void {
      this.executeFromValue(this.Value);
    }

    executeFromValue(value: any): void {
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
      //for now, let's keep the cases present, and instead of clearing them (for hygene),
      //  let's instead go with a route that only sets them up the first time, and every other
      //  time, instead of adding a case, the user would simply detect it already exists
      //  and use what's there
      //this.Cases = []; // clear after execution
    }

    setValue(value: any): void {
      this.Value = value;
      if (this.Value)
        this.IsValueSet = this.Value;
      else
        this.IsValueSet = false;
    }

    matches(match: any): boolean {
      return (this.Value == match || this.Value == match);
    }

    clearCases(): void {
      this.Cases = [];
    }

    /**
     * Remove Case (Non-Default Case)
     *  and return both the success of removal and the removed case.
     * 
     * Parameters:
     *  @param {any} match
     *    This is the match property found on your case. For DefaultCase, please see: {@look SwitchContext#removeDefaultCase}
     * @returns: 
     *  { removalSuccess: boolean, removed: { Match: any, Handler: () => void, IsDefault?: boolean } }
     */
    removeCase(match: any): { RemovalSuccess: boolean, Removed: { Match: any, Handler: () => void, IsDefault?: boolean } } {
      
      /*
      let toRemove: { Match: any, Handler: () => void, IsDefault?: boolean };
      let matched = false;
      
      for (let cb in this.Cases) {
        if (cb.Match === match || cb.Match == match) {
          toRemove = cb;
          matched = true;
          break;
        }
      }
      */
      
      let toRemove: { Match: any, Handler: () => void, IsDefault?: boolean };
      let removeSuccess = false;

      toRemove =
        this.Cases.find(cb => cb.Match === match || cb.Match == match);
      
      if (toRemove) removeSuccess = this.Cases.removeElement(toRemove);
      //if (removeSuccess) return toRemove;
      
      return { RemovalSuccess: removeSuccess, Removed: toRemove };

      /*
      if(match.IsDefault)
  
      if (match.IsDefault) {
        toRemove = this.Cases.find(cb => cb.IsDefault);
        if (toRemove) {
          if (this.Cases.removeElement(defaultCase)) return defaultCase;
        }
      }
      */

    }

    /**
     * Remove Default Case
     *  and return both the success of removal and the removed case
     * To remove a specific NON-Default case, please see: {@see SwitchContext#removeCase}
     * 
     * Parameters:
     *  NONE
     * Returns:
     *  @returns:
     *    { RemovalSuccess: boolean, Removed: { Match: any, Handler: () => void, IsDefault?: boolean } }
     *    The success of finding and removing the defaultCaseBlock AND the defaultCaseBlock that was removed.
     */
    removeDefaultCase(): {
      RemovalSuccess: boolean
      , Removed: { Match: any, Handler: () => void, IsDefault?: boolean }
    } {

      let defaultCaseBlock: { Match: any, Handler: () => void, IsDefault?: boolean };
      defaultCaseBlock = this.Cases.find(dcb => dcb.IsDefault);
    
      let returnValue: { RemovalSuccess: boolean, Removed: { Match: any, Handler: () => void, IsDefault?: boolean } };
      if (defaultCaseBlock) {
        returnValue.RemovalSuccess = true;
        returnValue.Removed == defaultCaseBlock;
      }
      else {
        returnValue.RemovalSuccess = false;
        returnValue.Removed = defaultCaseBlock
      }

      return returnValue;
    }

    caseCount(): number {
      return this.Cases.length;
    }
    /**
     * class SwitchContext {
     *   [private] Cases { Match: any, handler: () => void, IsDefault?: boolean  }[]
     *   addCase(match: any, handler: () => void): void;
     *   addDefault(handler: () => void): void;
     *   execute(value: any): void;
     *   caseCount(): number;
     * }
     */
  }
}

