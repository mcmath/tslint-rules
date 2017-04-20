import { EnumDeclaration, EnumMember, SourceFile } from "typescript";
import { Rules, RuleWalker, RuleFailure } from "tslint";
import { ENUM_MEMBER_NAME_OPTIONS } from "./enumMemberNameSchema";

export class Rule extends Rules.AbstractRule {

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new EnumMembersWalker(sourceFile, this.getOptions()));
  }

}

class EnumMembersWalker extends RuleWalker {

  public visitEnumDeclaration(node: EnumDeclaration): void {
    node.members.forEach(this.validateEnumMember, this);
    super.visitEnumDeclaration(node);
  }

  private validateEnumMember(node: EnumMember): void {
    this.validateEnumMemberName(node, node.name.getText());
  }

  private validateEnumMemberName(node: EnumMember, name: string): void {
    for (const { option, description, validate } of ENUM_MEMBER_NAME_OPTIONS) {
      if (this.hasOption(option)) {
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
