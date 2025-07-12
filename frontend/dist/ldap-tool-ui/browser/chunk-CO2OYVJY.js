import {
  MatDividerModule,
  MatList,
  MatListItem,
  MatListModule
} from "./chunk-T5KQRVS2.js";
import {
  MatChip,
  MatChipListbox,
  MatChipsModule,
  MatExpansionModule,
  MatTooltip,
  MatTooltipModule
} from "./chunk-UETBFNEQ.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-5Q4CO5ZT.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlDirective,
  LdapService,
  LocalStorageService,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatProgressSpinner,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSuffix,
  NgControlStatus,
  NotificationService,
  ReactiveFormsModule,
  SelectionModel
} from "./chunk-XJQLNSD6.js";
import {
  DataSource,
  Directionality,
  MatButton,
  MatButtonModule,
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle,
  MatCommonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  MatTab,
  MatTabGroup,
  MatTabsModule,
  TREE_KEY_MANAGER,
  coerceObservable,
  isDataSource
} from "./chunk-6CP7BVDO.js";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-D5ITJBUD.js";
import {
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  EMPTY,
  ElementRef,
  EventEmitter,
  HostAttributeToken,
  InjectionToken,
  Input,
  IterableDiffers,
  NgModule,
  Output,
  Subject,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  __async,
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  combineLatest,
  concat,
  concatMap,
  distinctUntilChanged,
  inject,
  isObservable,
  map,
  merge,
  numberAttribute,
  of,
  reduce,
  setClassMetadata,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-LZEVO7MZ.js";

// node_modules/@angular/cdk/fesm2022/tree.mjs
var BaseTreeControl = class {
  /** Saved data node for `expandAll` action. */
  dataNodes;
  /** A selection model with multi-selection to track expansion status. */
  expansionModel = new SelectionModel(true);
  /**
   * Returns the identifier by which a dataNode should be tracked, should its
   * reference change.
   *
   * Similar to trackBy for *ngFor
   */
  trackBy;
  /** Get depth of a given data node, return the level number. This is for flat tree node. */
  getLevel;
  /**
   * Whether the data node is expandable. Returns true if expandable.
   * This is for flat tree node.
   */
  isExpandable;
  /** Gets a stream that emits whenever the given data node's children change. */
  getChildren;
  /** Toggles one single data node's expanded/collapsed state. */
  toggle(dataNode) {
    this.expansionModel.toggle(this._trackByValue(dataNode));
  }
  /** Expands one single data node. */
  expand(dataNode) {
    this.expansionModel.select(this._trackByValue(dataNode));
  }
  /** Collapses one single data node. */
  collapse(dataNode) {
    this.expansionModel.deselect(this._trackByValue(dataNode));
  }
  /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
  isExpanded(dataNode) {
    return this.expansionModel.isSelected(this._trackByValue(dataNode));
  }
  /** Toggles a subtree rooted at `node` recursively. */
  toggleDescendants(dataNode) {
    this.expansionModel.isSelected(this._trackByValue(dataNode)) ? this.collapseDescendants(dataNode) : this.expandDescendants(dataNode);
  }
  /** Collapse all dataNodes in the tree. */
  collapseAll() {
    this.expansionModel.clear();
  }
  /** Expands a subtree rooted at given data node recursively. */
  expandDescendants(dataNode) {
    let toBeProcessed = [dataNode];
    toBeProcessed.push(...this.getDescendants(dataNode));
    this.expansionModel.select(...toBeProcessed.map((value) => this._trackByValue(value)));
  }
  /** Collapses a subtree rooted at given data node recursively. */
  collapseDescendants(dataNode) {
    let toBeProcessed = [dataNode];
    toBeProcessed.push(...this.getDescendants(dataNode));
    this.expansionModel.deselect(...toBeProcessed.map((value) => this._trackByValue(value)));
  }
  _trackByValue(value) {
    return this.trackBy ? this.trackBy(value) : value;
  }
};
var FlatTreeControl = class extends BaseTreeControl {
  getLevel;
  isExpandable;
  options;
  /** Construct with flat tree data node functions getLevel and isExpandable. */
  constructor(getLevel, isExpandable, options) {
    super();
    this.getLevel = getLevel;
    this.isExpandable = isExpandable;
    this.options = options;
    if (this.options) {
      this.trackBy = this.options.trackBy;
    }
  }
  /**
   * Gets a list of the data node's subtree of descendent data nodes.
   *
   * To make this working, the `dataNodes` of the TreeControl must be flattened tree nodes
   * with correct levels.
   */
  getDescendants(dataNode) {
    const startIndex = this.dataNodes.indexOf(dataNode);
    const results = [];
    for (let i = startIndex + 1; i < this.dataNodes.length && this.getLevel(dataNode) < this.getLevel(this.dataNodes[i]); i++) {
      results.push(this.dataNodes[i]);
    }
    return results;
  }
  /**
   * Expands all data nodes in the tree.
   *
   * To make this working, the `dataNodes` variable of the TreeControl must be set to all flattened
   * data nodes of the tree.
   */
  expandAll() {
    this.expansionModel.select(...this.dataNodes.map((node) => this._trackByValue(node)));
  }
};
var CDK_TREE_NODE_OUTLET_NODE = new InjectionToken("CDK_TREE_NODE_OUTLET_NODE");
var CdkTreeNodeOutlet = class _CdkTreeNodeOutlet {
  viewContainer = inject(ViewContainerRef);
  _node = inject(CDK_TREE_NODE_OUTLET_NODE, {
    optional: true
  });
  constructor() {
  }
  static \u0275fac = function CdkTreeNodeOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeNodeOutlet)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTreeNodeOutlet,
    selectors: [["", "cdkTreeNodeOutlet", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeNodeOutlet, [{
    type: Directive,
    args: [{
      selector: "[cdkTreeNodeOutlet]"
    }]
  }], () => [], null);
})();
var CdkTreeNodeOutletContext = class {
  /** Data for the node. */
  $implicit;
  /** Depth of the node. */
  level;
  /** Index location of the node. */
  index;
  /** Length of the number of total dataNodes. */
  count;
  constructor(data) {
    this.$implicit = data;
  }
};
var CdkTreeNodeDef = class _CdkTreeNodeDef {
  /** @docs-private */
  template = inject(TemplateRef);
  /**
   * Function that should return true if this node template should be used for the provided node
   * data and index. If left undefined, this node will be considered the default node template to
   * use when no other when functions return true for the data.
   * For every node, there must be at least one when function that passes or an undefined to
   * default.
   */
  when;
  constructor() {
  }
  static \u0275fac = function CdkTreeNodeDef_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeNodeDef)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTreeNodeDef,
    selectors: [["", "cdkTreeNodeDef", ""]],
    inputs: {
      when: [0, "cdkTreeNodeDefWhen", "when"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeNodeDef, [{
    type: Directive,
    args: [{
      selector: "[cdkTreeNodeDef]",
      inputs: [{
        name: "when",
        alias: "cdkTreeNodeDefWhen"
      }]
    }]
  }], () => [], null);
})();
function getTreeNoValidDataSourceError() {
  return Error(`A valid data source must be provided.`);
}
function getTreeMultipleDefaultNodeDefsError() {
  return Error(`There can only be one default row without a when predicate function.`);
}
function getTreeMissingMatchingNodeDefError() {
  return Error(`Could not find a matching node definition for the provided node data.`);
}
function getTreeControlMissingError() {
  return Error(`Could not find a tree control, levelAccessor, or childrenAccessor for the tree.`);
}
function getMultipleTreeControlsError() {
  return Error(`More than one of tree control, levelAccessor, or childrenAccessor were provided.`);
}
var CdkTree = class _CdkTree {
  _differs = inject(IterableDiffers);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _dir = inject(Directionality);
  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject();
  /** Differ used to find the changes in the data provided by the data source. */
  _dataDiffer;
  /** Stores the node definition that does not have a when predicate. */
  _defaultNodeDef;
  /** Data subscription */
  _dataSubscription;
  /** Level of nodes */
  _levels = /* @__PURE__ */ new Map();
  /** The immediate parents for a node. This is `null` if there is no parent. */
  _parents = /* @__PURE__ */ new Map();
  /**
   * Nodes grouped into each set, which is a list of nodes displayed together in the DOM.
   *
   * Lookup key is the parent of a set. Root nodes have key of null.
   *
   * Values is a 'set' of tree nodes. Each tree node maps to a treeitem element. Sets are in the
   * order that it is rendered. Each set maps directly to aria-posinset and aria-setsize attributes.
   */
  _ariaSets = /* @__PURE__ */ new Map();
  /**
   * Provides a stream containing the latest data array to render. Influenced by the tree's
   * stream of view window (what dataNodes are currently on screen).
   * Data source can be an observable of data array, or a data array to render.
   */
  get dataSource() {
    return this._dataSource;
  }
  set dataSource(dataSource) {
    if (this._dataSource !== dataSource) {
      this._switchDataSource(dataSource);
    }
  }
  _dataSource;
  /**
   * The tree controller
   *
   * @deprecated Use one of `levelAccessor` or `childrenAccessor` instead. To be removed in a
   * future version.
   * @breaking-change 21.0.0
   */
  treeControl;
  /**
   * Given a data node, determines what tree level the node is at.
   *
   * One of levelAccessor or childrenAccessor must be specified, not both.
   * This is enforced at run-time.
   */
  levelAccessor;
  /**
   * Given a data node, determines what the children of that node are.
   *
   * One of levelAccessor or childrenAccessor must be specified, not both.
   * This is enforced at run-time.
   */
  childrenAccessor;
  /**
   * Tracking function that will be used to check the differences in data changes. Used similarly
   * to `ngFor` `trackBy` function. Optimize node operations by identifying a node based on its data
   * relative to the function to know if a node should be added/removed/moved.
   * Accepts a function that takes two parameters, `index` and `item`.
   */
  trackBy;
  /**
   * Given a data node, determines the key by which we determine whether or not this node is expanded.
   */
  expansionKey;
  // Outlets within the tree's template where the dataNodes will be inserted.
  _nodeOutlet;
  /** The tree node template for the tree */
  _nodeDefs;
  // TODO(tinayuangao): Setup a listener for scrolling, emit the calculated view to viewChange.
  //     Remove the MAX_VALUE in viewChange
  /**
   * Stream containing the latest information on what rows are being displayed on screen.
   * Can be used by the data source to as a heuristic of what data should be provided.
   */
  viewChange = new BehaviorSubject({
    start: 0,
    end: Number.MAX_VALUE
  });
  /** Keep track of which nodes are expanded. */
  _expansionModel;
  /**
   * Maintain a synchronous cache of flattened data nodes. This will only be
   * populated after initial render, and in certain cases, will be delayed due to
   * relying on Observable `getChildren` calls.
   */
  _flattenedNodes = new BehaviorSubject([]);
  /** The automatically determined node type for the tree. */
  _nodeType = new BehaviorSubject(null);
  /** The mapping between data and the node that is rendered. */
  _nodes = new BehaviorSubject(/* @__PURE__ */ new Map());
  /**
   * Synchronous cache of nodes for the `TreeKeyManager`. This is separate
   * from `_flattenedNodes` so they can be independently updated at different
   * times.
   */
  _keyManagerNodes = new BehaviorSubject([]);
  _keyManagerFactory = inject(TREE_KEY_MANAGER);
  /** The key manager for this tree. Handles focus and activation based on user keyboard input. */
  _keyManager;
  _viewInit = false;
  constructor() {
  }
  ngAfterContentInit() {
    this._initializeKeyManager();
  }
  ngAfterContentChecked() {
    this._updateDefaultNodeDefinition();
    this._subscribeToDataChanges();
  }
  ngOnDestroy() {
    this._nodeOutlet.viewContainer.clear();
    this.viewChange.complete();
    this._onDestroy.next();
    this._onDestroy.complete();
    if (this._dataSource && typeof this._dataSource.disconnect === "function") {
      this.dataSource.disconnect(this);
    }
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
    this._keyManager?.destroy();
  }
  ngOnInit() {
    this._checkTreeControlUsage();
    this._initializeDataDiffer();
  }
  ngAfterViewInit() {
    this._viewInit = true;
  }
  _updateDefaultNodeDefinition() {
    const defaultNodeDefs = this._nodeDefs.filter((def) => !def.when);
    if (defaultNodeDefs.length > 1 && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getTreeMultipleDefaultNodeDefsError();
    }
    this._defaultNodeDef = defaultNodeDefs[0];
  }
  /**
   * Sets the node type for the tree, if it hasn't been set yet.
   *
   * This will be called by the first node that's rendered in order for the tree
   * to determine what data transformations are required.
   */
  _setNodeTypeIfUnset(newType) {
    const currentType = this._nodeType.value;
    if (currentType === null) {
      this._nodeType.next(newType);
    } else if ((typeof ngDevMode === "undefined" || ngDevMode) && currentType !== newType) {
      console.warn(`Tree is using conflicting node types which can cause unexpected behavior. Please use tree nodes of the same type (e.g. only flat or only nested). Current node type: "${currentType}", new node type "${newType}".`);
    }
  }
  /**
   * Switch to the provided data source by resetting the data and unsubscribing from the current
   * render change subscription if one exists. If the data source is null, interpret this by
   * clearing the node outlet. Otherwise start listening for new data.
   */
  _switchDataSource(dataSource) {
    if (this._dataSource && typeof this._dataSource.disconnect === "function") {
      this.dataSource.disconnect(this);
    }
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
    if (!dataSource) {
      this._nodeOutlet.viewContainer.clear();
    }
    this._dataSource = dataSource;
    if (this._nodeDefs) {
      this._subscribeToDataChanges();
    }
  }
  _getExpansionModel() {
    if (!this.treeControl) {
      this._expansionModel ??= new SelectionModel(true);
      return this._expansionModel;
    }
    return this.treeControl.expansionModel;
  }
  /** Set up a subscription for the data provided by the data source. */
  _subscribeToDataChanges() {
    if (this._dataSubscription) {
      return;
    }
    let dataStream;
    if (isDataSource(this._dataSource)) {
      dataStream = this._dataSource.connect(this);
    } else if (isObservable(this._dataSource)) {
      dataStream = this._dataSource;
    } else if (Array.isArray(this._dataSource)) {
      dataStream = of(this._dataSource);
    }
    if (!dataStream) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        throw getTreeNoValidDataSourceError();
      }
      return;
    }
    this._dataSubscription = this._getRenderData(dataStream).pipe(takeUntil(this._onDestroy)).subscribe((renderingData) => {
      this._renderDataChanges(renderingData);
    });
  }
  /** Given an Observable containing a stream of the raw data, returns an Observable containing the RenderingData */
  _getRenderData(dataStream) {
    const expansionModel = this._getExpansionModel();
    return combineLatest([
      dataStream,
      this._nodeType,
      // We don't use the expansion data directly, however we add it here to essentially
      // trigger data rendering when expansion changes occur.
      expansionModel.changed.pipe(startWith(null), tap((expansionChanges) => {
        this._emitExpansionChanges(expansionChanges);
      }))
    ]).pipe(switchMap(([data, nodeType]) => {
      if (nodeType === null) {
        return of({
          renderNodes: data,
          flattenedNodes: null,
          nodeType
        });
      }
      return this._computeRenderingData(data, nodeType).pipe(map((convertedData) => __spreadProps(__spreadValues({}, convertedData), {
        nodeType
      })));
    }));
  }
  _renderDataChanges(data) {
    if (data.nodeType === null) {
      this.renderNodeChanges(data.renderNodes);
      return;
    }
    this._updateCachedData(data.flattenedNodes);
    this.renderNodeChanges(data.renderNodes);
    this._updateKeyManagerItems(data.flattenedNodes);
  }
  _emitExpansionChanges(expansionChanges) {
    if (!expansionChanges) {
      return;
    }
    const nodes = this._nodes.value;
    for (const added of expansionChanges.added) {
      const node = nodes.get(added);
      node?._emitExpansionState(true);
    }
    for (const removed of expansionChanges.removed) {
      const node = nodes.get(removed);
      node?._emitExpansionState(false);
    }
  }
  _initializeKeyManager() {
    const items = combineLatest([this._keyManagerNodes, this._nodes]).pipe(map(([keyManagerNodes, renderNodes]) => keyManagerNodes.reduce((items2, data) => {
      const node = renderNodes.get(this._getExpansionKey(data));
      if (node) {
        items2.push(node);
      }
      return items2;
    }, [])));
    const keyManagerOptions = {
      trackBy: (node) => this._getExpansionKey(node.data),
      skipPredicate: (node) => !!node.isDisabled,
      typeAheadDebounceInterval: true,
      horizontalOrientation: this._dir.value
    };
    this._keyManager = this._keyManagerFactory(items, keyManagerOptions);
  }
  _initializeDataDiffer() {
    const trackBy = this.trackBy ?? ((_index, item) => this._getExpansionKey(item));
    this._dataDiffer = this._differs.find([]).create(trackBy);
  }
  _checkTreeControlUsage() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      let numTreeControls = 0;
      if (this.treeControl) {
        numTreeControls++;
      }
      if (this.levelAccessor) {
        numTreeControls++;
      }
      if (this.childrenAccessor) {
        numTreeControls++;
      }
      if (!numTreeControls) {
        throw getTreeControlMissingError();
      } else if (numTreeControls > 1) {
        throw getMultipleTreeControlsError();
      }
    }
  }
  /** Check for changes made in the data and render each change (node added/removed/moved). */
  renderNodeChanges(data, dataDiffer = this._dataDiffer, viewContainer = this._nodeOutlet.viewContainer, parentData) {
    const changes = dataDiffer.diff(data);
    if (!changes && !this._viewInit) {
      return;
    }
    changes?.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
      if (item.previousIndex == null) {
        this.insertNode(data[currentIndex], currentIndex, viewContainer, parentData);
      } else if (currentIndex == null) {
        viewContainer.remove(adjustedPreviousIndex);
      } else {
        const view = viewContainer.get(adjustedPreviousIndex);
        viewContainer.move(view, currentIndex);
      }
    });
    changes?.forEachIdentityChange((record) => {
      const newData = record.item;
      if (record.currentIndex != void 0) {
        const view = viewContainer.get(record.currentIndex);
        view.context.$implicit = newData;
      }
    });
    if (parentData) {
      this._changeDetectorRef.markForCheck();
    } else {
      this._changeDetectorRef.detectChanges();
    }
  }
  /**
   * Finds the matching node definition that should be used for this node data. If there is only
   * one node definition, it is returned. Otherwise, find the node definition that has a when
   * predicate that returns true with the data. If none return true, return the default node
   * definition.
   */
  _getNodeDef(data, i) {
    if (this._nodeDefs.length === 1) {
      return this._nodeDefs.first;
    }
    const nodeDef = this._nodeDefs.find((def) => def.when && def.when(i, data)) || this._defaultNodeDef;
    if (!nodeDef && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getTreeMissingMatchingNodeDefError();
    }
    return nodeDef;
  }
  /**
   * Create the embedded view for the data node template and place it in the correct index location
   * within the data node view container.
   */
  insertNode(nodeData, index, viewContainer, parentData) {
    const levelAccessor = this._getLevelAccessor();
    const node = this._getNodeDef(nodeData, index);
    const key = this._getExpansionKey(nodeData);
    const context = new CdkTreeNodeOutletContext(nodeData);
    parentData ??= this._parents.get(key) ?? void 0;
    if (levelAccessor) {
      context.level = levelAccessor(nodeData);
    } else if (parentData !== void 0 && this._levels.has(this._getExpansionKey(parentData))) {
      context.level = this._levels.get(this._getExpansionKey(parentData)) + 1;
    } else {
      context.level = 0;
    }
    this._levels.set(key, context.level);
    const container = viewContainer ? viewContainer : this._nodeOutlet.viewContainer;
    container.createEmbeddedView(node.template, context, index);
    if (CdkTreeNode.mostRecentTreeNode) {
      CdkTreeNode.mostRecentTreeNode.data = nodeData;
    }
  }
  /** Whether the data node is expanded or collapsed. Returns true if it's expanded. */
  isExpanded(dataNode) {
    return !!(this.treeControl?.isExpanded(dataNode) || this._expansionModel?.isSelected(this._getExpansionKey(dataNode)));
  }
  /** If the data node is currently expanded, collapse it. Otherwise, expand it. */
  toggle(dataNode) {
    if (this.treeControl) {
      this.treeControl.toggle(dataNode);
    } else if (this._expansionModel) {
      this._expansionModel.toggle(this._getExpansionKey(dataNode));
    }
  }
  /** Expand the data node. If it is already expanded, does nothing. */
  expand(dataNode) {
    if (this.treeControl) {
      this.treeControl.expand(dataNode);
    } else if (this._expansionModel) {
      this._expansionModel.select(this._getExpansionKey(dataNode));
    }
  }
  /** Collapse the data node. If it is already collapsed, does nothing. */
  collapse(dataNode) {
    if (this.treeControl) {
      this.treeControl.collapse(dataNode);
    } else if (this._expansionModel) {
      this._expansionModel.deselect(this._getExpansionKey(dataNode));
    }
  }
  /**
   * If the data node is currently expanded, collapse it and all its descendants.
   * Otherwise, expand it and all its descendants.
   */
  toggleDescendants(dataNode) {
    if (this.treeControl) {
      this.treeControl.toggleDescendants(dataNode);
    } else if (this._expansionModel) {
      if (this.isExpanded(dataNode)) {
        this.collapseDescendants(dataNode);
      } else {
        this.expandDescendants(dataNode);
      }
    }
  }
  /**
   * Expand the data node and all its descendants. If they are already expanded, does nothing.
   */
  expandDescendants(dataNode) {
    if (this.treeControl) {
      this.treeControl.expandDescendants(dataNode);
    } else if (this._expansionModel) {
      const expansionModel = this._expansionModel;
      expansionModel.select(this._getExpansionKey(dataNode));
      this._getDescendants(dataNode).pipe(take(1), takeUntil(this._onDestroy)).subscribe((children) => {
        expansionModel.select(...children.map((child) => this._getExpansionKey(child)));
      });
    }
  }
  /** Collapse the data node and all its descendants. If it is already collapsed, does nothing. */
  collapseDescendants(dataNode) {
    if (this.treeControl) {
      this.treeControl.collapseDescendants(dataNode);
    } else if (this._expansionModel) {
      const expansionModel = this._expansionModel;
      expansionModel.deselect(this._getExpansionKey(dataNode));
      this._getDescendants(dataNode).pipe(take(1), takeUntil(this._onDestroy)).subscribe((children) => {
        expansionModel.deselect(...children.map((child) => this._getExpansionKey(child)));
      });
    }
  }
  /** Expands all data nodes in the tree. */
  expandAll() {
    if (this.treeControl) {
      this.treeControl.expandAll();
    } else if (this._expansionModel) {
      this._forEachExpansionKey((keys) => this._expansionModel?.select(...keys));
    }
  }
  /** Collapse all data nodes in the tree. */
  collapseAll() {
    if (this.treeControl) {
      this.treeControl.collapseAll();
    } else if (this._expansionModel) {
      this._forEachExpansionKey((keys) => this._expansionModel?.deselect(...keys));
    }
  }
  /** Level accessor, used for compatibility between the old Tree and new Tree */
  _getLevelAccessor() {
    return this.treeControl?.getLevel?.bind(this.treeControl) ?? this.levelAccessor;
  }
  /** Children accessor, used for compatibility between the old Tree and new Tree */
  _getChildrenAccessor() {
    return this.treeControl?.getChildren?.bind(this.treeControl) ?? this.childrenAccessor;
  }
  /**
   * Gets the direct children of a node; used for compatibility between the old tree and the
   * new tree.
   */
  _getDirectChildren(dataNode) {
    const levelAccessor = this._getLevelAccessor();
    const expansionModel = this._expansionModel ?? this.treeControl?.expansionModel;
    if (!expansionModel) {
      return of([]);
    }
    const key = this._getExpansionKey(dataNode);
    const isExpanded = expansionModel.changed.pipe(switchMap((changes) => {
      if (changes.added.includes(key)) {
        return of(true);
      } else if (changes.removed.includes(key)) {
        return of(false);
      }
      return EMPTY;
    }), startWith(this.isExpanded(dataNode)));
    if (levelAccessor) {
      return combineLatest([isExpanded, this._flattenedNodes]).pipe(map(([expanded, flattenedNodes]) => {
        if (!expanded) {
          return [];
        }
        return this._findChildrenByLevel(levelAccessor, flattenedNodes, dataNode, 1);
      }));
    }
    const childrenAccessor = this._getChildrenAccessor();
    if (childrenAccessor) {
      return coerceObservable(childrenAccessor(dataNode) ?? []);
    }
    throw getTreeControlMissingError();
  }
  /**
   * Given the list of flattened nodes, the level accessor, and the level range within
   * which to consider children, finds the children for a given node.
   *
   * For example, for direct children, `levelDelta` would be 1. For all descendants,
   * `levelDelta` would be Infinity.
   */
  _findChildrenByLevel(levelAccessor, flattenedNodes, dataNode, levelDelta) {
    const key = this._getExpansionKey(dataNode);
    const startIndex = flattenedNodes.findIndex((node) => this._getExpansionKey(node) === key);
    const dataNodeLevel = levelAccessor(dataNode);
    const expectedLevel = dataNodeLevel + levelDelta;
    const results = [];
    for (let i = startIndex + 1; i < flattenedNodes.length; i++) {
      const currentLevel = levelAccessor(flattenedNodes[i]);
      if (currentLevel <= dataNodeLevel) {
        break;
      }
      if (currentLevel <= expectedLevel) {
        results.push(flattenedNodes[i]);
      }
    }
    return results;
  }
  /**
   * Adds the specified node component to the tree's internal registry.
   *
   * This primarily facilitates keyboard navigation.
   */
  _registerNode(node) {
    this._nodes.value.set(this._getExpansionKey(node.data), node);
    this._nodes.next(this._nodes.value);
  }
  /** Removes the specified node component from the tree's internal registry. */
  _unregisterNode(node) {
    this._nodes.value.delete(this._getExpansionKey(node.data));
    this._nodes.next(this._nodes.value);
  }
  /**
   * For the given node, determine the level where this node appears in the tree.
   *
   * This is intended to be used for `aria-level` but is 0-indexed.
   */
  _getLevel(node) {
    return this._levels.get(this._getExpansionKey(node));
  }
  /**
   * For the given node, determine the size of the parent's child set.
   *
   * This is intended to be used for `aria-setsize`.
   */
  _getSetSize(dataNode) {
    const set = this._getAriaSet(dataNode);
    return set.length;
  }
  /**
   * For the given node, determine the index (starting from 1) of the node in its parent's child set.
   *
   * This is intended to be used for `aria-posinset`.
   */
  _getPositionInSet(dataNode) {
    const set = this._getAriaSet(dataNode);
    const key = this._getExpansionKey(dataNode);
    return set.findIndex((node) => this._getExpansionKey(node) === key) + 1;
  }
  /** Given a CdkTreeNode, gets the node that renders that node's parent's data. */
  _getNodeParent(node) {
    const parent = this._parents.get(this._getExpansionKey(node.data));
    return parent && this._nodes.value.get(this._getExpansionKey(parent));
  }
  /** Given a CdkTreeNode, gets the nodes that renders that node's child data. */
  _getNodeChildren(node) {
    return this._getDirectChildren(node.data).pipe(map((children) => children.reduce((nodes, child) => {
      const value = this._nodes.value.get(this._getExpansionKey(child));
      if (value) {
        nodes.push(value);
      }
      return nodes;
    }, [])));
  }
  /** `keydown` event handler; this just passes the event to the `TreeKeyManager`. */
  _sendKeydownToKeyManager(event) {
    if (event.target === this._elementRef.nativeElement) {
      this._keyManager.onKeydown(event);
    } else {
      const nodes = this._nodes.getValue();
      for (const [, node] of nodes) {
        if (event.target === node._elementRef.nativeElement) {
          this._keyManager.onKeydown(event);
          break;
        }
      }
    }
  }
  /** Gets all nested descendants of a given node. */
  _getDescendants(dataNode) {
    if (this.treeControl) {
      return of(this.treeControl.getDescendants(dataNode));
    }
    if (this.levelAccessor) {
      const results = this._findChildrenByLevel(this.levelAccessor, this._flattenedNodes.value, dataNode, Infinity);
      return of(results);
    }
    if (this.childrenAccessor) {
      return this._getAllChildrenRecursively(dataNode).pipe(reduce((allChildren, nextChildren) => {
        allChildren.push(...nextChildren);
        return allChildren;
      }, []));
    }
    throw getTreeControlMissingError();
  }
  /**
   * Gets all children and sub-children of the provided node.
   *
   * This will emit multiple times, in the order that the children will appear
   * in the tree, and can be combined with a `reduce` operator.
   */
  _getAllChildrenRecursively(dataNode) {
    if (!this.childrenAccessor) {
      return of([]);
    }
    return coerceObservable(this.childrenAccessor(dataNode)).pipe(take(1), switchMap((children) => {
      for (const child of children) {
        this._parents.set(this._getExpansionKey(child), dataNode);
      }
      return of(...children).pipe(concatMap((child) => concat(of([child]), this._getAllChildrenRecursively(child))));
    }));
  }
  _getExpansionKey(dataNode) {
    return this.expansionKey?.(dataNode) ?? dataNode;
  }
  _getAriaSet(node) {
    const key = this._getExpansionKey(node);
    const parent = this._parents.get(key);
    const parentKey = parent ? this._getExpansionKey(parent) : null;
    const set = this._ariaSets.get(parentKey);
    return set ?? [node];
  }
  /**
   * Finds the parent for the given node. If this is a root node, this
   * returns null. If we're unable to determine the parent, for example,
   * if we don't have cached node data, this returns undefined.
   */
  _findParentForNode(node, index, cachedNodes) {
    if (!cachedNodes.length) {
      return null;
    }
    const currentLevel = this._levels.get(this._getExpansionKey(node)) ?? 0;
    for (let parentIndex = index - 1; parentIndex >= 0; parentIndex--) {
      const parentNode = cachedNodes[parentIndex];
      const parentLevel = this._levels.get(this._getExpansionKey(parentNode)) ?? 0;
      if (parentLevel < currentLevel) {
        return parentNode;
      }
    }
    return null;
  }
  /**
   * Given a set of root nodes and the current node level, flattens any nested
   * nodes into a single array.
   *
   * If any nodes are not expanded, then their children will not be added into the array.
   * This will still traverse all nested children in order to build up our internal data
   * models, but will not include them in the returned array.
   */
  _flattenNestedNodesWithExpansion(nodes, level = 0) {
    const childrenAccessor = this._getChildrenAccessor();
    if (!childrenAccessor) {
      return of([...nodes]);
    }
    return of(...nodes).pipe(concatMap((node) => {
      const parentKey = this._getExpansionKey(node);
      if (!this._parents.has(parentKey)) {
        this._parents.set(parentKey, null);
      }
      this._levels.set(parentKey, level);
      const children = coerceObservable(childrenAccessor(node));
      return concat(of([node]), children.pipe(take(1), tap((childNodes) => {
        this._ariaSets.set(parentKey, [...childNodes ?? []]);
        for (const child of childNodes ?? []) {
          const childKey = this._getExpansionKey(child);
          this._parents.set(childKey, node);
          this._levels.set(childKey, level + 1);
        }
      }), switchMap((childNodes) => {
        if (!childNodes) {
          return of([]);
        }
        return this._flattenNestedNodesWithExpansion(childNodes, level + 1).pipe(map((nestedNodes) => this.isExpanded(node) ? nestedNodes : []));
      })));
    }), reduce((results, children) => {
      results.push(...children);
      return results;
    }, []));
  }
  /**
   * Converts children for certain tree configurations.
   *
   * This also computes parent, level, and group data.
   */
  _computeRenderingData(nodes, nodeType) {
    if (this.childrenAccessor && nodeType === "flat") {
      this._clearPreviousCache();
      this._ariaSets.set(null, [...nodes]);
      return this._flattenNestedNodesWithExpansion(nodes).pipe(map((flattenedNodes) => ({
        renderNodes: flattenedNodes,
        flattenedNodes
      })));
    } else if (this.levelAccessor && nodeType === "nested") {
      const levelAccessor = this.levelAccessor;
      return of(nodes.filter((node) => levelAccessor(node) === 0)).pipe(map((rootNodes) => ({
        renderNodes: rootNodes,
        flattenedNodes: nodes
      })), tap(({
        flattenedNodes
      }) => {
        this._calculateParents(flattenedNodes);
      }));
    } else if (nodeType === "flat") {
      return of({
        renderNodes: nodes,
        flattenedNodes: nodes
      }).pipe(tap(({
        flattenedNodes
      }) => {
        this._calculateParents(flattenedNodes);
      }));
    } else {
      this._clearPreviousCache();
      this._ariaSets.set(null, [...nodes]);
      return this._flattenNestedNodesWithExpansion(nodes).pipe(map((flattenedNodes) => ({
        renderNodes: nodes,
        flattenedNodes
      })));
    }
  }
  _updateCachedData(flattenedNodes) {
    this._flattenedNodes.next(flattenedNodes);
  }
  _updateKeyManagerItems(flattenedNodes) {
    this._keyManagerNodes.next(flattenedNodes);
  }
  /** Traverse the flattened node data and compute parents, levels, and group data. */
  _calculateParents(flattenedNodes) {
    const levelAccessor = this._getLevelAccessor();
    if (!levelAccessor) {
      return;
    }
    this._clearPreviousCache();
    for (let index = 0; index < flattenedNodes.length; index++) {
      const dataNode = flattenedNodes[index];
      const key = this._getExpansionKey(dataNode);
      this._levels.set(key, levelAccessor(dataNode));
      const parent = this._findParentForNode(dataNode, index, flattenedNodes);
      this._parents.set(key, parent);
      const parentKey = parent ? this._getExpansionKey(parent) : null;
      const group = this._ariaSets.get(parentKey) ?? [];
      group.splice(index, 0, dataNode);
      this._ariaSets.set(parentKey, group);
    }
  }
  /** Invokes a callback with all node expansion keys. */
  _forEachExpansionKey(callback) {
    const toToggle = [];
    const observables = [];
    this._nodes.value.forEach((node) => {
      toToggle.push(this._getExpansionKey(node.data));
      observables.push(this._getDescendants(node.data));
    });
    if (observables.length > 0) {
      combineLatest(observables).pipe(take(1), takeUntil(this._onDestroy)).subscribe((results) => {
        results.forEach((inner) => inner.forEach((r) => toToggle.push(this._getExpansionKey(r))));
        callback(toToggle);
      });
    } else {
      callback(toToggle);
    }
  }
  /** Clears the maps we use to store parents, level & aria-sets in. */
  _clearPreviousCache() {
    this._parents.clear();
    this._levels.clear();
    this._ariaSets.clear();
  }
  static \u0275fac = function CdkTree_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTree)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _CdkTree,
    selectors: [["cdk-tree"]],
    contentQueries: function CdkTree_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, CdkTreeNodeDef, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._nodeDefs = _t);
      }
    },
    viewQuery: function CdkTree_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(CdkTreeNodeOutlet, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._nodeOutlet = _t.first);
      }
    },
    hostAttrs: ["role", "tree", 1, "cdk-tree"],
    hostBindings: function CdkTree_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("keydown", function CdkTree_keydown_HostBindingHandler($event) {
          return ctx._sendKeydownToKeyManager($event);
        });
      }
    },
    inputs: {
      dataSource: "dataSource",
      treeControl: "treeControl",
      levelAccessor: "levelAccessor",
      childrenAccessor: "childrenAccessor",
      trackBy: "trackBy",
      expansionKey: "expansionKey"
    },
    exportAs: ["cdkTree"],
    decls: 1,
    vars: 0,
    consts: [["cdkTreeNodeOutlet", ""]],
    template: function CdkTree_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0, 0);
      }
    },
    dependencies: [CdkTreeNodeOutlet],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTree, [{
    type: Component,
    args: [{
      selector: "cdk-tree",
      exportAs: "cdkTree",
      template: `<ng-container cdkTreeNodeOutlet></ng-container>`,
      host: {
        "class": "cdk-tree",
        "role": "tree",
        "(keydown)": "_sendKeydownToKeyManager($event)"
      },
      encapsulation: ViewEncapsulation.None,
      // The "OnPush" status for the `CdkTree` component is effectively a noop, so we are removing it.
      // The view for `CdkTree` consists entirely of templates declared in other views. As they are
      // declared elsewhere, they are checked when their declaration points are checked.
      // tslint:disable-next-line:validate-decorators
      changeDetection: ChangeDetectionStrategy.Default,
      imports: [CdkTreeNodeOutlet]
    }]
  }], () => [], {
    dataSource: [{
      type: Input
    }],
    treeControl: [{
      type: Input
    }],
    levelAccessor: [{
      type: Input
    }],
    childrenAccessor: [{
      type: Input
    }],
    trackBy: [{
      type: Input
    }],
    expansionKey: [{
      type: Input
    }],
    _nodeOutlet: [{
      type: ViewChild,
      args: [CdkTreeNodeOutlet, {
        static: true
      }]
    }],
    _nodeDefs: [{
      type: ContentChildren,
      args: [CdkTreeNodeDef, {
        // We need to use `descendants: true`, because Ivy will no longer match
        // indirect descendants if it's left as false.
        descendants: true
      }]
    }]
  });
})();
var CdkTreeNode = class _CdkTreeNode {
  _elementRef = inject(ElementRef);
  _tree = inject(CdkTree);
  _tabindex = -1;
  _type = "flat";
  /**
   * The role of the tree node.
   *
   * @deprecated This will be ignored; the tree will automatically determine the appropriate role
   * for tree node. This input will be removed in a future version.
   * @breaking-change 21.0.0
   */
  get role() {
    return "treeitem";
  }
  set role(_role) {
  }
  /**
   * Whether or not this node is expandable.
   *
   * If not using `FlatTreeControl`, or if `isExpandable` is not provided to
   * `NestedTreeControl`, this should be provided for correct node a11y.
   */
  get isExpandable() {
    return this._isExpandable();
  }
  set isExpandable(isExpandable) {
    this._inputIsExpandable = isExpandable;
    if (this.data && !this._isExpandable || !this._inputIsExpandable) {
      return;
    }
    if (this._inputIsExpanded) {
      this.expand();
    } else if (this._inputIsExpanded === false) {
      this.collapse();
    }
  }
  get isExpanded() {
    return this._tree.isExpanded(this._data);
  }
  set isExpanded(isExpanded) {
    this._inputIsExpanded = isExpanded;
    if (isExpanded) {
      this.expand();
    } else {
      this.collapse();
    }
  }
  /**
   * Whether or not this node is disabled. If it's disabled, then the user won't be able to focus
   * or activate this node.
   */
  isDisabled;
  /**
   * The text used to locate this item during typeahead. If not specified, the `textContent` will
   * will be used.
   */
  typeaheadLabel;
  getLabel() {
    return this.typeaheadLabel || this._elementRef.nativeElement.textContent?.trim() || "";
  }
  /** This emits when the node has been programatically activated or activated by keyboard. */
  activation = new EventEmitter();
  /** This emits when the node's expansion status has been changed. */
  expandedChange = new EventEmitter();
  /**
   * The most recently created `CdkTreeNode`. We save it in static variable so we can retrieve it
   * in `CdkTree` and set the data to it.
   */
  static mostRecentTreeNode = null;
  /** Subject that emits when the component has been destroyed. */
  _destroyed = new Subject();
  /** Emits when the node's data has changed. */
  _dataChanges = new Subject();
  _inputIsExpandable = false;
  _inputIsExpanded = void 0;
  /**
   * Flag used to determine whether or not we should be focusing the actual element based on
   * some user interaction (click or focus). On click, we don't forcibly focus the element
   * since the click could trigger some other component that wants to grab its own focus
   * (e.g. menu, dialog).
   */
  _shouldFocus = true;
  _parentNodeAriaLevel;
  /** The tree node's data. */
  get data() {
    return this._data;
  }
  set data(value) {
    if (value !== this._data) {
      this._data = value;
      this._dataChanges.next();
    }
  }
  _data;
  /* If leaf node, return true to not assign aria-expanded attribute */
  get isLeafNode() {
    if (this._tree.treeControl?.isExpandable !== void 0 && !this._tree.treeControl.isExpandable(this._data)) {
      return true;
    } else if (this._tree.treeControl?.isExpandable === void 0 && this._tree.treeControl?.getDescendants(this._data).length === 0) {
      return true;
    }
    return false;
  }
  get level() {
    return this._tree._getLevel(this._data) ?? this._parentNodeAriaLevel;
  }
  /** Determines if the tree node is expandable. */
  _isExpandable() {
    if (this._tree.treeControl) {
      if (this.isLeafNode) {
        return false;
      }
      return true;
    }
    return this._inputIsExpandable;
  }
  /**
   * Determines the value for `aria-expanded`.
   *
   * For non-expandable nodes, this is `null`.
   */
  _getAriaExpanded() {
    if (!this._isExpandable()) {
      return null;
    }
    return String(this.isExpanded);
  }
  /**
   * Determines the size of this node's parent's child set.
   *
   * This is intended to be used for `aria-setsize`.
   */
  _getSetSize() {
    return this._tree._getSetSize(this._data);
  }
  /**
   * Determines the index (starting from 1) of this node in its parent's child set.
   *
   * This is intended to be used for `aria-posinset`.
   */
  _getPositionInSet() {
    return this._tree._getPositionInSet(this._data);
  }
  _changeDetectorRef = inject(ChangeDetectorRef);
  constructor() {
    _CdkTreeNode.mostRecentTreeNode = this;
  }
  ngOnInit() {
    this._parentNodeAriaLevel = getParentNodeAriaLevel(this._elementRef.nativeElement);
    this._tree._getExpansionModel().changed.pipe(map(() => this.isExpanded), distinctUntilChanged(), takeUntil(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck());
    this._tree._setNodeTypeIfUnset(this._type);
    this._tree._registerNode(this);
  }
  ngOnDestroy() {
    if (_CdkTreeNode.mostRecentTreeNode === this) {
      _CdkTreeNode.mostRecentTreeNode = null;
    }
    this._dataChanges.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }
  getParent() {
    return this._tree._getNodeParent(this) ?? null;
  }
  getChildren() {
    return this._tree._getNodeChildren(this);
  }
  /** Focuses this data node. Implemented for TreeKeyManagerItem. */
  focus() {
    this._tabindex = 0;
    if (this._shouldFocus) {
      this._elementRef.nativeElement.focus();
    }
    this._changeDetectorRef.markForCheck();
  }
  /** Defocus this data node. */
  unfocus() {
    this._tabindex = -1;
    this._changeDetectorRef.markForCheck();
  }
  /** Emits an activation event. Implemented for TreeKeyManagerItem. */
  activate() {
    if (this.isDisabled) {
      return;
    }
    this.activation.next(this._data);
  }
  /** Collapses this data node. Implemented for TreeKeyManagerItem. */
  collapse() {
    if (this.isExpandable) {
      this._tree.collapse(this._data);
    }
  }
  /** Expands this data node. Implemented for TreeKeyManagerItem. */
  expand() {
    if (this.isExpandable) {
      this._tree.expand(this._data);
    }
  }
  /** Makes the node focusable. Implemented for TreeKeyManagerItem. */
  makeFocusable() {
    this._tabindex = 0;
    this._changeDetectorRef.markForCheck();
  }
  _focusItem() {
    if (this.isDisabled) {
      return;
    }
    this._tree._keyManager.focusItem(this);
  }
  _setActiveItem() {
    if (this.isDisabled) {
      return;
    }
    this._shouldFocus = false;
    this._tree._keyManager.focusItem(this);
    this._shouldFocus = true;
  }
  _emitExpansionState(expanded) {
    this.expandedChange.emit(expanded);
  }
  static \u0275fac = function CdkTreeNode_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeNode)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTreeNode,
    selectors: [["cdk-tree-node"]],
    hostAttrs: ["role", "treeitem", 1, "cdk-tree-node"],
    hostVars: 5,
    hostBindings: function CdkTreeNode_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function CdkTreeNode_click_HostBindingHandler() {
          return ctx._setActiveItem();
        })("focus", function CdkTreeNode_focus_HostBindingHandler() {
          return ctx._focusItem();
        });
      }
      if (rf & 2) {
        \u0275\u0275domProperty("tabIndex", ctx._tabindex);
        \u0275\u0275attribute("aria-expanded", ctx._getAriaExpanded())("aria-level", ctx.level + 1)("aria-posinset", ctx._getPositionInSet())("aria-setsize", ctx._getSetSize());
      }
    },
    inputs: {
      role: "role",
      isExpandable: [2, "isExpandable", "isExpandable", booleanAttribute],
      isExpanded: "isExpanded",
      isDisabled: [2, "isDisabled", "isDisabled", booleanAttribute],
      typeaheadLabel: [0, "cdkTreeNodeTypeaheadLabel", "typeaheadLabel"]
    },
    outputs: {
      activation: "activation",
      expandedChange: "expandedChange"
    },
    exportAs: ["cdkTreeNode"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeNode, [{
    type: Directive,
    args: [{
      selector: "cdk-tree-node",
      exportAs: "cdkTreeNode",
      host: {
        "class": "cdk-tree-node",
        "[attr.aria-expanded]": "_getAriaExpanded()",
        "[attr.aria-level]": "level + 1",
        "[attr.aria-posinset]": "_getPositionInSet()",
        "[attr.aria-setsize]": "_getSetSize()",
        "[tabindex]": "_tabindex",
        "role": "treeitem",
        "(click)": "_setActiveItem()",
        "(focus)": "_focusItem()"
      }
    }]
  }], () => [], {
    role: [{
      type: Input
    }],
    isExpandable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isExpanded: [{
      type: Input
    }],
    isDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    typeaheadLabel: [{
      type: Input,
      args: ["cdkTreeNodeTypeaheadLabel"]
    }],
    activation: [{
      type: Output
    }],
    expandedChange: [{
      type: Output
    }]
  });
})();
function getParentNodeAriaLevel(nodeElement) {
  let parent = nodeElement.parentElement;
  while (parent && !isNodeElement(parent)) {
    parent = parent.parentElement;
  }
  if (!parent) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw Error("Incorrect tree structure containing detached node.");
    } else {
      return -1;
    }
  } else if (parent.classList.contains("cdk-nested-tree-node")) {
    return numberAttribute(parent.getAttribute("aria-level"));
  } else {
    return 0;
  }
}
function isNodeElement(element) {
  const classList = element.classList;
  return !!(classList?.contains("cdk-nested-tree-node") || classList?.contains("cdk-tree"));
}
var CdkNestedTreeNode = class _CdkNestedTreeNode extends CdkTreeNode {
  _type = "nested";
  _differs = inject(IterableDiffers);
  /** Differ used to find the changes in the data provided by the data source. */
  _dataDiffer;
  /** The children data dataNodes of current node. They will be placed in `CdkTreeNodeOutlet`. */
  _children;
  /** The children node placeholder. */
  nodeOutlet;
  constructor() {
    super();
  }
  ngAfterContentInit() {
    this._dataDiffer = this._differs.find([]).create(this._tree.trackBy);
    this._tree._getDirectChildren(this.data).pipe(takeUntil(this._destroyed)).subscribe((result) => this.updateChildrenNodes(result));
    this.nodeOutlet.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this.updateChildrenNodes());
  }
  ngOnDestroy() {
    this._clear();
    super.ngOnDestroy();
  }
  /** Add children dataNodes to the NodeOutlet */
  updateChildrenNodes(children) {
    const outlet = this._getNodeOutlet();
    if (children) {
      this._children = children;
    }
    if (outlet && this._children) {
      const viewContainer = outlet.viewContainer;
      this._tree.renderNodeChanges(this._children, this._dataDiffer, viewContainer, this._data);
    } else {
      this._dataDiffer.diff([]);
    }
  }
  /** Clear the children dataNodes. */
  _clear() {
    const outlet = this._getNodeOutlet();
    if (outlet) {
      outlet.viewContainer.clear();
      this._dataDiffer.diff([]);
    }
  }
  /** Gets the outlet for the current node. */
  _getNodeOutlet() {
    const outlets = this.nodeOutlet;
    return outlets && outlets.find((outlet) => !outlet._node || outlet._node === this);
  }
  static \u0275fac = function CdkNestedTreeNode_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkNestedTreeNode)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkNestedTreeNode,
    selectors: [["cdk-nested-tree-node"]],
    contentQueries: function CdkNestedTreeNode_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, CdkTreeNodeOutlet, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nodeOutlet = _t);
      }
    },
    hostAttrs: [1, "cdk-nested-tree-node"],
    exportAs: ["cdkNestedTreeNode"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNode,
      useExisting: _CdkNestedTreeNode
    }, {
      provide: CDK_TREE_NODE_OUTLET_NODE,
      useExisting: _CdkNestedTreeNode
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkNestedTreeNode, [{
    type: Directive,
    args: [{
      selector: "cdk-nested-tree-node",
      exportAs: "cdkNestedTreeNode",
      providers: [{
        provide: CdkTreeNode,
        useExisting: CdkNestedTreeNode
      }, {
        provide: CDK_TREE_NODE_OUTLET_NODE,
        useExisting: CdkNestedTreeNode
      }],
      host: {
        "class": "cdk-nested-tree-node"
      }
    }]
  }], () => [], {
    nodeOutlet: [{
      type: ContentChildren,
      args: [CdkTreeNodeOutlet, {
        // We need to use `descendants: true`, because Ivy will no longer match
        // indirect descendants if it's left as false.
        descendants: true
      }]
    }]
  });
})();
var cssUnitPattern = /([A-Za-z%]+)$/;
var CdkTreeNodePadding = class _CdkTreeNodePadding {
  _treeNode = inject(CdkTreeNode);
  _tree = inject(CdkTree);
  _element = inject(ElementRef);
  _dir = inject(Directionality, {
    optional: true
  });
  /** Current padding value applied to the element. Used to avoid unnecessarily hitting the DOM. */
  _currentPadding;
  /** Subject that emits when the component has been destroyed. */
  _destroyed = new Subject();
  /** CSS units used for the indentation value. */
  indentUnits = "px";
  /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
  get level() {
    return this._level;
  }
  set level(value) {
    this._setLevelInput(value);
  }
  _level;
  /**
   * The indent for each level. Can be a number or a CSS string.
   * Default number 40px from material design menu sub-menu spec.
   */
  get indent() {
    return this._indent;
  }
  set indent(indent) {
    this._setIndentInput(indent);
  }
  _indent = 40;
  constructor() {
    this._setPadding();
    this._dir?.change.pipe(takeUntil(this._destroyed)).subscribe(() => this._setPadding(true));
    this._treeNode._dataChanges.subscribe(() => this._setPadding());
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
  _paddingIndent() {
    const nodeLevel = (this._treeNode.data && this._tree._getLevel(this._treeNode.data)) ?? null;
    const level = this._level == null ? nodeLevel : this._level;
    return typeof level === "number" ? `${level * this._indent}${this.indentUnits}` : null;
  }
  _setPadding(forceChange = false) {
    const padding = this._paddingIndent();
    if (padding !== this._currentPadding || forceChange) {
      const element = this._element.nativeElement;
      const paddingProp = this._dir && this._dir.value === "rtl" ? "paddingRight" : "paddingLeft";
      const resetProp = paddingProp === "paddingLeft" ? "paddingRight" : "paddingLeft";
      element.style[paddingProp] = padding || "";
      element.style[resetProp] = "";
      this._currentPadding = padding;
    }
  }
  /**
   * This has been extracted to a util because of TS 4 and VE.
   * View Engine doesn't support property rename inheritance.
   * TS 4.0 doesn't allow properties to override accessors or vice-versa.
   * @docs-private
   */
  _setLevelInput(value) {
    this._level = isNaN(value) ? null : value;
    this._setPadding();
  }
  /**
   * This has been extracted to a util because of TS 4 and VE.
   * View Engine doesn't support property rename inheritance.
   * TS 4.0 doesn't allow properties to override accessors or vice-versa.
   * @docs-private
   */
  _setIndentInput(indent) {
    let value = indent;
    let units = "px";
    if (typeof indent === "string") {
      const parts = indent.split(cssUnitPattern);
      value = parts[0];
      units = parts[1] || units;
    }
    this.indentUnits = units;
    this._indent = numberAttribute(value);
    this._setPadding();
  }
  static \u0275fac = function CdkTreeNodePadding_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeNodePadding)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTreeNodePadding,
    selectors: [["", "cdkTreeNodePadding", ""]],
    inputs: {
      level: [2, "cdkTreeNodePadding", "level", numberAttribute],
      indent: [0, "cdkTreeNodePaddingIndent", "indent"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeNodePadding, [{
    type: Directive,
    args: [{
      selector: "[cdkTreeNodePadding]"
    }]
  }], () => [], {
    level: [{
      type: Input,
      args: [{
        alias: "cdkTreeNodePadding",
        transform: numberAttribute
      }]
    }],
    indent: [{
      type: Input,
      args: ["cdkTreeNodePaddingIndent"]
    }]
  });
})();
var CdkTreeNodeToggle = class _CdkTreeNodeToggle {
  _tree = inject(CdkTree);
  _treeNode = inject(CdkTreeNode);
  /** Whether expand/collapse the node recursively. */
  recursive = false;
  constructor() {
  }
  // Toggle the expanded or collapsed state of this node.
  //
  // Focus this node with expanding or collapsing it. This ensures that the active node will always
  // be visible when expanding and collapsing.
  _toggle() {
    this.recursive ? this._tree.toggleDescendants(this._treeNode.data) : this._tree.toggle(this._treeNode.data);
    this._tree._keyManager.focusItem(this._treeNode);
  }
  static \u0275fac = function CdkTreeNodeToggle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeNodeToggle)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTreeNodeToggle,
    selectors: [["", "cdkTreeNodeToggle", ""]],
    hostAttrs: ["tabindex", "-1"],
    hostBindings: function CdkTreeNodeToggle_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function CdkTreeNodeToggle_click_HostBindingHandler($event) {
          ctx._toggle();
          return $event.stopPropagation();
        })("keydown.Enter", function CdkTreeNodeToggle_keydown_Enter_HostBindingHandler($event) {
          ctx._toggle();
          return $event.preventDefault();
        })("keydown.Space", function CdkTreeNodeToggle_keydown_Space_HostBindingHandler($event) {
          ctx._toggle();
          return $event.preventDefault();
        });
      }
    },
    inputs: {
      recursive: [2, "cdkTreeNodeToggleRecursive", "recursive", booleanAttribute]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeNodeToggle, [{
    type: Directive,
    args: [{
      selector: "[cdkTreeNodeToggle]",
      host: {
        "(click)": "_toggle(); $event.stopPropagation();",
        "(keydown.Enter)": "_toggle(); $event.preventDefault();",
        "(keydown.Space)": "_toggle(); $event.preventDefault();",
        "tabindex": "-1"
      }
    }]
  }], () => [], {
    recursive: [{
      type: Input,
      args: [{
        alias: "cdkTreeNodeToggleRecursive",
        transform: booleanAttribute
      }]
    }]
  });
})();
var EXPORTED_DECLARATIONS = [CdkNestedTreeNode, CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNodeToggle, CdkTree, CdkTreeNode, CdkTreeNodeOutlet];
var CdkTreeModule = class _CdkTreeModule {
  static \u0275fac = function CdkTreeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTreeModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CdkTreeModule,
    imports: [CdkNestedTreeNode, CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNodeToggle, CdkTree, CdkTreeNode, CdkTreeNodeOutlet],
    exports: [CdkNestedTreeNode, CdkTreeNodeDef, CdkTreeNodePadding, CdkTreeNodeToggle, CdkTree, CdkTreeNode, CdkTreeNodeOutlet]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTreeModule, [{
    type: NgModule,
    args: [{
      imports: EXPORTED_DECLARATIONS,
      exports: EXPORTED_DECLARATIONS
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/tree.mjs
function isNoopTreeKeyManager(keyManager) {
  return !!keyManager._isNoopTreeKeyManager;
}
var MatTreeNode = class _MatTreeNode extends CdkTreeNode {
  /**
   * The tabindex of the tree node.
   *
   * @deprecated By default MatTreeNode manages focus using TreeKeyManager instead of tabIndex.
   *   Recommend to avoid setting tabIndex directly to prevent TreeKeyManager form getting into
   *   an unexpected state. Tabindex to be removed in a future version.
   * @breaking-change 21.0.0 Remove this attribute.
   */
  get tabIndexInputBinding() {
    return this._tabIndexInputBinding;
  }
  set tabIndexInputBinding(value) {
    this._tabIndexInputBinding = value;
  }
  _tabIndexInputBinding;
  /**
   * The default tabindex of the tree node.
   *
   * @deprecated By default MatTreeNode manages focus using TreeKeyManager instead of tabIndex.
   *   Recommend to avoid setting tabIndex directly to prevent TreeKeyManager form getting into
   *   an unexpected state. Tabindex to be removed in a future version.
   * @breaking-change 21.0.0 Remove this attribute.
   */
  defaultTabIndex = 0;
  _getTabindexAttribute() {
    if (isNoopTreeKeyManager(this._tree._keyManager)) {
      return this.tabIndexInputBinding;
    }
    return this._tabindex;
  }
  /**
   * Whether the component is disabled.
   *
   * @deprecated This is an alias for `isDisabled`.
   * @breaking-change 21.0.0 Remove this input
   */
  get disabled() {
    return this.isDisabled;
  }
  set disabled(value) {
    this.isDisabled = value;
  }
  constructor() {
    super();
    const tabIndex = inject(new HostAttributeToken("tabindex"), {
      optional: true
    });
    this.tabIndexInputBinding = Number(tabIndex) || this.defaultTabIndex;
  }
  // This is a workaround for https://github.com/angular/angular/issues/23091
  // In aot mode, the lifecycle hooks from parent class are not called.
  ngOnInit() {
    super.ngOnInit();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
  static \u0275fac = function MatTreeNode_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTreeNode)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTreeNode,
    selectors: [["mat-tree-node"]],
    hostAttrs: [1, "mat-tree-node"],
    hostVars: 5,
    hostBindings: function MatTreeNode_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function MatTreeNode_click_HostBindingHandler() {
          return ctx._focusItem();
        });
      }
      if (rf & 2) {
        \u0275\u0275domProperty("tabIndex", ctx._getTabindexAttribute());
        \u0275\u0275attribute("aria-expanded", ctx._getAriaExpanded())("aria-level", ctx.level + 1)("aria-posinset", ctx._getPositionInSet())("aria-setsize", ctx._getSetSize());
      }
    },
    inputs: {
      tabIndexInputBinding: [2, "tabIndex", "tabIndexInputBinding", (value) => value == null ? 0 : numberAttribute(value)],
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    outputs: {
      activation: "activation",
      expandedChange: "expandedChange"
    },
    exportAs: ["matTreeNode"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNode,
      useExisting: _MatTreeNode
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeNode, [{
    type: Directive,
    args: [{
      selector: "mat-tree-node",
      exportAs: "matTreeNode",
      outputs: ["activation", "expandedChange"],
      providers: [{
        provide: CdkTreeNode,
        useExisting: MatTreeNode
      }],
      host: {
        "class": "mat-tree-node",
        "[attr.aria-expanded]": "_getAriaExpanded()",
        "[attr.aria-level]": "level + 1",
        "[attr.aria-posinset]": "_getPositionInSet()",
        "[attr.aria-setsize]": "_getSetSize()",
        "(click)": "_focusItem()",
        "[tabindex]": "_getTabindexAttribute()"
      }
    }]
  }], () => [], {
    tabIndexInputBinding: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value),
        alias: "tabIndex"
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatTreeNodeDef = class _MatTreeNodeDef extends CdkTreeNodeDef {
  data;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatTreeNodeDef_BaseFactory;
    return function MatTreeNodeDef_Factory(__ngFactoryType__) {
      return (\u0275MatTreeNodeDef_BaseFactory || (\u0275MatTreeNodeDef_BaseFactory = \u0275\u0275getInheritedFactory(_MatTreeNodeDef)))(__ngFactoryType__ || _MatTreeNodeDef);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTreeNodeDef,
    selectors: [["", "matTreeNodeDef", ""]],
    inputs: {
      when: [0, "matTreeNodeDefWhen", "when"],
      data: [0, "matTreeNode", "data"]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNodeDef,
      useExisting: _MatTreeNodeDef
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeNodeDef, [{
    type: Directive,
    args: [{
      selector: "[matTreeNodeDef]",
      inputs: [{
        name: "when",
        alias: "matTreeNodeDefWhen"
      }],
      providers: [{
        provide: CdkTreeNodeDef,
        useExisting: MatTreeNodeDef
      }]
    }]
  }], null, {
    data: [{
      type: Input,
      args: ["matTreeNode"]
    }]
  });
})();
var MatNestedTreeNode = class _MatNestedTreeNode extends CdkNestedTreeNode {
  node;
  /**
   * Whether the node is disabled.
   *
   * @deprecated This is an alias for `isDisabled`.
   * @breaking-change 21.0.0 Remove this input
   */
  get disabled() {
    return this.isDisabled;
  }
  set disabled(value) {
    this.isDisabled = value;
  }
  /** Tabindex of the node. */
  get tabIndex() {
    return this.isDisabled ? -1 : this._tabIndex;
  }
  set tabIndex(value) {
    this._tabIndex = value;
  }
  _tabIndex;
  // This is a workaround for https://github.com/angular/angular/issues/19145
  // In aot mode, the lifecycle hooks from parent class are not called.
  // TODO(tinayuangao): Remove when the angular issue #19145 is fixed
  ngOnInit() {
    super.ngOnInit();
  }
  ngAfterContentInit() {
    super.ngAfterContentInit();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatNestedTreeNode_BaseFactory;
    return function MatNestedTreeNode_Factory(__ngFactoryType__) {
      return (\u0275MatNestedTreeNode_BaseFactory || (\u0275MatNestedTreeNode_BaseFactory = \u0275\u0275getInheritedFactory(_MatNestedTreeNode)))(__ngFactoryType__ || _MatNestedTreeNode);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatNestedTreeNode,
    selectors: [["mat-nested-tree-node"]],
    hostAttrs: [1, "mat-nested-tree-node"],
    inputs: {
      node: [0, "matNestedTreeNode", "node"],
      disabled: [2, "disabled", "disabled", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)]
    },
    outputs: {
      activation: "activation",
      expandedChange: "expandedChange"
    },
    exportAs: ["matNestedTreeNode"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkNestedTreeNode,
      useExisting: _MatNestedTreeNode
    }, {
      provide: CdkTreeNode,
      useExisting: _MatNestedTreeNode
    }, {
      provide: CDK_TREE_NODE_OUTLET_NODE,
      useExisting: _MatNestedTreeNode
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatNestedTreeNode, [{
    type: Directive,
    args: [{
      selector: "mat-nested-tree-node",
      exportAs: "matNestedTreeNode",
      outputs: ["activation", "expandedChange"],
      providers: [{
        provide: CdkNestedTreeNode,
        useExisting: MatNestedTreeNode
      }, {
        provide: CdkTreeNode,
        useExisting: MatNestedTreeNode
      }, {
        provide: CDK_TREE_NODE_OUTLET_NODE,
        useExisting: MatNestedTreeNode
      }],
      host: {
        "class": "mat-nested-tree-node"
      }
    }]
  }], null, {
    node: [{
      type: Input,
      args: ["matNestedTreeNode"]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }]
  });
})();
var MatTreeNodePadding = class _MatTreeNodePadding extends CdkTreeNodePadding {
  /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
  get level() {
    return this._level;
  }
  set level(value) {
    this._setLevelInput(value);
  }
  /** The indent for each level. Default number 40px from material design menu sub-menu spec. */
  get indent() {
    return this._indent;
  }
  set indent(indent) {
    this._setIndentInput(indent);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatTreeNodePadding_BaseFactory;
    return function MatTreeNodePadding_Factory(__ngFactoryType__) {
      return (\u0275MatTreeNodePadding_BaseFactory || (\u0275MatTreeNodePadding_BaseFactory = \u0275\u0275getInheritedFactory(_MatTreeNodePadding)))(__ngFactoryType__ || _MatTreeNodePadding);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTreeNodePadding,
    selectors: [["", "matTreeNodePadding", ""]],
    inputs: {
      level: [2, "matTreeNodePadding", "level", numberAttribute],
      indent: [0, "matTreeNodePaddingIndent", "indent"]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNodePadding,
      useExisting: _MatTreeNodePadding
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeNodePadding, [{
    type: Directive,
    args: [{
      selector: "[matTreeNodePadding]",
      providers: [{
        provide: CdkTreeNodePadding,
        useExisting: MatTreeNodePadding
      }]
    }]
  }], null, {
    level: [{
      type: Input,
      args: [{
        alias: "matTreeNodePadding",
        transform: numberAttribute
      }]
    }],
    indent: [{
      type: Input,
      args: ["matTreeNodePaddingIndent"]
    }]
  });
})();
var MatTreeNodeOutlet = class _MatTreeNodeOutlet {
  viewContainer = inject(ViewContainerRef);
  _node = inject(CDK_TREE_NODE_OUTLET_NODE, {
    optional: true
  });
  static \u0275fac = function MatTreeNodeOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTreeNodeOutlet)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTreeNodeOutlet,
    selectors: [["", "matTreeNodeOutlet", ""]],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNodeOutlet,
      useExisting: _MatTreeNodeOutlet
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeNodeOutlet, [{
    type: Directive,
    args: [{
      selector: "[matTreeNodeOutlet]",
      providers: [{
        provide: CdkTreeNodeOutlet,
        useExisting: MatTreeNodeOutlet
      }]
    }]
  }], null, null);
})();
var MatTree = class _MatTree extends CdkTree {
  // Outlets within the tree's template where the dataNodes will be inserted.
  // We need an initializer here to avoid a TS error. The value will be set in `ngAfterViewInit`.
  _nodeOutlet = void 0;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatTree_BaseFactory;
    return function MatTree_Factory(__ngFactoryType__) {
      return (\u0275MatTree_BaseFactory || (\u0275MatTree_BaseFactory = \u0275\u0275getInheritedFactory(_MatTree)))(__ngFactoryType__ || _MatTree);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatTree,
    selectors: [["mat-tree"]],
    viewQuery: function MatTree_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MatTreeNodeOutlet, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._nodeOutlet = _t.first);
      }
    },
    hostAttrs: [1, "mat-tree"],
    exportAs: ["matTree"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTree,
      useExisting: _MatTree
    }]), \u0275\u0275InheritDefinitionFeature],
    decls: 1,
    vars: 0,
    consts: [["matTreeNodeOutlet", ""]],
    template: function MatTree_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0, 0);
      }
    },
    dependencies: [MatTreeNodeOutlet],
    styles: [".mat-tree{display:block;background-color:var(--mat-tree-container-background-color, var(--mat-sys-surface))}.mat-tree-node,.mat-nested-tree-node{color:var(--mat-tree-node-text-color, var(--mat-sys-on-surface));font-family:var(--mat-tree-node-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-tree-node-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-tree-node-text-weight, var(--mat-sys-body-large-weight))}.mat-tree-node{display:flex;align-items:center;flex:1;word-wrap:break-word;min-height:var(--mat-tree-node-min-height, 48px)}.mat-nested-tree-node{border-bottom-width:0}\n"],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTree, [{
    type: Component,
    args: [{
      selector: "mat-tree",
      exportAs: "matTree",
      template: `<ng-container matTreeNodeOutlet></ng-container>`,
      host: {
        "class": "mat-tree"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.Default,
      providers: [{
        provide: CdkTree,
        useExisting: MatTree
      }],
      imports: [MatTreeNodeOutlet],
      styles: [".mat-tree{display:block;background-color:var(--mat-tree-container-background-color, var(--mat-sys-surface))}.mat-tree-node,.mat-nested-tree-node{color:var(--mat-tree-node-text-color, var(--mat-sys-on-surface));font-family:var(--mat-tree-node-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-tree-node-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-tree-node-text-weight, var(--mat-sys-body-large-weight))}.mat-tree-node{display:flex;align-items:center;flex:1;word-wrap:break-word;min-height:var(--mat-tree-node-min-height, 48px)}.mat-nested-tree-node{border-bottom-width:0}\n"]
    }]
  }], null, {
    _nodeOutlet: [{
      type: ViewChild,
      args: [MatTreeNodeOutlet, {
        static: true
      }]
    }]
  });
})();
var MatTreeNodeToggle = class _MatTreeNodeToggle extends CdkTreeNodeToggle {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatTreeNodeToggle_BaseFactory;
    return function MatTreeNodeToggle_Factory(__ngFactoryType__) {
      return (\u0275MatTreeNodeToggle_BaseFactory || (\u0275MatTreeNodeToggle_BaseFactory = \u0275\u0275getInheritedFactory(_MatTreeNodeToggle)))(__ngFactoryType__ || _MatTreeNodeToggle);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTreeNodeToggle,
    selectors: [["", "matTreeNodeToggle", ""]],
    inputs: {
      recursive: [0, "matTreeNodeToggleRecursive", "recursive"]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: CdkTreeNodeToggle,
      useExisting: _MatTreeNodeToggle
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeNodeToggle, [{
    type: Directive,
    args: [{
      selector: "[matTreeNodeToggle]",
      providers: [{
        provide: CdkTreeNodeToggle,
        useExisting: MatTreeNodeToggle
      }],
      inputs: [{
        name: "recursive",
        alias: "matTreeNodeToggleRecursive"
      }]
    }]
  }], null, null);
})();
var MAT_TREE_DIRECTIVES = [MatNestedTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle, MatTree, MatTreeNode, MatTreeNodeOutlet];
var MatTreeModule = class _MatTreeModule {
  static \u0275fac = function MatTreeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTreeModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatTreeModule,
    imports: [CdkTreeModule, MatCommonModule, MatNestedTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle, MatTree, MatTreeNode, MatTreeNodeOutlet],
    exports: [MatCommonModule, MatNestedTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle, MatTree, MatTreeNode, MatTreeNodeOutlet]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [CdkTreeModule, MatCommonModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTreeModule, [{
    type: NgModule,
    args: [{
      imports: [CdkTreeModule, MatCommonModule, ...MAT_TREE_DIRECTIVES],
      exports: [MatCommonModule, MAT_TREE_DIRECTIVES]
    }]
  }], null, null);
})();
var MatTreeFlattener = class {
  transformFunction;
  getLevel;
  isExpandable;
  getChildren;
  constructor(transformFunction, getLevel, isExpandable, getChildren) {
    this.transformFunction = transformFunction;
    this.getLevel = getLevel;
    this.isExpandable = isExpandable;
    this.getChildren = getChildren;
  }
  _flattenNode(node, level, resultNodes, parentMap) {
    const flatNode = this.transformFunction(node, level);
    resultNodes.push(flatNode);
    if (this.isExpandable(flatNode)) {
      const childrenNodes = this.getChildren(node);
      if (childrenNodes) {
        if (Array.isArray(childrenNodes)) {
          this._flattenChildren(childrenNodes, level, resultNodes, parentMap);
        } else {
          childrenNodes.pipe(take(1)).subscribe((children) => {
            this._flattenChildren(children, level, resultNodes, parentMap);
          });
        }
      }
    }
    return resultNodes;
  }
  _flattenChildren(children, level, resultNodes, parentMap) {
    children.forEach((child, index) => {
      let childParentMap = parentMap.slice();
      childParentMap.push(index != children.length - 1);
      this._flattenNode(child, level + 1, resultNodes, childParentMap);
    });
  }
  /**
   * Flatten a list of node type T to flattened version of node F.
   * Please note that type T may be nested, and the length of `structuredData` may be different
   * from that of returned list `F[]`.
   */
  flattenNodes(structuredData) {
    let resultNodes = [];
    structuredData.forEach((node) => this._flattenNode(node, 0, resultNodes, []));
    return resultNodes;
  }
  /**
   * Expand flattened node with current expansion status.
   * The returned list may have different length.
   */
  expandFlattenedNodes(nodes, treeControl) {
    let results = [];
    let currentExpand = [];
    currentExpand[0] = true;
    nodes.forEach((node) => {
      let expand = true;
      for (let i = 0; i <= this.getLevel(node); i++) {
        expand = expand && currentExpand[i];
      }
      if (expand) {
        results.push(node);
      }
      if (this.isExpandable(node)) {
        currentExpand[this.getLevel(node) + 1] = treeControl.isExpanded(node);
      }
    });
    return results;
  }
};
var MatTreeFlatDataSource = class extends DataSource {
  _treeControl;
  _treeFlattener;
  _flattenedData = new BehaviorSubject([]);
  _expandedData = new BehaviorSubject([]);
  get data() {
    return this._data.value;
  }
  set data(value) {
    this._data.next(value);
    this._flattenedData.next(this._treeFlattener.flattenNodes(this.data));
    this._treeControl.dataNodes = this._flattenedData.value;
  }
  _data = new BehaviorSubject([]);
  constructor(_treeControl, _treeFlattener, initialData) {
    super();
    this._treeControl = _treeControl;
    this._treeFlattener = _treeFlattener;
    if (initialData) {
      this.data = initialData;
    }
  }
  connect(collectionViewer) {
    return merge(collectionViewer.viewChange, this._treeControl.expansionModel.changed, this._flattenedData).pipe(map(() => {
      this._expandedData.next(this._treeFlattener.expandFlattenedNodes(this._flattenedData.value, this._treeControl));
      return this._expandedData.value;
    }));
  }
  disconnect() {
  }
};

