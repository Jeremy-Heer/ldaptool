import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  provideRouter
} from "./chunk-5Q4CO5ZT.js";
import {
  DomRendererFactory2,
  MatButtonModule,
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle,
  MatCommonModule,
  MatIcon,
  MatIconModule,
  MatTabLink,
  MatTabNav,
  MatTabsModule,
  Platform,
  bootstrapApplication,
  provideHttpClient,
  withInterceptorsFromDi
} from "./chunk-6CP7BVDO.js";
import {
  CommonModule
} from "./chunk-D5ITJBUD.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionScheduler,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DOCUMENT,
  Directive,
  ElementRef,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  RendererFactory2,
  RuntimeError,
  ViewEncapsulation,
  inject,
  makeEnvironmentProviders,
  performanceMarkFeature,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinvalidFactory,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵtext
} from "./chunk-LZEVO7MZ.js";

// node_modules/@angular/platform-browser/fesm2022/animations/async.mjs
var ANIMATION_PREFIX = "@";
var AsyncAnimationRendererFactory = class _AsyncAnimationRendererFactory {
  doc;
  delegate;
  zone;
  animationType;
  moduleImpl;
  _rendererFactoryPromise = null;
  scheduler = null;
  injector = inject(Injector);
  loadingSchedulerFn = inject(\u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN, {
    optional: true
  });
  _engine;
  /**
   *
   * @param moduleImpl allows to provide a mock implmentation (or will load the animation module)
   */
  constructor(doc, delegate, zone, animationType, moduleImpl) {
    this.doc = doc;
    this.delegate = delegate;
    this.zone = zone;
    this.animationType = animationType;
    this.moduleImpl = moduleImpl;
  }
  /** @docs-private */
  ngOnDestroy() {
    this._engine?.flush();
  }
  /**
   * @internal
   */
  loadImpl() {
    const loadFn = () => this.moduleImpl ?? import("./chunk-5MPJQJ3Q.js").then((m) => m);
    let moduleImplPromise;
    if (this.loadingSchedulerFn) {
      moduleImplPromise = this.loadingSchedulerFn(loadFn);
    } else {
      moduleImplPromise = loadFn();
    }
    return moduleImplPromise.catch((e) => {
      throw new RuntimeError(5300, (typeof ngDevMode === "undefined" || ngDevMode) && "Async loading for animations package was enabled, but loading failed. Angular falls back to using regular rendering. No animations will be displayed and their styles won't be applied.");
    }).then(({
      \u0275createEngine,
      \u0275AnimationRendererFactory
    }) => {
      this._engine = \u0275createEngine(this.animationType, this.doc);
      const rendererFactory = new \u0275AnimationRendererFactory(this.delegate, this._engine, this.zone);
      this.delegate = rendererFactory;
      return rendererFactory;
    });
  }
  /**
   * This method is delegating the renderer creation to the factories.
   * It uses default factory while the animation factory isn't loaded
   * and will rely on the animation factory once it is loaded.
   *
   * Calling this method will trigger as side effect the loading of the animation module
   * if the renderered component uses animations.
   */
  createRenderer(hostElement, rendererType) {
    const renderer = this.delegate.createRenderer(hostElement, rendererType);
    if (renderer.\u0275type === 0) {
      return renderer;
    }
    if (typeof renderer.throwOnSyntheticProps === "boolean") {
      renderer.throwOnSyntheticProps = false;
    }
    const dynamicRenderer = new DynamicDelegationRenderer(renderer);
    if (rendererType?.data?.["animation"] && !this._rendererFactoryPromise) {
      this._rendererFactoryPromise = this.loadImpl();
    }
    this._rendererFactoryPromise?.then((animationRendererFactory) => {
      const animationRenderer = animationRendererFactory.createRenderer(hostElement, rendererType);
      dynamicRenderer.use(animationRenderer);
      this.scheduler ??= this.injector.get(ChangeDetectionScheduler, null, {
        optional: true
      });
      this.scheduler?.notify(
        10
        /* NotificationSource.AsyncAnimationsLoaded */
      );
    }).catch((e) => {
      dynamicRenderer.use(renderer);
    });
    return dynamicRenderer;
  }
  begin() {
    this.delegate.begin?.();
  }
  end() {
    this.delegate.end?.();
  }
  whenRenderingDone() {
    return this.delegate.whenRenderingDone?.() ?? Promise.resolve();
  }
  /**
   * Used during HMR to clear any cached data about a component.
   * @param componentId ID of the component that is being replaced.
   */
  componentReplaced(componentId) {
    this._engine?.flush();
    this.delegate.componentReplaced?.(componentId);
  }
  static \u0275fac = function AsyncAnimationRendererFactory_Factory(__ngFactoryType__) {
    \u0275\u0275invalidFactory();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AsyncAnimationRendererFactory,
    factory: _AsyncAnimationRendererFactory.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AsyncAnimationRendererFactory, [{
    type: Injectable
  }], () => [{
    type: Document
  }, {
    type: RendererFactory2
  }, {
    type: NgZone
  }, {
    type: void 0
  }, {
    type: Promise
  }], null);
})();
var DynamicDelegationRenderer = class {
  delegate;
  // List of callbacks that need to be replayed on the animation renderer once its loaded
  replay = [];
  \u0275type = 1;
  constructor(delegate) {
    this.delegate = delegate;
  }
  use(impl) {
    this.delegate = impl;
    if (this.replay !== null) {
      for (const fn of this.replay) {
        fn(impl);
      }
      this.replay = null;
    }
  }
  get data() {
    return this.delegate.data;
  }
  destroy() {
    this.replay = null;
    this.delegate.destroy();
  }
  createElement(name, namespace) {
    return this.delegate.createElement(name, namespace);
  }
  createComment(value) {
    return this.delegate.createComment(value);
  }
  createText(value) {
    return this.delegate.createText(value);
  }
  get destroyNode() {
    return this.delegate.destroyNode;
  }
  appendChild(parent, newChild) {
    this.delegate.appendChild(parent, newChild);
  }
  insertBefore(parent, newChild, refChild, isMove) {
    this.delegate.insertBefore(parent, newChild, refChild, isMove);
  }
  removeChild(parent, oldChild, isHostElement) {
    this.delegate.removeChild(parent, oldChild, isHostElement);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node) {
    return this.delegate.parentNode(node);
  }
  nextSibling(node) {
    return this.delegate.nextSibling(node);
  }
  setAttribute(el, name, value, namespace) {
    this.delegate.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el, name, namespace) {
    this.delegate.removeAttribute(el, name, namespace);
  }
  addClass(el, name) {
    this.delegate.addClass(el, name);
  }
  removeClass(el, name) {
    this.delegate.removeClass(el, name);
  }
  setStyle(el, style, value, flags) {
    this.delegate.setStyle(el, style, value, flags);
  }
  removeStyle(el, style, flags) {
    this.delegate.removeStyle(el, style, flags);
  }
  setProperty(el, name, value) {
    if (this.shouldReplay(name)) {
      this.replay.push((renderer) => renderer.setProperty(el, name, value));
    }
    this.delegate.setProperty(el, name, value);
  }
  setValue(node, value) {
    this.delegate.setValue(node, value);
  }
  listen(target, eventName, callback, options) {
    if (this.shouldReplay(eventName)) {
      this.replay.push((renderer) => renderer.listen(target, eventName, callback, options));
    }
    return this.delegate.listen(target, eventName, callback, options);
  }
  shouldReplay(propOrEventName) {
    return this.replay !== null && propOrEventName.startsWith(ANIMATION_PREFIX);
  }
};
var \u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN = new InjectionToken(ngDevMode ? "async_animation_loading_scheduler_fn" : "");
function provideAnimationsAsync(type = "animations") {
  performanceMarkFeature("NgAsyncAnimations");
  if (false) {
    type = "noop";
  }
  return makeEnvironmentProviders([{
    provide: RendererFactory2,
    useFactory: (doc, renderer, zone) => {
      return new AsyncAnimationRendererFactory(doc, renderer, zone, type);
    },
    deps: [DOCUMENT, DomRendererFactory2, NgZone]
  }, {
    provide: ANIMATION_MODULE_TYPE,
    useValue: type === "noop" ? "NoopAnimations" : "BrowserAnimations"
  }]);
}

