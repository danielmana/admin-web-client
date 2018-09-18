

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.styleSheet = undefined;

const _assign = require('object-assign');

const _extends = _assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = TableSortLabel;

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

const _jssThemeReactor = require('jss-theme-reactor');

const _classnames = require('classnames');

const _classnames2 = _interopRequireDefault(_classnames);

const _ButtonBase = require('../internal/ButtonBase');

const _ButtonBase2 = _interopRequireDefault(_ButtonBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { const target = {}; for (const i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } //  weak

const styleSheet = exports.styleSheet = (0, _jssThemeReactor.createStyleSheet)('TableSortLabel', (theme) => ({
  sortLabel: {
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'inherit',
    alignItems: 'center',
    background: 'transparent',
    '&:hover': {
      color: theme.palette.text.primary,
    },
    '&:focus': {
      color: theme.palette.text.primary,
    },
  },
  active: {
    color: theme.palette.text.primary,
    '& $icon': {
      opacity: 1,
    },
  },
  icon: {
    fontSize: 16,
    marginRight: 4,
    marginLeft: 4,
    opacity: 0,
    transition: theme.transitions.create(['opacity', 'transform'], '200ms'),
    userSelect: 'none',
  },
  desc: {
    transform: 'rotate(0deg)',
  },
  asc: {
    transform: 'rotate(180deg)',
  },
}));

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
function TableSortLabel(props, context) {
  let active = props.active,
    className = props.className,
    children = props.children,
    direction = props.direction,
    other = _objectWithoutProperties(props, ['active', 'className', 'children', 'direction']);

  const classes = context.styleManager.render(styleSheet);
  const sortLabelClasses = (0, _classnames2.default)(classes.sortLabel, _defineProperty({}, classes.active, active), className);

  const iconClasses = (0, _classnames2.default)(classes.icon, _defineProperty({}, classes[direction], !!direction), 'material-icons');

  return _react2.default.createElement(
    _ButtonBase2.default,
    _extends({
      className: sortLabelClasses,
      component: 'span',
      ripple: false,
    }, other),
    children,
    _react2.default.createElement(
      'span',
      { className: iconClasses },
      'arrow_downward'
    )
  );
}

TableSortLabel.propTypes = {
  /**
   * If set to true, will have the active styling (should be true for the sorted column).
   */
  active: _react.PropTypes.bool,
  /**
   * Label contents, the arrow will be appended automatically and aligned using flexbox.
   */
  children: _react.PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: _react.PropTypes.string,
  /**
   * The current sort direction.
   */
  direction: _react.PropTypes.oneOf(['asc', 'desc']),
};

TableSortLabel.defaultProps = {
  active: false,
  direction: 'desc',
};

TableSortLabel.contextTypes = {
  styleManager: _react.PropTypes.object.isRequired,
};