// src/app/components/browse/browse.component.ts
function BrowseComponent_mat_card_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 3)(1, "mat-card-content")(2, "div", 4)(3, "mat-icon");
    \u0275\u0275text(4, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h3");
    \u0275\u0275text(7, "No LDAP Connection");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "Please configure an LDAP connection first to browse the directory.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 5);
    \u0275\u0275text(11, " Configure Connection ");
    \u0275\u0275elementEnd()()()()();
  }
}
function BrowseComponent_div_2_mat_icon_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "hourglass_empty");
    \u0275\u0275elementEnd();
  }
}
function BrowseComponent_div_2_mat_icon_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "explore");
    \u0275\u0275elementEnd();
  }
}
function BrowseComponent_div_2_div_20_mat_tree_node_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-tree-node", 23);
    \u0275\u0275element(1, "button", 24);
    \u0275\u0275elementStart(2, "div", 25);
    \u0275\u0275listener("click", function BrowseComponent_div_2_div_20_mat_tree_node_2_Template_div_click_2_listener() {
      const node_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectNode(node_r4));
    });
    \u0275\u0275elementStart(3, "mat-icon", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 27);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const node_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("padding-left", node_r4.level * 20, "px");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getNodeIconClass(node_r4));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getNodeIcon(node_r4), " ");
    \u0275\u0275advance();
    \u0275\u0275property("title", node_r4.dn);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(node_r4.name);
  }
}
function BrowseComponent_div_2_div_20_mat_tree_node_3_mat_icon_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r1.getNodeIconClass(node_r6));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getNodeIcon(node_r6), " ");
  }
}
function BrowseComponent_div_2_div_20_mat_tree_node_3_mat_progress_spinner_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-spinner", 32);
  }
}
function BrowseComponent_div_2_div_20_mat_tree_node_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-tree-node", 23)(1, "button", 28);
    \u0275\u0275listener("click", function BrowseComponent_div_2_div_20_mat_tree_node_3_Template_button_click_1_listener() {
      const node_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.loadChildren(node_r6));
    });
    \u0275\u0275elementStart(2, "mat-icon", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 25);
    \u0275\u0275listener("click", function BrowseComponent_div_2_div_20_mat_tree_node_3_Template_div_click_4_listener() {
      const node_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectNode(node_r6));
    });
    \u0275\u0275template(5, BrowseComponent_div_2_div_20_mat_tree_node_3_mat_icon_5_Template, 2, 3, "mat-icon", 30)(6, BrowseComponent_div_2_div_20_mat_tree_node_3_mat_progress_spinner_6_Template, 1, 0, "mat-progress-spinner", 31);
    \u0275\u0275elementStart(7, "span", 27);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const node_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("padding-left", node_r6.level * 20, "px");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Toggle " + node_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.treeControl.isExpanded(node_r6) ? "expand_more" : "chevron_right", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !node_r6.loading);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", node_r6.loading);
    \u0275\u0275advance();
    \u0275\u0275property("title", node_r6.dn);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(node_r6.name);
  }
}
function BrowseComponent_div_2_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "mat-tree", 20);
    \u0275\u0275template(2, BrowseComponent_div_2_div_20_mat_tree_node_2_Template, 7, 7, "mat-tree-node", 21)(3, BrowseComponent_div_2_div_20_mat_tree_node_3_Template, 9, 8, "mat-tree-node", 22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.dataSource)("treeControl", ctx_r1.treeControl);
    \u0275\u0275advance(2);
    \u0275\u0275property("matTreeNodeDefWhen", ctx_r1.hasChild);
  }
}
function BrowseComponent_div_2_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "mat-icon");
    \u0275\u0275text(2, "account_tree");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No directory structure loaded");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 34);
    \u0275\u0275text(6, 'Use "Discover Root DSE" or add a custom Base DN to start browsing');
    \u0275\u0275elementEnd()();
  }
}
function BrowseComponent_div_2_mat_card_subtitle_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card-subtitle");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.selectedEntry.dn);
  }
}
function BrowseComponent_div_2_mat_card_subtitle_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card-subtitle");
    \u0275\u0275text(1, "Select an entry to view details");
    \u0275\u0275elementEnd();
  }
}
function BrowseComponent_div_2_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "mat-icon");
    \u0275\u0275text(2, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Select an entry from the directory tree to view its attributes and details.");
    \u0275\u0275elementEnd()();
  }
}
function BrowseComponent_div_2_div_30_div_20_mat_chip_listbox_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip-listbox")(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const attr_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.getAttributeValues(ctx_r1.selectedEntry, attr_r8).length, " values");
  }
}
function BrowseComponent_div_2_div_30_div_20_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "span", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 57);
    \u0275\u0275listener("click", function BrowseComponent_div_2_div_30_div_20_div_6_Template_button_click_3_listener() {
      const value_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.copyValue(value_r10));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "content_copy");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const value_r10 = ctx.$implicit;
    const attr_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("binary", ctx_r1.isBinaryAttribute(attr_r8));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatAttributeValue(attr_r8, value_r10), " ");
  }
}
function BrowseComponent_div_2_div_30_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51)(1, "div", 52)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, BrowseComponent_div_2_div_30_div_20_mat_chip_listbox_4_Template, 3, 1, "mat-chip-listbox", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 53);
    \u0275\u0275template(6, BrowseComponent_div_2_div_30_div_20_div_6_Template, 6, 3, "div", 54);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const attr_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(attr_r8);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isMultiValue(ctx_r1.selectedEntry, attr_r8));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.getAttributeValues(ctx_r1.selectedEntry, attr_r8))("ngForTrackBy", ctx_r1.trackByIndex);
  }
}
function BrowseComponent_div_2_div_30_mat_chip_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const oc_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r1.getObjectClassType(oc_r11));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", oc_r11, " ");
  }
}
function BrowseComponent_div_2_div_30_mat_tab_25_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275element(1, "mat-progress-spinner", 63);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading children...");
    \u0275\u0275elementEnd()();
  }
}
function BrowseComponent_div_2_div_30_mat_tab_25_mat_list_3_mat_list_item_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-list-item", 65);
    \u0275\u0275listener("click", function BrowseComponent_div_2_div_30_mat_tab_25_mat_list_3_mat_list_item_1_Template_mat_list_item_click_0_listener() {
      const child_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.selectChildEntry(child_r13));
    });
    \u0275\u0275elementStart(1, "mat-icon", 66);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 67);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 68);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const child_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getEntryIcon(child_r13));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getEntryName(child_r13));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(child_r13.dn);
  }
}
function BrowseComponent_div_2_div_30_mat_tab_25_mat_list_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-list");
    \u0275\u0275template(1, BrowseComponent_div_2_div_30_mat_tab_25_mat_list_3_mat_list_item_1_Template, 7, 3, "mat-list-item", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.children);
  }
}
function BrowseComponent_div_2_div_30_mat_tab_25_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69)(1, "mat-icon");
    \u0275\u0275text(2, "folder_open");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No child entries found");
    \u0275\u0275elementEnd()();
  }
}
function BrowseComponent_div_2_div_30_mat_tab_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-tab", 58)(1, "div", 59);
    \u0275\u0275template(2, BrowseComponent_div_2_div_30_mat_tab_25_div_2_Template, 4, 0, "div", 60)(3, BrowseComponent_div_2_div_30_mat_tab_25_mat_list_3_Template, 2, 1, "mat-list", 10)(4, BrowseComponent_div_2_div_30_mat_tab_25_div_4_Template, 5, 0, "div", 61);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.loadingChildren);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loadingChildren && ctx_r1.children.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loadingChildren && ctx_r1.children.length === 0);
  }
}
function BrowseComponent_div_2_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 37)(2, "div", 38)(3, "strong");
    \u0275\u0275text(4, "Distinguished Name:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 39);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 40)(8, "button", 41);
    \u0275\u0275listener("click", function BrowseComponent_div_2_div_30_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.refreshEntry());
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "refresh");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 42);
    \u0275\u0275listener("click", function BrowseComponent_div_2_div_30_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editEntry(ctx_r1.selectedEntry));
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 43);
    \u0275\u0275listener("click", function BrowseComponent_div_2_div_30_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.copyDn(ctx_r1.selectedEntry.dn));
    });
    \u0275\u0275elementStart(15, "mat-icon");
    \u0275\u0275text(16, "content_copy");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "mat-tab-group")(18, "mat-tab", 44)(19, "div", 45);
    \u0275\u0275template(20, BrowseComponent_div_2_div_30_div_20_Template, 7, 4, "div", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "mat-tab", 47)(22, "div", 48)(23, "mat-chip-listbox");
    \u0275\u0275template(24, BrowseComponent_div_2_div_30_mat_chip_24_Template, 2, 3, "mat-chip", 49);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(25, BrowseComponent_div_2_div_30_mat_tab_25_Template, 5, 3, "mat-tab", 50);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.selectedEntry.dn);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r1.getAttributeKeys(ctx_r1.selectedEntry));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.getObjectClasses(ctx_r1.selectedEntry));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.hasChildren(ctx_r1.selectedEntry));
  }
}
function BrowseComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-card", 7)(2, "mat-card-header")(3, "mat-card-title");
    \u0275\u0275text(4, "Directory Tree");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-card-subtitle");
    \u0275\u0275text(6, "Navigate the LDAP directory structure");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-card-content")(8, "div", 8)(9, "button", 9);
    \u0275\u0275listener("click", function BrowseComponent_div_2_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.discoverRootDSE());
    });
    \u0275\u0275template(10, BrowseComponent_div_2_mat_icon_10_Template, 2, 0, "mat-icon", 10)(11, BrowseComponent_div_2_mat_icon_11_Template, 2, 0, "mat-icon", 10);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-form-field", 11)(14, "mat-label");
    \u0275\u0275text(15, "Custom Base DN");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 12);
    \u0275\u0275elementStart(17, "button", 13);
    \u0275\u0275listener("click", function BrowseComponent_div_2_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addCustomBaseDn());
    });
    \u0275\u0275elementStart(18, "mat-icon");
    \u0275\u0275text(19, "add");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(20, BrowseComponent_div_2_div_20_Template, 4, 3, "div", 14)(21, BrowseComponent_div_2_div_21_Template, 7, 0, "div", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "mat-card", 16)(23, "mat-card-header")(24, "mat-card-title");
    \u0275\u0275text(25, "Entry Details");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, BrowseComponent_div_2_mat_card_subtitle_26_Template, 2, 1, "mat-card-subtitle", 10)(27, BrowseComponent_div_2_mat_card_subtitle_27_Template, 2, 0, "mat-card-subtitle", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "mat-card-content");
    \u0275\u0275template(29, BrowseComponent_div_2_div_29_Template, 5, 0, "div", 17)(30, BrowseComponent_div_2_div_30_Template, 26, 4, "div", 18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", ctx_r1.discovering);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.discovering);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.discovering);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.discovering ? "Discovering..." : "Discover Root DSE", " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("formControl", ctx_r1.customBaseDnControl);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.customBaseDnControl.value);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.dataSource.data.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.dataSource.data.length === 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.selectedEntry);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.selectedEntry);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.selectedEntry);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedEntry);
  }
}
var BrowseComponent = class _BrowseComponent {
  fb;
  ldapService;
  localStorageService;
  notificationService;
  // Tree control and data
  treeControl = new FlatTreeControl((node) => node.level, (node) => node.expandable);
  _transformer = (node, level) => ({
    expandable: !!node.children && node.children.length > 0,
    name: this.getNodeDisplayName(node),
    level,
    dn: node.dn,
    loading: false,
    icon: node.icon,
    objectClasses: node.entry?.attributes?.["objectClass"] || []
  });
  treeFlattener = new MatTreeFlattener(this._transformer, (node) => node.level, (node) => node.expandable, (node) => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // Component state
  hasConnection = false;
  discovering = false;
  selectedEntry = null;
  children = [];
  loadingChildren = false;
  // Form controls
  customBaseDnControl;
  constructor(fb, ldapService, localStorageService, notificationService) {
    this.fb = fb;
    this.ldapService = ldapService;
    this.localStorageService = localStorageService;
    this.notificationService = notificationService;
    this.customBaseDnControl = this.fb.control("");
  }
  ngOnInit() {
    this.checkConnection();
  }
  checkConnection() {
    const connections = this.localStorageService.getSavedConnections();
    this.hasConnection = connections.length > 0;
  }
  hasChild = (_, node) => node.expandable;
  getNodeDisplayName(node) {
    if (node.name)
      return node.name;
    const rdn = node.dn.split(",")[0];
    return rdn.includes("=") ? rdn.split("=")[1] : rdn;
  }
  getNodeIcon(node) {
    if (node.icon)
      return node.icon;
    const objectClasses = node.objectClasses || [];
    if (objectClasses.includes("organizationalUnit"))
      return "folder";
    if (objectClasses.includes("person") || objectClasses.includes("inetOrgPerson"))
      return "person";
    if (objectClasses.includes("group") || objectClasses.includes("groupOfNames"))
      return "group";
    if (objectClasses.includes("computer"))
      return "computer";
    if (objectClasses.includes("domain"))
      return "domain";
    return "folder_open";
  }
  getNodeIconClass(node) {
    const objectClasses = node.objectClasses || [];
    if (objectClasses.includes("organizationalUnit"))
      return "organizational-unit";
    if (objectClasses.includes("person") || objectClasses.includes("inetOrgPerson"))
      return "person";
    if (objectClasses.includes("group") || objectClasses.includes("groupOfNames"))
      return "group";
    if (objectClasses.includes("computer"))
      return "computer";
    return "";
  }
  discoverRootDSE() {
    return __async(this, null, function* () {
      if (!this.hasConnection)
        return;
      this.discovering = true;
      try {
        const connection = this.getConnectionConfig();
        const rootDseResult = yield this.ldapService.getRootDse(connection).toPromise();
        if (rootDseResult?.success && rootDseResult.rootDse) {
          const rootDse = rootDseResult.rootDse;
          const treeNodes = [];
          if (rootDse.namingContexts) {
            rootDse.namingContexts.forEach((nc) => {
              treeNodes.push({
                dn: nc,
                name: nc,
                children: [],
                hasChildren: true,
                icon: "domain"
              });
            });
          }
          this.dataSource.data = treeNodes;
          this.notificationService.showSuccess(`Discovered ${treeNodes.length} naming contexts`);
        }
      } catch (error) {
        this.notificationService.showError(`Root DSE discovery failed: ${error.message}`);
      } finally {
        this.discovering = false;
      }
    });
  }
  addCustomBaseDn() {
    const baseDn = this.customBaseDnControl.value?.trim();
    if (!baseDn)
      return;
    const newNode = {
      dn: baseDn,
      name: baseDn,
      children: [],
      hasChildren: true,
      icon: "folder"
    };
    const currentData = this.dataSource.data;
    const exists = currentData.some((node) => node.dn === baseDn);
    if (!exists) {
      this.dataSource.data = [...currentData, newNode];
      this.customBaseDnControl.setValue("");
      this.notificationService.showSuccess(`Added base DN: ${baseDn}`);
    } else {
      this.notificationService.showWarning("This base DN already exists in the tree");
    }
  }
  loadChildren(node) {
    return __async(this, null, function* () {
      if (!this.treeControl.isExpanded(node)) {
        node.loading = true;
        try {
          const connection = this.getConnectionConfig();
          const searchResult = yield this.ldapService.browseChildren(connection, node.dn).toPromise();
          if (searchResult?.success && searchResult.entries) {
            const childNodes = searchResult.entries.map((entry) => ({
              dn: entry.dn,
              name: this.getEntryName(entry),
              entry,
              children: [],
              hasChildren: this.ldapService.hasChildren(entry),
              icon: this.ldapService.getEntryIcon(entry)
            }));
            const currentData = this.dataSource.data;
            const updatedData = this.updateNodeChildren(currentData, node.dn, childNodes);
            this.dataSource.data = updatedData;
          }
        } catch (error) {
          this.notificationService.showError(`Failed to load children: ${error.message}`);
        } finally {
          node.loading = false;
        }
      }
    });
  }
  updateNodeChildren(nodes, targetDn, children) {
    return nodes.map((node) => {
      if (node.dn === targetDn) {
        return __spreadProps(__spreadValues({}, node), { children });
      } else if (node.children) {
        return __spreadProps(__spreadValues({}, node), { children: this.updateNodeChildren(node.children, targetDn, children) });
      }
      return node;
    });
  }
  selectNode(node) {
    this.loadEntryDetails(node.dn);
  }
  loadEntryDetails(dn) {
    return __async(this, null, function* () {
      try {
        const connection = this.getConnectionConfig();
        const searchResult = yield this.ldapService.getEntry(connection, dn).toPromise();
        if (searchResult?.success && searchResult.entries && searchResult.entries.length > 0) {
          this.selectedEntry = searchResult.entries[0];
          if (this.hasChildren(this.selectedEntry)) {
            this.loadChildrenList();
          } else {
            this.children = [];
          }
        }
      } catch (error) {
        this.notificationService.showError(`Failed to load entry details: ${error.message}`);
      }
    });
  }
  loadChildrenList() {
    return __async(this, null, function* () {
      if (!this.selectedEntry)
        return;
      this.loadingChildren = true;
      try {
        const connection = this.getConnectionConfig();
        const searchResult = yield this.ldapService.browseChildren(connection, this.selectedEntry.dn).toPromise();
        if (searchResult?.success && searchResult.entries) {
          this.children = searchResult.entries;
        }
      } catch (error) {
        this.notificationService.showError(`Failed to load children: ${error.message}`);
      } finally {
        this.loadingChildren = false;
      }
    });
  }
  getConnectionConfig() {
    const connections = this.localStorageService.getSavedConnections();
    if (connections.length > 0) {
      return connections[0];
    }
    throw new Error("No connection configuration found");
  }
  getEntryName(entry) {
    const cn = entry.attributes?.["cn"]?.[0];
    const ou = entry.attributes?.["ou"]?.[0];
    const dc = entry.attributes?.["dc"]?.[0];
    const name = entry.attributes?.["name"]?.[0];
    return cn || ou || dc || name || entry.dn.split(",")[0].split("=")[1] || "Unknown";
  }
  getEntryIcon(entry) {
    return this.ldapService.getEntryIcon({ dn: entry.dn, entry });
  }
  getAttributeKeys(entry) {
    return Object.keys(entry.attributes || {}).sort();
  }
  getAttributeValues(entry, attribute) {
    return entry.attributes?.[attribute] || [];
  }
  isMultiValue(entry, attribute) {
    return (entry.attributes?.[attribute]?.length || 0) > 1;
  }
  isBinaryAttribute(attribute) {
    const binaryAttributes = ["objectGUID", "objectSid", "jpegPhoto", "thumbnailPhoto", "userCertificate"];
    return binaryAttributes.includes(attribute);
  }
  formatAttributeValue(attribute, value) {
    if (this.isBinaryAttribute(attribute)) {
      return `[Binary data - ${value.length} bytes]`;
    }
    return value;
  }
  getObjectClasses(entry) {
    return entry.attributes?.["objectClass"] || [];
  }
  getObjectClassType(objectClass) {
    const structuralClasses = ["person", "organizationalUnit", "group", "computer", "domain"];
    if (structuralClasses.includes(objectClass.toLowerCase())) {
      return "structural";
    }
    return "auxiliary";
  }
  hasChildren(entry) {
    return this.ldapService.hasChildren(entry);
  }
  selectChildEntry(child) {
    this.selectedEntry = child;
    this.loadChildrenList();
  }
  refreshEntry() {
    if (this.selectedEntry) {
      this.loadEntryDetails(this.selectedEntry.dn);
    }
  }
  editEntry(entry) {
    this.notificationService.showInfo("Entry editing coming soon");
  }
  copyDn(dn) {
    navigator.clipboard.writeText(dn).then(() => {
      this.notificationService.showSuccess("DN copied to clipboard");
    }).catch(() => {
      this.notificationService.showError("Failed to copy DN to clipboard");
    });
  }
  copyValue(value) {
    navigator.clipboard.writeText(value).then(() => {
      this.notificationService.showSuccess("Value copied to clipboard");
    }).catch(() => {
      this.notificationService.showError("Failed to copy value to clipboard");
    });
  }
  trackByIndex(index) {
    return index;
  }
  static \u0275fac = function BrowseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrowseComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(LdapService), \u0275\u0275directiveInject(LocalStorageService), \u0275\u0275directiveInject(NotificationService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BrowseComponent, selectors: [["app-browse"]], decls: 3, vars: 2, consts: [[1, "browse-container"], ["class", "connection-quick-card", 4, "ngIf"], ["class", "browse-layout", 4, "ngIf"], [1, "connection-quick-card"], [1, "quick-connection"], ["mat-raised-button", "", "color", "primary", "routerLink", "/connection"], [1, "browse-layout"], [1, "tree-card"], [1, "root-actions"], ["mat-stroked-button", "", 3, "click", "disabled"], [4, "ngIf"], ["appearance", "outline", 1, "base-dn-field"], ["matInput", "", "placeholder", "dc=example,dc=com", 3, "formControl"], ["matSuffix", "", "mat-icon-button", "", 3, "click", "disabled"], ["class", "tree-container", 4, "ngIf"], ["class", "empty-tree", 4, "ngIf"], [1, "details-card"], ["class", "no-selection", 4, "ngIf"], ["class", "entry-details", 4, "ngIf"], [1, "tree-container"], [3, "dataSource", "treeControl"], ["matTreeNodePadding", "", 3, "padding-left", 4, "matTreeNodeDef"], ["matTreeNodePadding", "", 3, "padding-left", 4, "matTreeNodeDef", "matTreeNodeDefWhen"], ["matTreeNodePadding", ""], ["mat-icon-button", "", "disabled", ""], [1, "tree-node-content", 3, "click"], [1, "node-icon"], [1, "node-label", 3, "title"], ["mat-icon-button", "", "matTreeNodeToggle", "", 3, "click"], [1, "mat-icon-rtl-mirror"], ["class", "node-icon", 3, "class", 4, "ngIf"], ["diameter", "16", "mode", "indeterminate", 4, "ngIf"], ["diameter", "16", "mode", "indeterminate"], [1, "empty-tree"], [1, "hint"], [1, "no-selection"], [1, "entry-details"], [1, "entry-header"], [1, "entry-dn"], [1, "dn-value"], [1, "entry-actions"], ["mat-icon-button", "", "matTooltip", "Refresh Entry", 3, "click"], ["mat-icon-button", "", "matTooltip", "Edit Entry", 3, "click"], ["mat-icon-button", "", "matTooltip", "Copy DN", 3, "click"], ["label", "Attributes"], [1, "attributes-container"], ["class", "attribute-item", 4, "ngFor", "ngForOf"], ["label", "Object Classes"], [1, "object-classes-container"], [3, "class", 4, "ngFor", "ngForOf"], ["label", "Children", 4, "ngIf"], [1, "attribute-item"], [1, "attribute-header"], [1, "attribute-values"], ["class", "attribute-value", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "attribute-value"], [1, "value-text"], ["mat-icon-button", "", "matTooltip", "Copy Value", 1, "copy-value", 3, "click"], ["label", "Children"], [1, "children-container"], ["class", "loading-children", 4, "ngIf"], ["class", "no-children", 4, "ngIf"], [1, "loading-children"], ["diameter", "24", "mode", "indeterminate"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["matListIcon", ""], ["matLine", "", 1, "child-name"], ["matLine", "", 1, "child-dn"], [1, "no-children"]], template: function BrowseComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, BrowseComponent_mat_card_1_Template, 12, 0, "mat-card", 1)(2, BrowseComponent_div_2_Template, 31, 12, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.hasConnection);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.hasConnection);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    RouterModule,
    RouterLink,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    FormControlDirective,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatIconModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatTreeModule,
    MatTreeNodeDef,
    MatTreeNodePadding,
    MatTreeNodeToggle,
    MatTree,
    MatTreeNode,
    MatExpansionModule,
    MatTabsModule,
    MatTab,
    MatTabGroup,
    MatTooltipModule,
    MatTooltip,
    MatChipsModule,
    MatChip,
    MatChipListbox,
    MatDividerModule,
    MatListModule,
    MatList,
    MatListItem
  ], styles: ["\n\n.browse-container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 2rem auto;\n  padding: 1rem;\n}\n.connection-quick-card[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.quick-connection[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  text-align: left;\n}\n.quick-connection[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #ff9800;\n  font-size: 2rem;\n  width: 2rem;\n  height: 2rem;\n}\n.browse-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n  min-height: 600px;\n}\n.tree-card[_ngcontent-%COMP%], \n.details-card[_ngcontent-%COMP%] {\n  height: fit-content;\n}\n.root-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.base-dn-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.tree-container[_ngcontent-%COMP%] {\n  max-height: 500px;\n  overflow-y: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n.tree-node-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  transition: background-color 0.2s;\n}\n.tree-node-content[_ngcontent-%COMP%]:hover {\n  background-color: #f5f5f5;\n}\n.tree-node-content.selected[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n}\n.node-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  width: 1.2rem;\n  height: 1.2rem;\n}\n.node-icon.organizational-unit[_ngcontent-%COMP%] {\n  color: #ff9800;\n}\n.node-icon.person[_ngcontent-%COMP%] {\n  color: #2196f3;\n}\n.node-icon.group[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.node-icon.computer[_ngcontent-%COMP%] {\n  color: #9c27b0;\n}\n.node-label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.empty-tree[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  color: #666;\n}\n.empty-tree[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  width: 3rem;\n  height: 3rem;\n  margin-bottom: 1rem;\n}\n.empty-tree[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #999;\n}\n.no-selection[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  color: #666;\n}\n.no-selection[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  width: 3rem;\n  height: 3rem;\n  margin-bottom: 1rem;\n}\n.entry-details[_ngcontent-%COMP%] {\n  padding: 1rem 0;\n}\n.entry-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid #e0e0e0;\n}\n.entry-dn[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.dn-value[_ngcontent-%COMP%] {\n  font-family: monospace;\n  background: #f5f5f5;\n  padding: 0.25rem;\n  border-radius: 4px;\n  display: block;\n  margin-top: 0.5rem;\n  word-break: break-all;\n}\n.entry-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.attributes-container[_ngcontent-%COMP%] {\n  padding: 1rem 0;\n  max-height: 400px;\n  overflow-y: auto;\n}\n.attribute-item[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid #f0f0f0;\n}\n.attribute-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n.attribute-values[_ngcontent-%COMP%] {\n  margin-left: 1rem;\n}\n.attribute-value[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.25rem;\n  padding: 0.25rem;\n  background: #fafafa;\n  border-radius: 4px;\n}\n.value-text[_ngcontent-%COMP%] {\n  flex: 1;\n  font-family: monospace;\n  font-size: 0.9rem;\n  word-break: break-all;\n}\n.value-text.binary[_ngcontent-%COMP%] {\n  color: #666;\n  font-style: italic;\n}\n.copy-value[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  transition: opacity 0.2s;\n}\n.attribute-value[_ngcontent-%COMP%]:hover   .copy-value[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.object-classes-container[_ngcontent-%COMP%] {\n  padding: 1rem 0;\n}\n.children-container[_ngcontent-%COMP%] {\n  padding: 1rem 0;\n}\n.loading-children[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  padding: 2rem;\n}\n.child-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.child-dn[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 0.8rem;\n  color: #666;\n}\n.no-children[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  color: #666;\n}\n.no-children[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  width: 2rem;\n  height: 2rem;\n  margin-bottom: 1rem;\n}\n@media (max-width: 1024px) {\n  .browse-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .tree-container[_ngcontent-%COMP%] {\n    max-height: 300px;\n  }\n  .attributes-container[_ngcontent-%COMP%] {\n    max-height: 300px;\n  }\n}\n@media (max-width: 768px) {\n  .browse-container[_ngcontent-%COMP%] {\n    margin: 1rem;\n    padding: 0.5rem;\n  }\n  .entry-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: stretch;\n  }\n  .entry-actions[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=browse.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowseComponent, [{
    type: Component,
    args: [{ selector: "app-browse", standalone: true, imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatTreeModule,
      MatExpansionModule,
      MatTabsModule,
      MatTooltipModule,
      MatChipsModule,
      MatDividerModule,
      MatListModule
    ], template: `
    <div class="browse-container">
      <!-- Connection Quick Setup -->
      <mat-card class="connection-quick-card" *ngIf="!hasConnection">
        <mat-card-content>
          <div class="quick-connection">
            <mat-icon>warning</mat-icon>
            <div>
              <h3>No LDAP Connection</h3>
              <p>Please configure an LDAP connection first to browse the directory.</p>
              <button mat-raised-button color="primary" routerLink="/connection">
                Configure Connection
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Browse Interface -->
      <div class="browse-layout" *ngIf="hasConnection">
        <!-- Left Panel - Directory Tree -->
        <mat-card class="tree-card">
          <mat-card-header>
            <mat-card-title>Directory Tree</mat-card-title>
            <mat-card-subtitle>Navigate the LDAP directory structure</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <!-- Root DSE Discovery -->
            <div class="root-actions">
              <button mat-stroked-button (click)="discoverRootDSE()" 
                      [disabled]="discovering">
                <mat-icon *ngIf="discovering">hourglass_empty</mat-icon>
                <mat-icon *ngIf="!discovering">explore</mat-icon>
                {{ discovering ? 'Discovering...' : 'Discover Root DSE' }}
              </button>
              
              <mat-form-field appearance="outline" class="base-dn-field">
                <mat-label>Custom Base DN</mat-label>
                <input matInput [formControl]="customBaseDnControl" 
                       placeholder="dc=example,dc=com">
                <button matSuffix mat-icon-button (click)="addCustomBaseDn()"
                        [disabled]="!customBaseDnControl.value">
                  <mat-icon>add</mat-icon>
                </button>
              </mat-form-field>
            </div>

            <!-- Directory Tree -->
            <div class="tree-container" *ngIf="dataSource.data.length > 0">
              <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
                <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding 
                               [style.padding-left.px]="node.level * 20">
                  <button mat-icon-button disabled></button>
                  <div class="tree-node-content" (click)="selectNode(node)">
                    <mat-icon class="node-icon" [class]="getNodeIconClass(node)">
                      {{ getNodeIcon(node) }}
                    </mat-icon>
                    <span class="node-label" [title]="node.dn">{{ node.name }}</span>
                  </div>
                </mat-tree-node>

                <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding
                               [style.padding-left.px]="node.level * 20">
                  <button mat-icon-button matTreeNodeToggle 
                          [attr.aria-label]="'Toggle ' + node.name"
                          (click)="loadChildren(node)">
                    <mat-icon class="mat-icon-rtl-mirror">
                      {{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
                    </mat-icon>
                  </button>
                  <div class="tree-node-content" (click)="selectNode(node)">
                    <mat-icon *ngIf="!node.loading" class="node-icon" [class]="getNodeIconClass(node)">
                      {{ getNodeIcon(node) }}
                    </mat-icon>
                    <mat-progress-spinner *ngIf="node.loading" 
                                          diameter="16" mode="indeterminate">
                    </mat-progress-spinner>
                    <span class="node-label" [title]="node.dn">{{ node.name }}</span>
                  </div>
                </mat-tree-node>
              </mat-tree>
            </div>

            <!-- Empty State -->
            <div *ngIf="dataSource.data.length === 0" class="empty-tree">
              <mat-icon>account_tree</mat-icon>
              <p>No directory structure loaded</p>
              <p class="hint">Use "Discover Root DSE" or add a custom Base DN to start browsing</p>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Right Panel - Entry Details -->
        <mat-card class="details-card">
          <mat-card-header>
            <mat-card-title>Entry Details</mat-card-title>
            <mat-card-subtitle *ngIf="selectedEntry">{{ selectedEntry.dn }}</mat-card-subtitle>
            <mat-card-subtitle *ngIf="!selectedEntry">Select an entry to view details</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div *ngIf="!selectedEntry" class="no-selection">
              <mat-icon>info</mat-icon>
              <p>Select an entry from the directory tree to view its attributes and details.</p>
            </div>

            <div *ngIf="selectedEntry" class="entry-details">
              <!-- Entry Info -->
              <div class="entry-header">
                <div class="entry-dn">
                  <strong>Distinguished Name:</strong>
                  <span class="dn-value">{{ selectedEntry.dn }}</span>
                </div>
                
                <div class="entry-actions">
                  <button mat-icon-button (click)="refreshEntry()" 
                          matTooltip="Refresh Entry">
                    <mat-icon>refresh</mat-icon>
                  </button>
                  <button mat-icon-button (click)="editEntry(selectedEntry)" 
                          matTooltip="Edit Entry">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button (click)="copyDn(selectedEntry.dn)" 
                          matTooltip="Copy DN">
                    <mat-icon>content_copy</mat-icon>
                  </button>
                </div>
              </div>

              <!-- Attributes Tab -->
              <mat-tab-group>
                <mat-tab label="Attributes">
                  <div class="attributes-container">
                    <div *ngFor="let attr of getAttributeKeys(selectedEntry)" class="attribute-item">
                      <div class="attribute-header">
                        <strong>{{ attr }}</strong>
                        <mat-chip-listbox *ngIf="isMultiValue(selectedEntry, attr)">
                          <mat-chip>{{ getAttributeValues(selectedEntry, attr).length }} values</mat-chip>
                        </mat-chip-listbox>
                      </div>
                      
                      <div class="attribute-values">
                        <div *ngFor="let value of getAttributeValues(selectedEntry, attr); 
                                    let i = index; trackBy: trackByIndex" 
                             class="attribute-value">
                          <span class="value-text" [class.binary]="isBinaryAttribute(attr)">
                            {{ formatAttributeValue(attr, value) }}
                          </span>
                          <button mat-icon-button class="copy-value" 
                                  (click)="copyValue(value)" 
                                  matTooltip="Copy Value">
                            <mat-icon>content_copy</mat-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </mat-tab>

                <mat-tab label="Object Classes">
                  <div class="object-classes-container">
                    <mat-chip-listbox>
                      <mat-chip *ngFor="let oc of getObjectClasses(selectedEntry)" 
                                [class]="getObjectClassType(oc)">
                        {{ oc }}
                      </mat-chip>
                    </mat-chip-listbox>
                  </div>
                </mat-tab>

                <mat-tab label="Children" *ngIf="hasChildren(selectedEntry)">
                  <div class="children-container">
                    <div *ngIf="loadingChildren" class="loading-children">
                      <mat-progress-spinner diameter="24" mode="indeterminate"></mat-progress-spinner>
                      <p>Loading children...</p>
                    </div>
                    
                    <mat-list *ngIf="!loadingChildren && children.length > 0">
                      <mat-list-item *ngFor="let child of children" (click)="selectChildEntry(child)">
                        <mat-icon matListIcon>{{ getEntryIcon(child) }}</mat-icon>
                        <div matLine class="child-name">{{ getEntryName(child) }}</div>
                        <div matLine class="child-dn">{{ child.dn }}</div>
                      </mat-list-item>
                    </mat-list>
                    
                    <div *ngIf="!loadingChildren && children.length === 0" class="no-children">
                      <mat-icon>folder_open</mat-icon>
                      <p>No child entries found</p>
                    </div>
                  </div>
                </mat-tab>
              </mat-tab-group>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;d89cdf535e053298ca8f28491e3bf57344f2e0facc82fca625ef9a63b329e91a;/home/jheer/Documents/git/Angular/ldaptoolUI/src/app/components/browse/browse.component.ts */\n.browse-container {\n  max-width: 1400px;\n  margin: 2rem auto;\n  padding: 1rem;\n}\n.connection-quick-card {\n  margin-bottom: 1rem;\n}\n.quick-connection {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  text-align: left;\n}\n.quick-connection mat-icon {\n  color: #ff9800;\n  font-size: 2rem;\n  width: 2rem;\n  height: 2rem;\n}\n.browse-layout {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n  min-height: 600px;\n}\n.tree-card,\n.details-card {\n  height: fit-content;\n}\n.root-actions {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.base-dn-field {\n  width: 100%;\n}\n.tree-container {\n  max-height: 500px;\n  overflow-y: auto;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n}\n.tree-node-content {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  transition: background-color 0.2s;\n}\n.tree-node-content:hover {\n  background-color: #f5f5f5;\n}\n.tree-node-content.selected {\n  background-color: #e3f2fd;\n}\n.node-icon {\n  font-size: 1.2rem;\n  width: 1.2rem;\n  height: 1.2rem;\n}\n.node-icon.organizational-unit {\n  color: #ff9800;\n}\n.node-icon.person {\n  color: #2196f3;\n}\n.node-icon.group {\n  color: #4caf50;\n}\n.node-icon.computer {\n  color: #9c27b0;\n}\n.node-label {\n  font-size: 0.9rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.empty-tree {\n  text-align: center;\n  padding: 2rem;\n  color: #666;\n}\n.empty-tree mat-icon {\n  font-size: 3rem;\n  width: 3rem;\n  height: 3rem;\n  margin-bottom: 1rem;\n}\n.empty-tree .hint {\n  font-size: 0.9rem;\n  color: #999;\n}\n.no-selection {\n  text-align: center;\n  padding: 2rem;\n  color: #666;\n}\n.no-selection mat-icon {\n  font-size: 3rem;\n  width: 3rem;\n  height: 3rem;\n  margin-bottom: 1rem;\n}\n.entry-details {\n  padding: 1rem 0;\n}\n.entry-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 1rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid #e0e0e0;\n}\n.entry-dn {\n  flex: 1;\n}\n.dn-value {\n  font-family: monospace;\n  background: #f5f5f5;\n  padding: 0.25rem;\n  border-radius: 4px;\n  display: block;\n  margin-top: 0.5rem;\n  word-break: break-all;\n}\n.entry-actions {\n  display: flex;\n  gap: 0.5rem;\n}\n.attributes-container {\n  padding: 1rem 0;\n  max-height: 400px;\n  overflow-y: auto;\n}\n.attribute-item {\n  margin-bottom: 1rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid #f0f0f0;\n}\n.attribute-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n.attribute-values {\n  margin-left: 1rem;\n}\n.attribute-value {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.25rem;\n  padding: 0.25rem;\n  background: #fafafa;\n  border-radius: 4px;\n}\n.value-text {\n  flex: 1;\n  font-family: monospace;\n  font-size: 0.9rem;\n  word-break: break-all;\n}\n.value-text.binary {\n  color: #666;\n  font-style: italic;\n}\n.copy-value {\n  opacity: 0.5;\n  transition: opacity 0.2s;\n}\n.attribute-value:hover .copy-value {\n  opacity: 1;\n}\n.object-classes-container {\n  padding: 1rem 0;\n}\n.children-container {\n  padding: 1rem 0;\n}\n.loading-children {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  padding: 2rem;\n}\n.child-name {\n  font-weight: 500;\n}\n.child-dn {\n  font-family: monospace;\n  font-size: 0.8rem;\n  color: #666;\n}\n.no-children {\n  text-align: center;\n  padding: 2rem;\n  color: #666;\n}\n.no-children mat-icon {\n  font-size: 2rem;\n  width: 2rem;\n  height: 2rem;\n  margin-bottom: 1rem;\n}\n@media (max-width: 1024px) {\n  .browse-layout {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n  .tree-container {\n    max-height: 300px;\n  }\n  .attributes-container {\n    max-height: 300px;\n  }\n}\n@media (max-width: 768px) {\n  .browse-container {\n    margin: 1rem;\n    padding: 0.5rem;\n  }\n  .entry-header {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: stretch;\n  }\n  .entry-actions {\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=browse.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: LdapService }, { type: LocalStorageService }, { type: NotificationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BrowseComponent, { className: "BrowseComponent", filePath: "src/app/components/browse/browse.component.ts", lineNumber: 549 });
})();
export {
  BrowseComponent
};
//# sourceMappingURL=chunk-CO2OYVJY.js.map
