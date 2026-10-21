import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import { connect } from "react-redux";

import check from "./check.svg";
import dropdownCaret from "./dropdown-caret.svg";
import { MenuItem, Submenu } from "../menu/menu.jsx";
import {
    ACCENT_BREAD,
    ACCENT_RAINBOW,
    ACCENT_MAP,
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
    Theme,
} from "../../lib/themes/index.js";
import {
    openAccentMenu,
    accentMenuOpen,
    closeSettingsMenu,
} from "../../reducers/menus.js";
import { setTheme } from "../../reducers/theme.js";
import { persistTheme } from "../../lib/themes/themePersistance.js";
import rainbowIcon from "./tw-accent-rainbow.svg";
import styles from "./settings-menu.css";

const options = defineMessages({
    [ACCENT_BREAD]: {
        defaultMessage: "Bread",
        description:
            "Name of the bread color scheme, used by BreadMod by default.",
        id: "bm.accent.bread",
    },
    [ACCENT_MOTION]: {
        defaultMessage: "Motion",
        description:
            "Name of the Motion color scheme, should be the same as the palette name.",
        id: "bm.accent.motion"
    },
    [ACCENT_LOOKS]: {
        defaultMessage: "Looks",
        description:
            "Name of the Looks color scheme, should be the same as the palette name.",
        id: "bm.accent.looks"
    },
    [ACCENT_SOUNDS]: {
        defaultMessage: "Sounds",
        description:
            "Name of the Sounds color scheme, should be the same as the palette name.",
        id: "bm.accent.sound"
    },
    [ACCENT_EVENTS]: {
        defaultMessage: "Events",
        description:
            "Name of the Events color scheme, should be the same as the palette name.",
        id: "bm.accent.events"
    },
    [ACCENT_CONTROL]: {
        defaultMessage: "Control",
        description:
            "Name of the Control color scheme, should be the same as the palette name.",
        id: "bm.accent.control"
    },
    [ACCENT_SENSING]: {
        defaultMessage: "Sensing",
        description:
            "Name of the Sensing color scheme, should be the same as the palette name.",
        id: "bm.accent.sensing"
    },
    [ACCENT_OPERATORS]: {
        defaultMessage: "Operators",
        description:
            "Name of the Operators color scheme, should be the same as the palette name.",
        id: "bm.accent.operators"
    },
    [ACCENT_VARIABLES]: {
        defaultMessage: "Variables",
        description:
            "Name of the Variables color scheme, should be the same as the palette name.",
        id: "bm.accent.variables"
    },
    [ACCENT_LISTS]: {
        defaultMessage: "Lists",
        description:
            "Name of the Lists color scheme, should be the same as the palette name.",
        id: "bm.accent.lists"
    },
    [ACCENT_MY_BLOCKS]: {
        defaultMessage: "My Blocks",
        description:
            "Name of the My Blocks color scheme, should be the same as the palette name.",
        id: "bm.accent.my_blocks"
    },
    [ACCENT_EXTENSIONS]: {
        defaultMessage: "Extensions",
        description:
            "Name of the Extensions color scheme, should be the same as the palette name.",
        id: "bm.accent.extensions"
    },
    [ACCENT_RAINBOW]: {
        defaultMessage: "Rainbow",
        description:
            "Name of the Rainbow color scheme.",
        id: "bm.accent.rainbow"
    }
});

const icons = {
    [ACCENT_RAINBOW]: rainbowIcon,
};

const ColorIcon = (props) =>
    icons[props.id] ? (
        <img
            className={styles.accentIconOuter}
            src={icons[props.id]}
            draggable={false}
            // Image is decorative
            alt=""
        />
    ) : (
        <div
            className={styles.accentIconOuter}
            style={{
                // menu-bar-background is var(...), don't want to evaluate with the current values
                backgroundColor:
                    ACCENT_MAP[props.id].guiColors["looks-secondary"],
                backgroundImage:
                    ACCENT_MAP[props.id].guiColors["menu-bar-background-image"],
            }}
        />
    );

ColorIcon.propTypes = {
    id: PropTypes.string,
};

const AccentMenuItem = (props) => (
    <MenuItem onClick={props.onClick}>
        <div className={styles.option}>
            <img
                className={classNames(styles.check, {
                    [styles.selected]: props.isSelected,
                })}
                width={15}
                height={12}
                src={check}
                draggable={false}
            />
            <ColorIcon id={props.id} />
            <FormattedMessage {...options[props.id]} />
        </div>
    </MenuItem>
);

AccentMenuItem.propTypes = {
    id: PropTypes.string,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
};

const AccentThemeMenu = ({ isOpen, isRtl, onChangeTheme, onOpen, theme }) => (
    <MenuItem expanded={isOpen}>
        <div className={styles.option} onClick={onOpen}>
            <ColorIcon id={theme.accent} />
            <span className={styles.submenuLabel}>
                <FormattedMessage
                    defaultMessage="Accent"
                    description="Label for menu to choose accent color (eg. TurboWarp's red, Scratch's purple)"
                    id="tw.menuBar.accent"
                />
            </span>
            <img
                className={styles.expandCaret}
                src={dropdownCaret}
                draggable={false}
            />
        </div>
        <Submenu place={isRtl ? "left" : "right"}>
            {Object.keys(options).map((item) => (
                <AccentMenuItem
                    key={item}
                    id={item}
                    isSelected={theme.accent === item}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => onChangeTheme(theme.set("accent", item))}
                />
            ))}
        </Submenu>
    </MenuItem>
);

AccentThemeMenu.propTypes = {
    isOpen: PropTypes.bool,
    isRtl: PropTypes.bool,
    onChangeTheme: PropTypes.func,
    onOpen: PropTypes.func,
    theme: PropTypes.instanceOf(Theme),
};

const mapStateToProps = (state) => ({
    isOpen: accentMenuOpen(state),
    isRtl: state.locales.isRtl,
    theme: state.scratchGui.theme.theme,
});

const mapDispatchToProps = (dispatch) => ({
    onChangeTheme: (theme) => {
        dispatch(setTheme(theme));
        dispatch(closeSettingsMenu());
        persistTheme(theme);
    },
    onOpen: () => dispatch(openAccentMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccentThemeMenu);
