import { EnumDeclaration, Identifier, Node, SourceFile } from "typescript";
import { Rules, RuleFailure } from "tslint";
import { CaseName, CaseValidator } from "./validators";
import { EnumDeclarationWalker } from "./walkers";

export class Rule extends Rules.AbstractRule {

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new EnumNameWalker(sourceFile, this.ruleName, this.ruleArguments));
  }

}

class EnumNameWalker extends EnumDeclarationWalker {

  private readonly validator = new EnumNameCaseValidator(this.options, "pascal-case");

  protected visitEnumDeclaration(node: EnumDeclaration): void {
    this.visitEnumName(node.name);
  }

  private visitEnumName(node: Identifier): void {
    this.checkEnumName(node, node.getText());
  }

  private checkEnumName(node: Identifier, name: string): void {
    if (!this.validator.test(name)) {
      this.addFailureAtNode(node, this.validator.message);
    }
  }

}

class EnumNameCaseValidator extends CaseValidator {

  protected toMessage(name: string): string {
    return `Enum names must be in ${name}`;
  }

}
