namespace switchcase {


  /**
   * TODO:    [X] Logic for Successful Execution Post-Action
   */
  export enum SuccessRuleBehaviors {
    Unknown,
    Default,
    ClearCases,
    ClearMatchedCaseOnly,
    ClearAllNonDefaultCases,
    ClearAllCasesButMatchedCaseAndDefaultCase,
    ClearAllCasesButMatchedCase,
  }

  export class Case {
    public Name?: string;
    public Match: any;
    public Handler: () => void;
    public IsDefault?: boolean;

    constructor() {
      this.Name = null;
      this.Match = {};
      this.Handler = null;
      this.IsDefault = false;
    }
    
    static createFrom ( name?: string, match any, handler: () => void, isDefault?: boolean): Case {
      let case: Case = new();
      case.Name = name;
      case.Match = match;
      case.Handler = handler;
      case.IsDefault = isDefault;
    }

    static create( data: { Name?: string, Match: any, Handler: () => void, IsDefault?: boolean } ) : Case {
      return Case.createFrom(data.Name, data.Match, data.Handler, data.IsDefault);
    }

    static empty() : Case {
      return Case.createFrom(name: null, match: {}, handler: null, isDefault: false);
    }
  }

  export class SwitchContext {
    private Cases: { Match: any, Handler: () => void, IsDefault?: boolean }[] = [];
    private TrueCases: Case[] = [];
    private Name: string;
    private Value: any;
    public IsValueSet: boolean;
    public OnExecutionSuccess_Default: boolean;
    public OnExecutionSuccess_ClearCases: boolean;
    public OnExecutionSuccess_ClearMatchedCaseOnly: boolean;
    public OnExecutionSuccess_ClearAllNonDefaultCases: boolean;
    public OnExecutionSuccess_ClearAllCasesButMatchedCase: boolean;
    public OnExecutionSuccess_ClearAllCasesButMatchedCaseAndDefaultCase: boolean

    protected SuccessRules: SuccessRuleBehaviors;

    constructor(name: string, value: any) {
      this.Value = value;
      this.Name = name;

      //TODO: [X] Add Clear Cases On Execute flag property
      this.IsValueSet = false;
      //this.OnExecutionSuccess_ClearCases = false;
      //this.SuccessRules = SuccessRuleBehaviors.Default;
      this.setExecutionSuccessRules(SuccessRuleBehaviors.Default);
    }

    

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

    protected runExecutionSuccessRules(value: any, wasSuccessful?: boolean) {
      
      if(!wasSuccessful)
        return;

      var matchedCase = this.Cases.find(c => c.Match === value || c.Match == value);

      switch(this.SuccessRules) {
        
        case SuccessRuleBehaviors.ClearCases:
          this.clearCases();
          break;
        case SuccessRuleBehaviors.ClearMatchedCaseOnly:
          if(matchedCase)
            //this.Cases.t
          break;
        case SuccessRuleBehaviors.ClearAllNonDefaultCases:
          
          break;
        case SuccessRuleBehaviors.ClearAllCasesButMatchedCaseAndDefaultCase:
          
          break;
        case SuccessRuleBehaviors.ClearAllCasesButMatchedCase:
          
          break;
        case SuccessRuleBehaviors.Default:
        case SuccessRuleBehaviors.Unknown:
        default:
          
          break;
      }
    }

    setValue(value: any): void {
      this.Value = value;
      if (this.Value)
        this.IsValueSet = this.Value;
      else
        this.IsValueSet = false;
    }

