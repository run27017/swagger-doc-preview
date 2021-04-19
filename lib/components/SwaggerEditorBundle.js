import deepMerge from "deepmerge"
import SwaggerUI from "swagger-ui"
import EditorLayout from "./layout"
import SwaggerEditor from "swagger-editor"
import 'swagger-editor/dist/swagger-editor.css'

const plugins = SwaggerEditor.plugins

const defaults = {
  layout: "EditorLayout",
  presets: [
    SwaggerUI.presets.apis
  ],
  plugins: [
    SwaggerEditor.plugins.EditorPlugin,
    SwaggerEditor.plugins.ValidateBasePlugin,
    SwaggerEditor.plugins.ValidateSemanticPlugin,
    SwaggerEditor.plugins.ValidateJsonSchemaPlugin,
    SwaggerEditor.plugins.EditorAutosuggestPlugin,
    SwaggerEditor.plugins.EditorAutosuggestSnippetsPlugin,
    SwaggerEditor.plugins.EditorAutosuggestKeywordsPlugin,
    SwaggerEditor.plugins.EditorAutosuggestRefsPlugin,
    SwaggerEditor.plugins.EditorAutosuggestOAS3KeywordsPlugin,
    SwaggerEditor.plugins.PerformancePlugin,
    SwaggerEditor.plugins.JumpToPathPlugin,
    SwaggerEditor.plugins.SplitPaneModePlugin,
    SwaggerEditor.plugins.ASTPlugin
  ],
  components: {
    EditorLayout
  },
  showExtensions: true,
  swagger2GeneratorUrl: "https://generator.swagger.io/api/swagger.json",
  oas3GeneratorUrl: "https://generator3.swagger.io/openapi.json",
  swagger2ConverterUrl: "https://converter.swagger.io/api/convert",
}

export default function SwaggerEditorBundle(options) {
  let mergedOptions = deepMerge(defaults, options)

  mergedOptions.presets = defaults.presets.concat(options.presets || [])
  mergedOptions.plugins = defaults.plugins.concat(options.plugins || [])
  return SwaggerUI(mergedOptions)
}
