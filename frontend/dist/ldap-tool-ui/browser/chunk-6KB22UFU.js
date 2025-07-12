import {
  CommonModule
} from "./chunk-D5ITJBUD.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext
} from "./chunk-LZEVO7MZ.js";

// src/app/components/modify/modify.component.ts
var ModifyComponent = class _ModifyComponent {
  static \u0275fac = function ModifyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ModifyComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ModifyComponent, selectors: [["app-modify"]], decls: 8, vars: 0, consts: [[1, "modify-container"]], template: function ModifyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "h2");
      \u0275\u0275text(2, "LDAP Entry Modification");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "p");
      \u0275\u0275text(4, "This component will provide LDAP entry modification functionality.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "p")(6, "em");
      \u0275\u0275text(7, "Coming soon: Add, replace, and delete operations on LDAP entries");
      \u0275\u0275domElementEnd()()();
    }
  }, dependencies: [CommonModule], styles: ["\n\n.modify-container[_ngcontent-%COMP%] {\n  padding: 2rem;\n  text-align: center;\n}\nh2[_ngcontent-%COMP%] {\n  color: #667eea;\n  margin-bottom: 1rem;\n}\np[_ngcontent-%COMP%] {\n  color: #666;\n  margin: 0.5rem 0;\n}\n/*# sourceMappingURL=modify.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModifyComponent, [{
    type: Component,
    args: [{ selector: "app-modify", imports: [CommonModule], template: `
    <div class="modify-container">
      <h2>LDAP Entry Modification</h2>
      <p>This component will provide LDAP entry modification functionality.</p>
      <p><em>Coming soon: Add, replace, and delete operations on LDAP entries</em></p>
    </div>
  `, styles: ["/* angular:styles/component:scss;5b059b7efb156b1fa7ce93866ff3df40b7ec6b1fb15a5b25f252ea035293cabe;/home/jheer/Documents/git/Angular/ldaptoolUI/src/app/components/modify/modify.component.ts */\n.modify-container {\n  padding: 2rem;\n  text-align: center;\n}\nh2 {\n  color: #667eea;\n  margin-bottom: 1rem;\n}\np {\n  color: #666;\n  margin: 0.5rem 0;\n}\n/*# sourceMappingURL=modify.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ModifyComponent, { className: "ModifyComponent", filePath: "src/app/components/modify/modify.component.ts", lineNumber: 29 });
})();
export {
  ModifyComponent
};
//# sourceMappingURL=chunk-6KB22UFU.js.map
