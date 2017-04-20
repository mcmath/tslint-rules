import { EnumDeclaration, EnumMember, Node, SourceFile, SyntaxKind, forEachChild } from "typescript";
import { AbstractWalker, Rules, RuleFailure } from "tslint";
import { ENUM_MEMBER_NAME_OPTIONS } from "./enumMemberNameSchema";

export class Rule extends Rules.AbstractRule {

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

    for (const { option, description, validate } of ENUM_MEMBER_NAME_OPTIONS) {
      if (this.options.has(option)) {
        if (!validate(name)) this.registerFailure(node, description);
        return;
      }
    }

    if (!ENUM_MEMBER_NAME_OPTIONS[0].validate(name)) {
      this.registerFailure(node, ENUM_MEMBER_NAME_OPTIONS[0].description);
    }
  }

  private registerFailure(node: EnumMember, description: string): void {
    this.addFailureAtNode(node, `Enum members must be in ${description}`);
  }

}
