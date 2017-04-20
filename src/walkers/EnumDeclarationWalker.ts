import { EnumDeclaration, EnumMember, Node, SourceFile, SyntaxKind, forEachChild } from "typescript";
import { AbstractWalker } from "tslint";
import { BaseWalker } from "./BaseWalker";

/**
 * Walks the AST and visits each enum declaration.
 *
 * Subclasses must implement the `visitEnumDeclaration()` method.
 */
export abstract class EnumDeclarationWalker extends BaseWalker {

  protected abstract visitEnumDeclaration(node: EnumDeclaration): void;

  protected visitNode(node: Node): void {
    switch (node.kind) {
      case SyntaxKind.EnumDeclaration:
        this.visitEnumDeclaration(node as EnumDeclaration);
        break;
      case SyntaxKind.ModuleDeclaration:
      case SyntaxKind.ModuleBlock:
        this.visitChilden(node);
        break;
      default:
        // Nothing to check for this node or its descendants
    }
  }

}
