

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.styleSheet = undefined;

const _assign = require('object-assign');

const _extends = _assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

const _jssThemeReactor = require('jss-theme-reactor');

const _classnames = require('classnames');

const _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { const target = {}; for (const i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //  weak

const styleSheet = exports.styleSheet = (0, _jssThemeReactor.createStyleSheet)('Table', () => ({
  root: {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    overflow: 'hidden',
  },
}));

/**
 * A material table root element.
 *
 * ```jsx
 * <Table>
 *   <TableHeader>....</TableHeader>
 *   <TableBody>....</TableBody>
 * </Table>
 * ```
 */

const Table = (function (_Component) {
  _inherits(Table, _Component);

  function Table() {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
  }

  _createClass(Table, [{
    key: 'getChildContext',
    value: function getChildContext() {
      // eslint-disable-line class-methods-use-this
      return {
        table: {},
      };
    },
  }, {
    key: 'render',
    value: function render() {
      let _props = this.props,
        classNameProp = _props.className,
        children = _props.children,
        other = _objectWithoutProperties(_props, ['className', 'children']);

      const classes = this.context.styleManager.render(styleSheet);
      const className = (0, _classnames2.default)(classes.root, classNameProp);

      return _react2.default.createElement(
        'table',
        _extends({ className }, other),
        children
      );
    },
  }]);

  return Table;
}(_react.Component));

Table.propTypes = {
  /**
   * Should be valid `<table>` children such as
   * `TableHeader` and `TableBody`.
   */
  children: _react.PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: _react.PropTypes.string,
};
Table.contextTypes = {
  styleManager: _react.PropTypes.object.isRequired,
};
Table.childContextTypes = { table: _react.PropTypes.object };
exports.default = Table;