    /**
     * TODO:    [X] Added Logic For ClearCasesOnExecuteSuccess, setExecuteSuccessRule(SuccessRuleBehaviors);
     * enum SuccessRuleBehaviors {
     *   Unknown,
     *   Default,
     *   ClearCases,
     *   ClearMatchedCaseOnly,
     *   ClearAllNonDefaultCases,
     *   ClearAllCasesButMatchedCaseAndDefaultCase,
     *   ClearAllCasesButMatchedCase,
     * }
     * Scenarios that might use each case above:
     *  - ClearCases: The switch is a one-time deal for a one-off situation, so it needs to clear on execution.
     *  - ClearMatchedCaseOnly: Picking up a pwr-up that matches the existing one causes it to disappear and be replaced with a more powerful variant (like missiles/rockets in Diddy Kong Racing).
     *  - ClearAllNonDefaultCases: Picking up a special pwr-up replaces all non-default (non-HP/non-Shield/etc) pwr-ups with a brand new type that cannot exist while others are active.
     *  - ClearAllCasesButMatchedCaseAndDefaultCase: Picking up the leaf in Super Mario Bros. 3 replaces tiny mario, fireball mario, jumping-boot mario, frog mario, etc with just Flying Racoon/Tanookie Mario + default/large mario (and visa versa with any pwr-up).
     *  - ClearAllCasesButMatchedCase: Picking up tiny mario (realy tiny) in New Super Mario Bros 2 (3DS) will replace ALL mario variants with tiny mario (but does NOT reverse tiny mario if picked up again), and getting hit will not return you to tall mario or even small mario - it'll outright K.O. you...
     * 
     */
    setExecutionSuccessRules(successRules: SuccessRuleBehaviors ) {
      this.disableExecutionSuccessRules();
      this.SuccessRules = successRules;

      switch(successRules) {
        case SuccessRuleBehaviors.ClearCases:
          this.OnExecutionSuccess_ClearCases = true;
          break;
        case SuccessRuleBehaviors.ClearMatchedCaseOnly:
          this.OnExecutionSuccess_ClearMatchedCaseOnly = true;
          break;
        case SuccessRuleBehaviors.ClearAllNonDefaultCases:
          this.OnExecutionSuccess_ClearAllNonDefaultCases = true;
          break;
        case SuccessRuleBehaviors.ClearAllCasesButMatchedCaseAndDefaultCase:
          this.OnExecutionSuccess_ClearAllCasesButMatchedCaseAndDefaultCase = true;
          break;
        case SuccessRuleBehaviors.ClearAllCasesButMatchedCase:
          this.OnExecutionSuccess_ClearAllCasesButMatchedCase = true;
          break;
        case SuccessRuleBehaviors.Default:
        case SuccessRuleBehaviors.Unknown:
        default:
          this.OnExecutionSuccess_Default = true;
          break;
      }
    }

    disableExecutionSuccessRules() {
      this.OnExecutionSuccess_ClearCases = false;
      this.OnExecutionSuccess_ClearMatchedCaseOnly = false;
      this.OnExecutionSuccess_ClearAllNonDefaultCases = false;
      this.OnExecutionSuccess_ClearAllCasesButMatchedCaseAndDefaultCase = false;
      this.OnExecutionSuccess_ClearAllCasesButMatchedCase = false;
      this.OnExecutionSuccess_Default = false;
    }

    resetExecutionSuccessRules() {
      this.setExecutionSuccessRules(SuccessRuleBehaviors.Default);
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
    removeCase(match: any): { RemovalSuccess: boolean, Removed: { Match: any, Handler: () => void, IsDefault?: boolean } | undefined } {
      
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
      
      let toRemove: { Match: any, Handler: () => void, IsDefault?: boolean } | undefined;
      let removeSuccess = false;

      let tmp =
        this.Cases.find(cb => cb.Match === match || cb.Match == match);
      
      if(tmp)
        toRemove = tmp;

      if (toRemove) removeSuccess = this.Cases.remove(toRemove);
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

      let defaultCaseBlock: { Match: any, Handler: () => void, IsDefault?: boolean } | undefined;
      let found = this.Cases.find(dcb => dcb.IsDefault);
      if(found)
        defaultCaseBlock = found;
    
      let returnValue: { 
        RemovalSuccess: boolean, 
        Removed: { 
          Match: any
          , Handler: () => void
          , IsDefault?: boolean 
        } } = {
          RemovalSuccess: false, 
          Removed: {
            Match: {}, 
            Handler: () => return, 
            IsDefault: true,
          } };
      
      if (defaultCaseBlock) {
        this.Cases.remove(defaultCaseBlock);
        returnValue.RemovalSuccess = true;
        returnValue.Removed == defaultCaseBlock;
      }
      else {
        returnValue.RemovalSuccess = false;
        returnValue.Removed = defaultCaseBlock;
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
