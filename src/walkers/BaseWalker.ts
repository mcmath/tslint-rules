import { EnumDeclaration, EnumMember, Node, SourceFile, SyntaxKind, forEachChild } from "typescript";
import { AbstractWalker } from "tslint";

/**
 * Walks the AST and visits its nodes.
 *
 * Subclasses must implement the `visitNode()` method, and may call
 * `visitChilden()` to call `visitNode()` for each of a node's children.
 */
export abstract class BaseWalker extends AbstractWalker<Set<string>> {

  public constructor(sourceFile: SourceFile, ruleName: string, ruleArguments: any[]) {
    super(sourceFile, ruleName, new Set(ruleArguments.map(String)));
    this.visitNode = this.visitNode.bind(this); // Bind for use as `forEachChild()` callback
  }

  public walk(sourceFile: SourceFile): void {
    this.visitChilden(sourceFile);
  }

  /**
   * Visits an AST node.
   */
  protected abstract visitNode(node: Node): void;

  /**
   * Calls `visitNode()` for each child of a given node.
   */
  protected visitChilden(node: Node): void {
    forEachChild(node, this.visitNode);
  }

}
