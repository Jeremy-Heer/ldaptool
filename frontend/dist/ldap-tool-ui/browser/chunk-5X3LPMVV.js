import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-VNAHO57A.js";
import {
  MatDivider,
  MatDividerModule,
  MatList,
  MatListItem,
  MatListModule
} from "./chunk-T5KQRVS2.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  LdapService,
  LocalStorageService,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  NgControlStatus,
  NgControlStatusGroup,
  NotificationService,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-XJQLNSD6.js";
import {
  MatButton,
  MatButtonModule,
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatTab,
  MatTabGroup,
  MatTabsModule
} from "./chunk-6CP7BVDO.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-D5ITJBUD.js";
import {
  Component,
  __async,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-LZEVO7MZ.js";

// src/app/components/connection/connection.component.ts
var _c0 = (a0, a1) => ({ "success": a0, "error": a1 });
function ConnectionComponent_mat_error_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, " Host is required ");
    \u0275\u0275elementEnd();
  }
}
function ConnectionComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "mat-form-field", 6)(2, "mat-label");
    \u0275\u0275text(3, "Connection Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 21);
    \u0275\u0275elementEnd()();
  }
}
function ConnectionComponent_mat_icon_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "hourglass_empty");
    \u0275\u0275elementEnd();
  }
}
function ConnectionComponent_mat_icon_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "wifi");
    \u0275\u0275elementEnd();
  }
}
function ConnectionComponent_mat_list_46_mat_list_item_1_mat_divider_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-divider");
  }
}
function ConnectionComponent_mat_list_46_mat_list_item_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-list-item")(1, "div", 23)(2, "div", 24)(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 25);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 26)(10, "button", 27);
    \u0275\u0275listener("click", function ConnectionComponent_mat_list_46_mat_list_item_1_Template_button_click_10_listener() {
      const conn_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.loadConnection(conn_r2));
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "launch");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 28);
    \u0275\u0275listener("click", function ConnectionComponent_mat_list_46_mat_list_item_1_Template_button_click_13_listener() {
      const i_r4 = \u0275\u0275restoreView(_r1).index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteConnection(i_r4));
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(16, ConnectionComponent_mat_list_46_mat_list_item_1_mat_divider_16_Template, 1, 0, "mat-divider", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const conn_r2 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(conn_r2.name || conn_r2.host);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", conn_r2.host, ":", conn_r2.port, " (", conn_r2.useSSL ? "SSL" : "Plain", ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(conn_r2.bindDn);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", i_r4 < ctx_r2.savedConnections.length - 1);
  }
}
function ConnectionComponent_mat_list_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-list");
    \u0275\u0275template(1, ConnectionComponent_mat_list_46_mat_list_item_1_Template, 17, 6, "mat-list-item", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.savedConnections);
  }
}
function ConnectionComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "mat-icon");
    \u0275\u0275text(2, "storage");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No saved connections found");
    \u0275\u0275elementEnd()();
  }
}
function ConnectionComponent_mat_card_48_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "strong");
    \u0275\u0275text(2, "Server Info:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.connectionStatus.details, " ");
  }
}
function ConnectionComponent_mat_card_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 30)(1, "mat-card-content")(2, "div", 31)(3, "mat-icon");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, ConnectionComponent_mat_card_48_div_10_Template, 4, 1, "div", 32);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(5, _c0, ctx_r2.connectionStatus.success, !ctx_r2.connectionStatus.success));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.connectionStatus.success ? "check_circle" : "error");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.connectionStatus.success ? "Connection Successful" : "Connection Failed");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.connectionStatus.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.connectionStatus.details);
  }
}
var ConnectionComponent = class _ConnectionComponent {
  fb;
  ldapService;
  localStorageService;
  notificationService;
  connectionForm;
  testing = false;
  connectionStatus = null;
  savedConnections = [];
  constructor(fb, ldapService, localStorageService, notificationService) {
    this.fb = fb;
    this.ldapService = ldapService;
    this.localStorageService = localStorageService;
    this.notificationService = notificationService;
    this.connectionForm = this.fb.group({
      host: ["", Validators.required],
      port: [389, [Validators.required, Validators.min(1), Validators.max(65535)]],
      useSSL: [false],
      bindDn: [""],
      password: [""],
      saveConnection: [false],
      connectionName: [""]
    });
  }
  ngOnInit() {
    this.loadSavedConnections();
    this.loadFromUrlParams();
    this.connectionForm.get("saveConnection")?.valueChanges.subscribe((save) => {
      const nameControl = this.connectionForm.get("connectionName");
      if (save) {
        nameControl?.setValidators([Validators.required]);
      } else {
        nameControl?.clearValidators();
      }
      nameControl?.updateValueAndValidity();
    });
  }
  loadSavedConnections() {
    this.savedConnections = this.localStorageService.getSavedConnections();
  }
  loadFromUrlParams() {
    const urlParams = this.localStorageService.loadFromUrlParams();
    if (urlParams) {
      this.connectionForm.patchValue(urlParams);
      this.notificationService.showSuccess("Connection parameters loaded from URL");
    }
  }
  loadConnection(connection) {
    this.connectionForm.patchValue({
      host: connection.host,
      port: connection.port,
      useSSL: connection.useSSL,
      bindDn: connection.bindDn,
      password: "",
      // Don't pre-fill password for security
      saveConnection: false,
      connectionName: ""
    });
    this.notificationService.showSuccess(`Loaded connection: ${connection.name || connection.host}`);
  }
  deleteConnection(index) {
    const connection = this.savedConnections[index];
    this.localStorageService.deleteConnection(connection.name || connection.host);
    this.loadSavedConnections();
    this.notificationService.showSuccess(`Deleted connection: ${connection.name || connection.host}`);
  }
  testConnection() {
    return __async(this, null, function* () {
      if (this.connectionForm.invalid)
        return;
      this.testing = true;
      this.connectionStatus = null;
      try {
        const connectionData = this.connectionForm.value;
        const result = yield this.ldapService.testConnection(connectionData).toPromise();
        if (result) {
          this.connectionStatus = {
            success: result.success,
            message: result.message,
            details: result.success ? "Connection test completed successfully" : void 0
          };
          if (result.success && connectionData.saveConnection && connectionData.connectionName) {
            this.localStorageService.saveConnection(__spreadProps(__spreadValues({}, connectionData), {
              name: connectionData.connectionName
            }));
            this.loadSavedConnections();
            this.notificationService.showSuccess(`Connection saved as: ${connectionData.connectionName}`);
          }
          if (result.success) {
            this.notificationService.showSuccess("LDAP connection test successful!");
          } else {
            this.notificationService.showError(`Connection failed: ${result.message}`);
          }
        }
      } catch (error) {
        this.connectionStatus = {
          success: false,
          message: error.message || "Failed to connect to LDAP server"
        };
        this.notificationService.showError(`Connection failed: ${error.message}`);
      } finally {
        this.testing = false;
      }
    });
  }
  static \u0275fac = function ConnectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConnectionComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(LdapService), \u0275\u0275directiveInject(LocalStorageService), \u0275\u0275directiveInject(NotificationService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConnectionComponent, selectors: [["app-connection"]], decls: 49, vars: 11, consts: [[1, "connection-container"], [1, "connection-card"], ["label", "Connection"], [1, "tab-content"], [3, "ngSubmit", "formGroup"], [1, "form-row"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "host", "placeholder", "ldap.company.com"], [4, "ngIf"], ["appearance", "outline"], ["matInput", "", "type", "number", "formControlName", "port", "placeholder", "389"], ["formControlName", "useSSL"], ["matInput", "", "formControlName", "bindDn", "placeholder", "cn=admin,dc=company,dc=com"], ["matInput", "", "type", "password", "formControlName", "password"], ["formControlName", "saveConnection"], ["class", "form-row", 4, "ngIf"], [1, "actions"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["label", "Saved Connections", 3, "disabled"], ["class", "no-connections", 4, "ngIf"], ["class", "status-card", 3, "ngClass", 4, "ngIf"], ["matInput", "", "formControlName", "connectionName", "placeholder", "My LDAP Server"], [4, "ngFor", "ngForOf"], [1, "connection-item"], [1, "connection-info"], [1, "bind-dn"], [1, "connection-actions"], ["mat-icon-button", "", "matTooltip", "Load Connection", 3, "click"], ["mat-icon-button", "", "matTooltip", "Delete Connection", "color", "warn", 3, "click"], [1, "no-connections"], [1, "status-card", 3, "ngClass"], [1, "status-content"], ["class", "details", 4, "ngIf"], [1, "details"]], template: function ConnectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-card-title");
      \u0275\u0275text(4, "LDAP Connection Configuration");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "mat-card-subtitle");
      \u0275\u0275text(6, "Configure and test your LDAP connection");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-card-content")(8, "mat-tab-group")(9, "mat-tab", 2)(10, "div", 3)(11, "form", 4);
      \u0275\u0275listener("ngSubmit", function ConnectionComponent_Template_form_ngSubmit_11_listener() {
        return ctx.testConnection();
      });
      \u0275\u0275elementStart(12, "div", 5)(13, "mat-form-field", 6)(14, "mat-label");
      \u0275\u0275text(15, "Server Host");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "input", 7);
      \u0275\u0275template(17, ConnectionComponent_mat_error_17_Template, 2, 0, "mat-error", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 5)(19, "mat-form-field", 9)(20, "mat-label");
      \u0275\u0275text(21, "Port");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "input", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "mat-checkbox", 11);
      \u0275\u0275text(24, " Use SSL/TLS ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 5)(26, "mat-form-field", 6)(27, "mat-label");
      \u0275\u0275text(28, "Bind DN");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "input", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 5)(31, "mat-form-field", 6)(32, "mat-label");
      \u0275\u0275text(33, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(34, "input", 13);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 5)(36, "mat-checkbox", 14);
      \u0275\u0275text(37, " Save this connection ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(38, ConnectionComponent_div_38_Template, 5, 0, "div", 15);
      \u0275\u0275elementStart(39, "div", 16)(40, "button", 17);
      \u0275\u0275template(41, ConnectionComponent_mat_icon_41_Template, 2, 0, "mat-icon", 8)(42, ConnectionComponent_mat_icon_42_Template, 2, 0, "mat-icon", 8);
      \u0275\u0275text(43);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(44, "mat-tab", 18)(45, "div", 3);
      \u0275\u0275template(46, ConnectionComponent_mat_list_46_Template, 2, 1, "mat-list", 8)(47, ConnectionComponent_div_47_Template, 5, 0, "div", 19);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275template(48, ConnectionComponent_mat_card_48_Template, 11, 8, "mat-card", 20);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      \u0275\u0275advance(11);
      \u0275\u0275property("formGroup", ctx.connectionForm);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ((tmp_1_0 = ctx.connectionForm.get("host")) == null ? null : tmp_1_0.invalid) && ((tmp_1_0 = ctx.connectionForm.get("host")) == null ? null : tmp_1_0.touched));
      \u0275\u0275advance(21);
      \u0275\u0275property("ngIf", (tmp_2_0 = ctx.connectionForm.get("saveConnection")) == null ? null : tmp_2_0.value);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.connectionForm.invalid || ctx.testing);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.testing);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.testing);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.testing ? "Testing..." : "Test Connection", " ");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.savedConnections.length === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.savedConnections.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.savedConnections.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.connectionStatus);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatCheckboxModule,
    MatCheckbox,
    MatIconModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatListModule,
    MatList,
    MatListItem,
    MatDivider,
    MatDividerModule,
    MatTabsModule,
    MatTab,
    MatTabGroup
  ], styles: ["\n\n.connection-container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 2rem auto;\n  padding: 1rem;\n}\n.connection-card[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 1rem 0;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  align-items: center;\n}\n.full-width[_ngcontent-%COMP%] {\n  flex: 1;\n  width: 100%;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: 2rem;\n}\n.connection-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}\n.connection-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.connection-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  color: #667eea;\n}\n.connection-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0;\n  color: #666;\n  font-size: 0.9rem;\n}\n.bind-dn[_ngcontent-%COMP%] {\n  font-family: monospace;\n  background: #f5f5f5;\n  padding: 0.25rem;\n  border-radius: 4px;\n}\n.connection-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.no-connections[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  color: #666;\n}\n.no-connections[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  width: 3rem;\n  height: 3rem;\n  margin-bottom: 1rem;\n}\n.status-card[_ngcontent-%COMP%] {\n  border-left: 4px solid #ccc;\n}\n.status-card.success[_ngcontent-%COMP%] {\n  border-left-color: #4caf50;\n  background: #f1f8e9;\n}\n.status-card.error[_ngcontent-%COMP%] {\n  border-left-color: #f44336;\n  background: #ffebee;\n}\n.status-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n}\n.status-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  width: 2rem;\n  height: 2rem;\n}\n.status-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n}\n.status-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n}\n.details[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 1rem;\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 4px;\n  font-family: monospace;\n  font-size: 0.9rem;\n}\n@media (max-width: 768px) {\n  .connection-container[_ngcontent-%COMP%] {\n    margin: 1rem;\n    padding: 0.5rem;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .connection-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 1rem;\n  }\n  .connection-actions[_ngcontent-%COMP%] {\n    align-self: flex-end;\n  }\n}\n/*# sourceMappingURL=connection.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConnectionComponent, [{
    type: Component,
    args: [{ selector: "app-connection", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatCheckboxModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatListModule,
      MatDividerModule,
      MatTabsModule
    ], template: `
    <div class="connection-container">
      <mat-card class="connection-card">
        <mat-card-header>
          <mat-card-title>LDAP Connection Configuration</mat-card-title>
          <mat-card-subtitle>Configure and test your LDAP connection</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <mat-tab-group>
            <!-- Connection Form Tab -->
            <mat-tab label="Connection">
              <div class="tab-content">
                <form [formGroup]="connectionForm" (ngSubmit)="testConnection()">
                  <div class="form-row">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Server Host</mat-label>
                      <input matInput formControlName="host" placeholder="ldap.company.com">
                      <mat-error *ngIf="connectionForm.get('host')?.invalid && connectionForm.get('host')?.touched">
                        Host is required
                      </mat-error>
                    </mat-form-field>
                  </div>

                  <div class="form-row">
                    <mat-form-field appearance="outline">
                      <mat-label>Port</mat-label>
                      <input matInput type="number" formControlName="port" placeholder="389">
                    </mat-form-field>

                    <mat-checkbox formControlName="useSSL">
                      Use SSL/TLS
                    </mat-checkbox>
                  </div>

                  <div class="form-row">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Bind DN</mat-label>
                      <input matInput formControlName="bindDn" placeholder="cn=admin,dc=company,dc=com">
                    </mat-form-field>
                  </div>

                  <div class="form-row">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Password</mat-label>
                      <input matInput type="password" formControlName="password">
                    </mat-form-field>
                  </div>

                  <div class="form-row">
                    <mat-checkbox formControlName="saveConnection">
                      Save this connection
                    </mat-checkbox>
                  </div>

                  <div class="form-row" *ngIf="connectionForm.get('saveConnection')?.value">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Connection Name</mat-label>
                      <input matInput formControlName="connectionName" placeholder="My LDAP Server">
                    </mat-form-field>
                  </div>

                  <div class="actions">
                    <button mat-raised-button color="primary" type="submit" 
                            [disabled]="connectionForm.invalid || testing">
                      <mat-icon *ngIf="testing">hourglass_empty</mat-icon>
                      <mat-icon *ngIf="!testing">wifi</mat-icon>
                      {{ testing ? 'Testing...' : 'Test Connection' }}
                    </button>
                  </div>
                </form>
              </div>
            </mat-tab>

            <!-- Saved Connections Tab -->
            <mat-tab label="Saved Connections" [disabled]="savedConnections.length === 0">
              <div class="tab-content">
                <mat-list *ngIf="savedConnections.length > 0">
                  <mat-list-item *ngFor="let conn of savedConnections; let i = index">
                    <div class="connection-item">
                      <div class="connection-info">
                        <h4>{{ conn.name || conn.host }}</h4>
                        <p>{{ conn.host }}:{{ conn.port }} ({{ conn.useSSL ? 'SSL' : 'Plain' }})</p>
                        <p class="bind-dn">{{ conn.bindDn }}</p>
                      </div>
                      <div class="connection-actions">
                        <button mat-icon-button (click)="loadConnection(conn)" 
                                matTooltip="Load Connection">
                          <mat-icon>launch</mat-icon>
                        </button>
                        <button mat-icon-button (click)="deleteConnection(i)" 
                                matTooltip="Delete Connection" color="warn">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                    <mat-divider *ngIf="i < savedConnections.length - 1"></mat-divider>
                  </mat-list-item>
                </mat-list>
                
                <div *ngIf="savedConnections.length === 0" class="no-connections">
                  <mat-icon>storage</mat-icon>
                  <p>No saved connections found</p>
                </div>
              </div>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>

      <!-- Connection Status -->
      <mat-card *ngIf="connectionStatus" class="status-card" 
                [ngClass]="{'success': connectionStatus.success, 'error': !connectionStatus.success}">
        <mat-card-content>
          <div class="status-content">
            <mat-icon>{{ connectionStatus.success ? 'check_circle' : 'error' }}</mat-icon>
            <div>
              <h3>{{ connectionStatus.success ? 'Connection Successful' : 'Connection Failed' }}</h3>
              <p>{{ connectionStatus.message }}</p>
              <div *ngIf="connectionStatus.details" class="details">
                <strong>Server Info:</strong> {{ connectionStatus.details }}
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `, styles: ["/* angular:styles/component:scss;ed8c6d9c380caadfd438df1c61fe8b0f656e4c92f7edc7e131d17e8f435fa86e;/home/jheer/Documents/git/Angular/ldaptoolUI/src/app/components/connection/connection.component.ts */\n.connection-container {\n  max-width: 800px;\n  margin: 2rem auto;\n  padding: 1rem;\n}\n.connection-card {\n  margin-bottom: 1rem;\n}\n.tab-content {\n  padding: 1rem 0;\n}\n.form-row {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  align-items: center;\n}\n.full-width {\n  flex: 1;\n  width: 100%;\n}\n.actions {\n  display: flex;\n  justify-content: center;\n  margin-top: 2rem;\n}\n.connection-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n}\n.connection-info {\n  flex: 1;\n}\n.connection-info h4 {\n  margin: 0 0 0.5rem 0;\n  color: #667eea;\n}\n.connection-info p {\n  margin: 0.25rem 0;\n  color: #666;\n  font-size: 0.9rem;\n}\n.bind-dn {\n  font-family: monospace;\n  background: #f5f5f5;\n  padding: 0.25rem;\n  border-radius: 4px;\n}\n.connection-actions {\n  display: flex;\n  gap: 0.5rem;\n}\n.no-connections {\n  text-align: center;\n  padding: 2rem;\n  color: #666;\n}\n.no-connections mat-icon {\n  font-size: 3rem;\n  width: 3rem;\n  height: 3rem;\n  margin-bottom: 1rem;\n}\n.status-card {\n  border-left: 4px solid #ccc;\n}\n.status-card.success {\n  border-left-color: #4caf50;\n  background: #f1f8e9;\n}\n.status-card.error {\n  border-left-color: #f44336;\n  background: #ffebee;\n}\n.status-content {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n}\n.status-content mat-icon {\n  font-size: 2rem;\n  width: 2rem;\n  height: 2rem;\n}\n.status-content h3 {\n  margin: 0 0 0.5rem 0;\n}\n.status-content p {\n  margin: 0;\n  color: #666;\n}\n.details {\n  margin-top: 1rem;\n  padding: 1rem;\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 4px;\n  font-family: monospace;\n  font-size: 0.9rem;\n}\n@media (max-width: 768px) {\n  .connection-container {\n    margin: 1rem;\n    padding: 0.5rem;\n  }\n  .form-row {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .connection-item {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 1rem;\n  }\n  .connection-actions {\n    align-self: flex-end;\n  }\n}\n/*# sourceMappingURL=connection.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: LdapService }, { type: LocalStorageService }, { type: NotificationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConnectionComponent, { className: "ConnectionComponent", filePath: "src/app/components/connection/connection.component.ts", lineNumber: 315 });
})();
export {
  ConnectionComponent
};
//# sourceMappingURL=chunk-5X3LPMVV.js.map
