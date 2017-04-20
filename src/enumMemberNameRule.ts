import { EnumDeclaration, EnumMember, Node, SourceFile, SyntaxKind, forEachChild } from "typescript";
import { AbstractWalker, Rules, RuleFailure } from "tslint";

export interface CaseOption {
  option: string;
  description: string;
  test: (memberName: string) => boolean;
}

export class Rule extends Rules.AbstractRule {

  public static readonly DEFAULT_CASE_OPTION: CaseOption = {
    option: "pascal-case",
    description: "PascalCase",
    test: (name: string) => /^[A-Z][0-9A-Za-z]*$/.test(name) && (name.length === 1 || /[a-z]/.test(name))
  };

  public static readonly CASE_OPTIONS: CaseOption[] = [{
    option: "camel-case",
    description: "camelCase",
    test: (name: string) => /^[a-z][0-9A-Za-z]*$/.test(name)
  }, {
    option: "caps-case",
    description: "CAPS_CASE",
    test: (name: string) => /^[A-Z][0-9A-Z_]*[0-9A-Z]$|^[A-Z]$/.test(name)
  }, {
    option: "snake-case",
    description: "snake_case",
    test: (name: string) => /^[a-z][0-9a-z_]*[0-9a-z]$|^[a-z]$/.test(name)
  }];

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new EnumMemberNameWalker(sourceFile, this.ruleName, this.ruleArguments));
  }

}

class EnumMemberNameWalker extends AbstractWalker<Set<string>> {

  public constructor(sourceFile: SourceFile, ruleName: string, ruleArguments: any[]) {
    super(sourceFile, ruleName, new Set(ruleArguments.map(String)));
    this.visitNode = this.visitNode.bind(this);
  }

  public walk(sourceFile: SourceFile): void {
    forEachChild(sourceFile, this.visitNode);
  }

  private visitNode(node: Node): void {
    if (node.kind === SyntaxKind.EnumDeclaration) {
      this.visitEnumDeclaration(node as EnumDeclaration);
    }
  }

  private visitEnumDeclaration(node: EnumDeclaration): void {
    node.members.forEach(this.visitEnumMember, this);
  }

  private visitEnumMember(node: EnumMember): void {
    this.checkEnumMemberName(node);
  }

  private checkEnumMemberName(node: EnumMember): void {
    const name = node.name.getText();

    for (const { option, description, test } of Rule.CASE_OPTIONS) {
      if (this.options.has(option)) {
        if (!test(name)) this.registerFailure(node, description);
        return;
      }
    }

    if (!Rule.DEFAULT_CASE_OPTION.test(name)) {
      this.registerFailure(node, Rule.DEFAULT_CASE_OPTION.description);
    }
  }

  private registerFailure(node: EnumMember, description: string): void {
    this.addFailureAtNode(node, `Enum members must be in ${description}`);
  }

}
