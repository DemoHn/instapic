import { configure, addParameters } from '@storybook/react'
// import global theme files
import 'semantic-ui-css/semantic.min.css'

const req = require.context('../src/components', true, /.stories.tsx$/);
const reqLayout = require.context('../src/layouts', true, /.stories.tsx$/);


function loadStories() {
  req.keys().forEach(req)
  reqLayout.keys().forEach(reqLayout)

  addParameters({ 
    viewport: {
      defaultViewport: 'iphone6'
    } 
  })
}
configure(loadStories, module)