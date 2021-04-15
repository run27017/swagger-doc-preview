import deepMerge from 'deepmerge'
import SwaggerUI from 'swagger-ui'
import SwaggerEditor from 'swagger-editor'
import 'swagger-ui/dist/swagger-ui.css'

const defaults = {
  presets: [
    SwaggerUI.presets.apis
  ],
  plugins: [],
  showExtensions: true,
}

export default function SwaggerUIBundle(options) {
  let mergedOptions = deepMerge(defaults, options)

  mergedOptions.presets = defaults.presets.concat(options.presets || [])
  mergedOptions.plugins = defaults.plugins.concat(options.plugins || [])
  if (options.showErrors) {
    mergedOptions.plugins = mergedOptions.plugins.concat([
      SwaggerEditor.plugins.ValidateBasePlugin,
      SwaggerEditor.plugins.ValidateSemanticPlugin,
      SwaggerEditor.plugins.ValidateJsonSchemaPlugin
    ])
  }
  return SwaggerUI(mergedOptions)
}
