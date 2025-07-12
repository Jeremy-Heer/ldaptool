import {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatOptgroup,
  MatOption,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger
} from "./chunk-72VETGN7.js";
import "./chunk-YOXJ4RST.js";
import "./chunk-LM4ZH2OG.js";
import "./chunk-I6GN4ANE.js";
import "./chunk-CV3CH3U3.js";
import "./chunk-NQN5D5ND.js";
import "./chunk-H43S55CQ.js";
import "./chunk-5UMX3OYX.js";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-S6FOR4FH.js";
import "./chunk-DWLVY32D.js";
import "./chunk-QV3WHZGR.js";
import "./chunk-4NLRMGIB.js";
import "./chunk-YYVB6VMC.js";
import "./chunk-VPOMKPYL.js";
import "./chunk-4F3YOXEE.js";
import "./chunk-FRHAYGFP.js";
import "./chunk-5WKRUAHF.js";
import "./chunk-3RS3PVUK.js";
import "./chunk-KAPXTIMC.js";
import "./chunk-TYAG4UIB.js";
import "./chunk-EOFW2REK.js";
import "./chunk-5I3OGQTC.js";
import "./chunk-UF7LNBLK.js";
import "./chunk-V3T7Y6TN.js";
import "./chunk-FTX2ZS64.js";
import "./chunk-3LNNAZKW.js";
import "./chunk-ZJY7OFL6.js";
import "./chunk-3MSPGWOQ.js";
import "./chunk-7DPHYZ4E.js";
import "./chunk-YNFP4REK.js";
import "./chunk-3KKC7HMJ.js";
import "./chunk-WDMUDEB6.js";

// node_modules/@angular/material/fesm2022/select.mjs
var matSelectAnimations = {
  // Represents
  // trigger('transformPanel', [
  //   state(
  //     'void',
  //     style({
  //       opacity: 0,
  //       transform: 'scale(1, 0.8)',
  //     }),
  //   ),
  //   transition(
  //     'void => showing',
  //     animate(
  //       '120ms cubic-bezier(0, 0, 0.2, 1)',
  //       style({
  //         opacity: 1,
  //         transform: 'scale(1, 1)',
  //       }),
  //     ),
  //   ),
  //   transition('* => void', animate('100ms linear', style({opacity: 0}))),
  // ])
  /** This animation transforms the select's overlay panel on and off the page. */
  transformPanel: {
    type: 7,
    name: "transformPanel",
    definitions: [
      {
        type: 0,
        name: "void",
        styles: {
          type: 6,
          styles: { opacity: 0, transform: "scale(1, 0.8)" },
          offset: null
        }
      },
      {
        type: 1,
        expr: "void => showing",
        animation: {
          type: 4,
          styles: {
            type: 6,
            styles: { opacity: 1, transform: "scale(1, 1)" },
            offset: null
          },
          timings: "120ms cubic-bezier(0, 0, 0.2, 1)"
        },
        options: null
      },
      {
        type: 1,
        expr: "* => void",
        animation: {
          type: 4,
          styles: { type: 6, styles: { opacity: 0 }, offset: null },
          timings: "100ms linear"
        },
        options: null
      }
    ],
    options: {}
  }
};
export {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatOptgroup,
  MatOption,
  MatPrefix,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger,
  MatSuffix,
  matSelectAnimations
};
//# sourceMappingURL=@angular_material_select.js.map
