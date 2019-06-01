import { configure } from '@storybook/react'
// import global theme files
import 'semantic-ui-css/semantic.min.css'

const req = require.context('../src/components', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(req)
}
configure(loadStories, module)