"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_reactDropzone.default.displayName = "Dropzone"; // For testing

class EditorLayout extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onChange", (newYaml, origin = "editor") => {
      this.props.specActions.updateSpec(newYaml, origin);
    });

    _defineProperty(this, "onDrop", (acceptedFiles, rejectedFiles) => {
      const someFilesWereRejected = rejectedFiles && rejectedFiles.length > 0;
      const thereIsExactlyOneAcceptedFile = acceptedFiles && acceptedFiles.length === 1;

      if (someFilesWereRejected || !thereIsExactlyOneAcceptedFile) {
        alert("Sorry, there was an error processing your file.\nPlease drag and drop exactly one .yaml or .json OpenAPI definition file.");
      } else {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          const spec = reader.result;
          this.onChange(spec, "fileDrop");
        };

        reader.readAsText(file, "utf-8");
      }
    });
  }

  render() {
    const {
      getComponent
    } = this.props;
    const UIBaseLayout = getComponent("BaseLayout", true);
    const EditorContainer = getComponent("EditorContainer", true);
    const SplitPaneMode = getComponent("SplitPaneMode", true);
    const Container = getComponent("Container");
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "swagger-editor"
    }, /*#__PURE__*/_react.default.createElement(Container, {
      className: "container"
    }, /*#__PURE__*/_react.default.createElement(_reactDropzone.default, {
      className: "dropzone",
      accept: ".yaml,application/json",
      multiple: false,
      onDrop: this.onDrop,
      disablePreview: true,
      disableClick: true
    }, ({
      isDragActive
    }) => {
      if (isDragActive) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "dropzone__overlay"
        }, "Please drop a .yaml or .json OpenAPI spec.");
      } else {
        return /*#__PURE__*/_react.default.createElement(SplitPaneMode, null, /*#__PURE__*/_react.default.createElement(EditorContainer, {
          onChange: this.onChange
        }), /*#__PURE__*/_react.default.createElement(UIBaseLayout, null));
      }
    })));
  }

}

exports.default = EditorLayout;

_defineProperty(EditorLayout, "propTypes", {
  errSelectors: _propTypes.default.object.isRequired,
  errActions: _propTypes.default.object.isRequired,
  specActions: _propTypes.default.object.isRequired,
  getComponent: _propTypes.default.func.isRequired,
  layoutSelectors: _propTypes.default.object.isRequired,
  layoutActions: _propTypes.default.object.isRequired
});
