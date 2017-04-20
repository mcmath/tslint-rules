import { isCamelCase, isCapsCase, isPascalCase, isSnakeCase } from "../util";

export type CaseName = "pascal-case" | "camel-case" | "caps-case" | "snake-case";

export interface CaseOption {
  name: string;
  test: (str: string) => boolean;
}

export abstract class CaseValidator {

  private static CASE_OPTIONS: { [option: string]: CaseOption } = {
    "camel-case": { name: "camelCase", test: isCamelCase },
    "caps-case": { name: "CAPS_CASE", test: isCapsCase },
    "pascal-case": { name: "PascalCase", test: isPascalCase },
    "snake-case": { name: "snake_case", test: isSnakeCase }
  };

  private static getCaseOption(options: Set<string>, defaultTo: CaseName): string {
    for (const option of Object.keys(CaseValidator.CASE_OPTIONS)) {
      if (options.has(option)) return option;
    }

    return defaultTo;
  }

  public readonly message: string;
  public readonly test: (str: string) => boolean;

  public constructor(options: Set<string>, defaultTo: CaseName) {
    const option = CaseValidator.getCaseOption(options, defaultTo);

    this.message = this.toMessage(CaseValidator.CASE_OPTIONS[option].name);
    this.test = CaseValidator.CASE_OPTIONS[option].test;
  }

  protected abstract toMessage(name: string): string;

}
