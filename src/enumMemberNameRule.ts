import { EnumDeclaration, EnumMember, Node, PropertyName, SourceFile } from "typescript";
import { Rules, RuleFailure } from "tslint";
import { CaseName, CaseValidator } from "./validators";
import { EnumDeclarationWalker } from "./walkers";

export class Rule extends Rules.AbstractRule {

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new EnumMemberNameWalker(sourceFile, this.ruleName, this.ruleArguments));
  }

}

class EnumMemberNameWalker extends EnumDeclarationWalker {

  private readonly validator = new EnumMemberCaseValidator(this.options, "pascal-case");

  protected visitEnumDeclaration(node: EnumDeclaration): void {
    node.members.forEach(this.visitEnumMember, this);
  }

  private visitEnumMember(node: EnumMember): void {
    this.visitEnumMemberName(node.name);
  }

  private visitEnumMemberName(node: PropertyName): void {
    this.checkEnumMemberName(node, node.getText());
  }

  private checkEnumMemberName(node: PropertyName, name: string): void {
    if (!this.validator.test(name)) {
      this.addFailureAtNode(node, this.validator.message);
    }
  }

}

class EnumMemberCaseValidator extends CaseValidator {

  protected toMessage(name: string): string {
    return `Enum members must be in ${name}`;
  }

}
