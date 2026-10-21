import defaultsDeep from "lodash.defaultsdeep";

import * as accentMotion from "./accent/motion";
import * as accentLooks from "./accent/looks";
import * as accentSounds from "./accent/sounds";
import * as accentEvents from "./accent/events";
import * as accentControl from "./accent/control";
import * as accentSensing from "./accent/sensing"
import * as accentOperators from "./accent/operators";
import * as accentVariables from "./accent/variables";
import * as accentLists from "./accent/lists";
import * as accentMyBlocks from "./accent/my_blocks";
import * as accentExtensions from "./accent/extensions";
import * as accentRainbow from "./accent/rainbow";
import * as accentBread from "./accent/bread";

import * as guiLight from "./gui/light";
import * as guiDark from "./gui/dark";

import * as blocksThree from "./blocks/three";
import * as blocksHighContrast from "./blocks/high-contrast";
import * as blocksDark from "./blocks/dark";

const ACCENT_MOTION = "motion";
const ACCENT_LOOKS = "looks";
const ACCENT_SOUNDS = "sound";
const ACCENT_EVENTS = "events";
const ACCENT_CONTROL = "control";
const ACCENT_SENSING = "sensing";
const ACCENT_OPERATORS = "operators";
const ACCENT_VARIABLES = "variables";
const ACCENT_LISTS = "lists";
const ACCENT_MY_BLOCKS = "my_blocks";
const ACCENT_EXTENSIONS = "extensions";
const ACCENT_BREAD = "bread";
const ACCENT_RAINBOW = "rainbow";
const ACCENT_MAP = {
    [ACCENT_BREAD]: accentBread,
    [ACCENT_RAINBOW]: accentRainbow,
    [ACCENT_MOTION]: accentMotion,
    [ACCENT_LOOKS]: accentLooks,
    [ACCENT_SOUNDS]: accentSounds,
    [ACCENT_EVENTS]: accentEvents,
    [ACCENT_CONTROL]: accentControl,
    [ACCENT_SENSING]: accentSensing,
    [ACCENT_OPERATORS]: accentOperators,
    [ACCENT_VARIABLES]: accentVariables,
    [ACCENT_LISTS]: accentLists,
    [ACCENT_MY_BLOCKS]: accentMyBlocks,
    [ACCENT_EXTENSIONS]: accentExtensions,
};
const ACCENT_DEFAULT = ACCENT_BREAD;

const GUI_LIGHT = "light";
const GUI_DARK = "dark";
const GUI_MAP = {
    [GUI_LIGHT]: guiLight,
    [GUI_DARK]: guiDark,
};
const GUI_DEFAULT = GUI_LIGHT;

const BLOCKS_THREE = "three";
const BLOCKS_DARK = "dark";
const BLOCKS_HIGH_CONTRAST = "high-contrast";
const BLOCKS_CUSTOM = "custom";
const BLOCKS_DEFAULT = BLOCKS_THREE;
const defaultBlockColors = blocksThree.blockColors;
const BLOCKS_MAP = {
    [BLOCKS_THREE]: {
        blocksMediaFolder: "blocks-media/default",
        colors: blocksThree.blockColors,
        extensions: blocksThree.extensions,
        customExtensionColors: {},
        useForStage: true,
    },
    [BLOCKS_HIGH_CONTRAST]: {
        blocksMediaFolder: "blocks-media/high-contrast",
        colors: defaultsDeep(
            {},
            blocksHighContrast.blockColors,
            defaultBlockColors,
        ),
        extensions: blocksHighContrast.extensions,
        customExtensionColors: blocksHighContrast.customExtensionColors,
        useForStage: true,
    },
    [BLOCKS_DARK]: {
        blocksMediaFolder: "blocks-media/default",
        colors: defaultsDeep({}, blocksDark.blockColors, defaultBlockColors),
        extensions: blocksDark.extensions,
        customExtensionColors: blocksDark.customExtensionColors,
        useForStage: false,
    },
    [BLOCKS_CUSTOM]: {
        // to be filled by editor-theme3 addon
        blocksMediaFolder: "blocks-media/default",
        colors: blocksThree.blockColors,
        extensions: {},
        customExtensionColors: {},
        useForStage: false,
    },
};

let themeObjectsCreated = 0;

class Theme {
    constructor(accent, gui, blocks) {
        // do not modify these directly
        /** @readonly */
        this.id = ++themeObjectsCreated;
        /** @readonly */
        this.accent = Object.prototype.hasOwnProperty.call(ACCENT_MAP, accent)
            ? accent
            : ACCENT_DEFAULT;
        /** @readonly */
        this.gui = Object.prototype.hasOwnProperty.call(GUI_MAP, gui)
            ? gui
            : GUI_DEFAULT;
        /** @readonly */
        this.blocks = Object.prototype.hasOwnProperty.call(BLOCKS_MAP, blocks)
            ? blocks
            : BLOCKS_DEFAULT;
    }

    static light = new Theme(ACCENT_DEFAULT, GUI_LIGHT, BLOCKS_DEFAULT);
    static dark = new Theme(ACCENT_DEFAULT, GUI_DARK, BLOCKS_DEFAULT);
    static highContrast = new Theme(
        ACCENT_DEFAULT,
        GUI_DEFAULT,
        BLOCKS_HIGH_CONTRAST,
    );

    set(what, to) {
        if (what === "accent") {
            return new Theme(to, this.gui, this.blocks);
        } else if (what === "gui") {
            return new Theme(this.accent, to, this.blocks);
        } else if (what === "blocks") {
            return new Theme(this.accent, this.gui, to);
        }
        throw new Error(`Unknown theme property: ${what}`);
    }

    getBlocksMediaFolder() {
        return BLOCKS_MAP[this.blocks].blocksMediaFolder;
    }

    getGuiColors() {
        return defaultsDeep(
            {},
            ACCENT_MAP[this.accent].guiColors,
            GUI_MAP[this.gui].guiColors,
            guiLight.guiColors,
        );
    }

    getBlockColors() {
        return defaultsDeep(
            {},
            ACCENT_MAP[this.accent].blockColors,
            GUI_MAP[this.gui].blockColors,
            BLOCKS_MAP[this.blocks].colors,
        );
    }

    getExtensions() {
        return BLOCKS_MAP[this.blocks].extensions;
    }

    isDark() {
        return this.getGuiColors()["color-scheme"] === "dark";
    }

    getStageBlockColors() {
        if (BLOCKS_MAP[this.blocks].useForStage) {
            return this.getBlockColors();
        }
        return Theme.light.getBlockColors();
    }

    getCustomExtensionColors() {
        return BLOCKS_MAP[this.blocks].customExtensionColors;
    }
}

export {
    Theme,
    defaultBlockColors,
    ACCENT_BREAD,
    ACCENT_RAINBOW,
    ACCENT_MOTION,
    ACCENT_LOOKS,
    ACCENT_SOUNDS,
    ACCENT_EVENTS,
    ACCENT_CONTROL,
    ACCENT_SENSING,
    ACCENT_OPERATORS,
    ACCENT_VARIABLES,
    ACCENT_LISTS,
    ACCENT_MY_BLOCKS,
    ACCENT_EXTENSIONS,
    ACCENT_MAP,
    GUI_LIGHT,
    GUI_DARK,
    GUI_MAP,
    BLOCKS_THREE,
    BLOCKS_DARK,
    BLOCKS_HIGH_CONTRAST,
    BLOCKS_CUSTOM,
    BLOCKS_MAP,
};