// src/app/app.routes.ts
var routes = [
  { path: "", redirectTo: "/connection", pathMatch: "full" },
  {
    path: "connection",
    loadComponent: () => import("./chunk-5X3LPMVV.js").then((m) => m.ConnectionComponent)
  },
  {
    path: "search",
    loadComponent: () => import("./chunk-5GVXL3VN.js").then((m) => m.SearchComponent)
  },
  {
    path: "browse",
    loadComponent: () => import("./chunk-CO2OYVJY.js").then((m) => m.BrowseComponent)
  },
  {
    path: "modify",
    loadComponent: () => import("./chunk-6KB22UFU.js").then((m) => m.ModifyComponent)
  },
  { path: "**", redirectTo: "/connection" }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync()
  ]
};

// node_modules/@angular/material/fesm2022/toolbar.mjs
var _c0 = ["*", [["mat-toolbar-row"]]];
var _c1 = ["*", "mat-toolbar-row"];
var MatToolbarRow = class _MatToolbarRow {
  static \u0275fac = function MatToolbarRow_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbarRow)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatToolbarRow,
    selectors: [["mat-toolbar-row"]],
    hostAttrs: [1, "mat-toolbar-row"],
    exportAs: ["matToolbarRow"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarRow, [{
    type: Directive,
    args: [{
      selector: "mat-toolbar-row",
      exportAs: "matToolbarRow",
      host: {
        "class": "mat-toolbar-row"
      }
    }]
  }], null, null);
})();
var MatToolbar = class _MatToolbar {
  _elementRef = inject(ElementRef);
  _platform = inject(Platform);
  _document = inject(DOCUMENT);
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /**
   * Theme color of the toolbar. This API is supported in M2 themes only, it has
   * no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/toolbar/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  color;
  /** Reference to all toolbar row elements that have been projected. */
  _toolbarRows;
  constructor() {
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._checkToolbarMixedModes();
      this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
    }
  }
  /**
   * Throws an exception when developers are attempting to combine the different toolbar row modes.
   */
  _checkToolbarMixedModes() {
    if (this._toolbarRows.length && (typeof ngDevMode === "undefined" || ngDevMode)) {
      const isCombinedUsage = Array.from(this._elementRef.nativeElement.childNodes).filter((node) => !(node.classList && node.classList.contains("mat-toolbar-row"))).filter((node) => node.nodeType !== (this._document ? this._document.COMMENT_NODE : 8)).some((node) => !!(node.textContent && node.textContent.trim()));
      if (isCombinedUsage) {
        throwToolbarMixedModesError();
      }
    }
  }
  static \u0275fac = function MatToolbar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatToolbar,
    selectors: [["mat-toolbar"]],
    contentQueries: function MatToolbar_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatToolbarRow, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._toolbarRows = _t);
      }
    },
    hostAttrs: [1, "mat-toolbar"],
    hostVars: 6,
    hostBindings: function MatToolbar_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
        \u0275\u0275classProp("mat-toolbar-multiple-rows", ctx._toolbarRows.length > 0)("mat-toolbar-single-row", ctx._toolbarRows.length === 0);
      }
    },
    inputs: {
      color: "color"
    },
    exportAs: ["matToolbar"],
    ngContentSelectors: _c1,
    decls: 2,
    vars: 0,
    template: function MatToolbar_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c0);
        \u0275\u0275projection(0);
        \u0275\u0275projection(1, 1);
      }
    },
    styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color, var(--mat-sys-surface));color:var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));font-size:var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));line-height:var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));font-weight:var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));letter-spacing:var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));margin:0}@media(forced-colors: active){.mat-toolbar{outline:solid 1px}}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));--mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height, 56px)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height, 56px)}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbar, [{
    type: Component,
    args: [{
      selector: "mat-toolbar",
      exportAs: "matToolbar",
      host: {
        "class": "mat-toolbar",
        "[class]": 'color ? "mat-" + color : ""',
        "[class.mat-toolbar-multiple-rows]": "_toolbarRows.length > 0",
        "[class.mat-toolbar-single-row]": "_toolbarRows.length === 0"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: '<ng-content></ng-content>\n<ng-content select="mat-toolbar-row"></ng-content>\n',
      styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color, var(--mat-sys-surface));color:var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));font-size:var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));line-height:var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));font-weight:var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));letter-spacing:var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));margin:0}@media(forced-colors: active){.mat-toolbar{outline:solid 1px}}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));--mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height, 56px)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height, 56px)}}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    _toolbarRows: [{
      type: ContentChildren,
      args: [MatToolbarRow, {
        descendants: true
      }]
    }]
  });
})();
function throwToolbarMixedModesError() {
  throw Error("MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.");
}
var MatToolbarModule = class _MatToolbarModule {
  static \u0275fac = function MatToolbarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatToolbarModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatToolbarModule,
    imports: [MatCommonModule, MatToolbar, MatToolbarRow],
    exports: [MatToolbar, MatToolbarRow, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatToolbar, MatToolbarRow],
      exports: [MatToolbar, MatToolbarRow, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/app.ts
var App = class _App {
  title = "LDAP Tool UI";
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 37, vars: 4, consts: [["connectionTab", "routerLinkActive"], ["searchTab", "routerLinkActive"], ["browseTab", "routerLinkActive"], ["modifyTab", "routerLinkActive"], [1, "app-container"], [1, "app-toolbar"], [1, "toolbar-icon"], [1, "toolbar-title"], [1, "main-content"], [1, "main-card"], [1, "card-header"], ["mat-tab-nav-bar", "", 1, "navigation-tabs"], ["mat-tab-link", "", "routerLink", "/connection", "routerLinkActive", "active-tab", 3, "active"], ["mat-tab-link", "", "routerLink", "/search", "routerLinkActive", "active-tab", 3, "active"], ["mat-tab-link", "", "routerLink", "/browse", "routerLinkActive", "active-tab", 3, "active"], ["mat-tab-link", "", "routerLink", "/modify", "routerLinkActive", "active-tab", 3, "active"], [1, "tab-content"]], template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 4)(1, "mat-toolbar", 5)(2, "mat-icon", 6);
      \u0275\u0275text(3, "dns");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 7);
      \u0275\u0275text(5, "LDAP Directory Tool");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 8)(7, "mat-card", 9)(8, "mat-card-header", 10)(9, "mat-card-title");
      \u0275\u0275text(10, "LDAP Management Console");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "mat-card-subtitle");
      \u0275\u0275text(12, "Connect, Search, Browse, and Modify LDAP Directory Entries");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "mat-card-content")(14, "nav", 11)(15, "a", 12, 0)(17, "mat-icon");
      \u0275\u0275text(18, "settings_ethernet");
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " Connection ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "a", 13, 1)(22, "mat-icon");
      \u0275\u0275text(23, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275text(24, " Search ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "a", 14, 2)(27, "mat-icon");
      \u0275\u0275text(28, "folder_open");
      \u0275\u0275elementEnd();
      \u0275\u0275text(29, " Browse ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "a", 15, 3)(32, "mat-icon");
      \u0275\u0275text(33, "edit");
      \u0275\u0275elementEnd();
      \u0275\u0275text(34, " Modify ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 16);
      \u0275\u0275element(36, "router-outlet");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      const connectionTab_r1 = \u0275\u0275reference(16);
      const searchTab_r2 = \u0275\u0275reference(21);
      const browseTab_r3 = \u0275\u0275reference(26);
      const modifyTab_r4 = \u0275\u0275reference(31);
      \u0275\u0275advance(15);
      \u0275\u0275property("active", connectionTab_r1.isActive);
      \u0275\u0275advance(5);
      \u0275\u0275property("active", searchTab_r2.isActive);
      \u0275\u0275advance(5);
      \u0275\u0275property("active", browseTab_r3.isActive);
      \u0275\u0275advance(5);
      \u0275\u0275property("active", modifyTab_r4.isActive);
    }
  }, dependencies: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatToolbar,
    MatTabsModule,
    MatTabNav,
    MatTabLink,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
  ], styles: ["\n\n.app-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 1rem;\n}\n.app-toolbar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4facfe 0%,\n      #00f2fe 100%);\n  color: white;\n  border-radius: 15px 15px 0 0;\n  margin-bottom: 0;\n}\n.toolbar-icon[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.toolbar-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 500;\n}\n.main-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  min-height: calc(100vh - 100px);\n}\n.main-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 1200px;\n  border-radius: 15px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  background: rgba(255, 255, 255, 0.95);\n  margin-top: 0;\n}\n.card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4facfe 0%,\n      #00f2fe 100%);\n  color: white;\n  border-radius: 15px 15px 0 0;\n  padding: 1.5rem;\n  margin: -24px -24px 24px -24px;\n  text-align: center;\n}\n.navigation-tabs[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n  background: transparent;\n}\n.navigation-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  margin: 0 0.5rem;\n  min-width: 120px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.navigation-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:not(.active-tab) {\n  background: rgba(102, 126, 234, 0.1);\n  color: #667eea;\n}\n.navigation-tabs[_ngcontent-%COMP%]   a.active-tab[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.navigation-tabs[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 1rem 0;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 768px) {\n  .app-container[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n  }\n  .navigation-tabs[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    min-width: 80px;\n    font-size: 0.8rem;\n    margin: 0 0.25rem;\n  }\n  .toolbar-title[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n}\n/*# sourceMappingURL=app.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", imports: [
      CommonModule,
      RouterOutlet,
      RouterLink,
      RouterLinkActive,
      MatToolbarModule,
      MatTabsModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule
    ], template: `
    <div class="app-container">
      <mat-toolbar class="app-toolbar">
        <mat-icon class="toolbar-icon">dns</mat-icon>
        <span class="toolbar-title">LDAP Directory Tool</span>
      </mat-toolbar>

      <div class="main-content">
        <mat-card class="main-card">
          <mat-card-header class="card-header">
            <mat-card-title>LDAP Management Console</mat-card-title>
            <mat-card-subtitle>Connect, Search, Browse, and Modify LDAP Directory Entries</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <nav mat-tab-nav-bar class="navigation-tabs">
              <a mat-tab-link 
                 routerLink="/connection" 
                 routerLinkActive="active-tab"
                 #connectionTab="routerLinkActive"
                 [active]="connectionTab.isActive">
                <mat-icon>settings_ethernet</mat-icon>
                Connection
              </a>
              <a mat-tab-link 
                 routerLink="/search" 
                 routerLinkActive="active-tab"
                 #searchTab="routerLinkActive"
                 [active]="searchTab.isActive">
                <mat-icon>search</mat-icon>
                Search
              </a>
              <a mat-tab-link 
                 routerLink="/browse" 
                 routerLinkActive="active-tab"
                 #browseTab="routerLinkActive"
                 [active]="browseTab.isActive">
                <mat-icon>folder_open</mat-icon>
                Browse
              </a>
              <a mat-tab-link 
                 routerLink="/modify" 
                 routerLinkActive="active-tab"
                 #modifyTab="routerLinkActive"
                 [active]="modifyTab.isActive">
                <mat-icon>edit</mat-icon>
                Modify
              </a>
            </nav>

            <div class="tab-content">
              <router-outlet></router-outlet>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;ea5bc9eb9d829aebab5416152f08851e89d67c395308dbcd0119c49edd781e2a;/home/jheer/Documents/git/Angular/ldaptoolUI/src/app/app.ts */\n.app-container {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 1rem;\n}\n.app-toolbar {\n  background:\n    linear-gradient(\n      135deg,\n      #4facfe 0%,\n      #00f2fe 100%);\n  color: white;\n  border-radius: 15px 15px 0 0;\n  margin-bottom: 0;\n}\n.toolbar-icon {\n  margin-right: 0.5rem;\n}\n.toolbar-title {\n  font-size: 1.5rem;\n  font-weight: 500;\n}\n.main-content {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  min-height: calc(100vh - 100px);\n}\n.main-card {\n  width: 100%;\n  max-width: 1200px;\n  border-radius: 15px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  background: rgba(255, 255, 255, 0.95);\n  margin-top: 0;\n}\n.card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #4facfe 0%,\n      #00f2fe 100%);\n  color: white;\n  border-radius: 15px 15px 0 0;\n  padding: 1.5rem;\n  margin: -24px -24px 24px -24px;\n  text-align: center;\n}\n.navigation-tabs {\n  margin-bottom: 2rem;\n  background: transparent;\n}\n.navigation-tabs a {\n  margin: 0 0.5rem;\n  min-width: 120px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.navigation-tabs a:not(.active-tab) {\n  background: rgba(102, 126, 234, 0.1);\n  color: #667eea;\n}\n.navigation-tabs a.active-tab {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.navigation-tabs mat-icon {\n  margin-right: 0.5rem;\n}\n.tab-content {\n  padding: 1rem 0;\n  animation: fadeIn 0.3s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (max-width: 768px) {\n  .app-container {\n    padding: 0.5rem;\n  }\n  .navigation-tabs a {\n    min-width: 80px;\n    font-size: 0.8rem;\n    margin: 0 0.25rem;\n  }\n  .toolbar-title {\n    font-size: 1.2rem;\n  }\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 183 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
/*! Bundled license information:

@angular/platform-browser/fesm2022/animations/async.mjs:
  (**
   * @license Angular v20.1.0
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=main.js.map
