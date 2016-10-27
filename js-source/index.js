const React = require('react');
const ReactDOM = require('react-dom');
// const SlideShow = require('./components/slideshow');
const SlideGraph = require('./containers/slideGraph')
// let annotations = [
//   'I am an annotation. Fear me. Hopefully this line breaks properly because that would make my life easier.',
//   'Test annotation 2. This is where you would put some kind of helpful/interesting information for whoever is reading your chart.',
//   'Test annotation 3. This is where you would put some kind of helpful/interesting information for whoever is reading your chart.',
//   'Test annotation 4. This is where you would put some kind of helpful/interesting information for whoever is reading your chart.',
//   'Test annotation 5. This is where you would put some kind of helpful/interesting information for whoever is reading your chart.',
//   'Test annotation 6. This is where you would put some kind of helpful/interesting information for whoever is reading your chart.',
//   'Test annotation 7. This is where you would put some kind of helpful/interesting information for whoever is reading your chart.',
//   'Test annotation 8. This is where you would put some kind of helpful/interesting information for whoever is reading your chart.',
//   'Test annotation 9. This is where you would put some kind of helpful/interesting information for whoever is reading your chart.',
//   'Test annotation 10. This is where you would put some kind of helpful/interesting information for whoever is reading your chart.',
//   'Test annotation 11. This is where you would put some kind of helpful/interesting information for whoever is reading your chart.'
// ];
let annotations = [
  {
    annotation: 'this will be at index zero',
    position: 0
  },
  {
    annotation: 'one',
    position: 1
  },
  {
    annotation: 'heh',
    position: 5
  },
  {
    annotation: 'two',
    position: 7
  },
  {
    annotation: 'three',
    position: 9
  }
];
let showLength = annotations.length;
ReactDOM.render(
  <SlideGraph
    annotations={annotations}
    showLength={showLength}
    width={600}
  />,
  document.getElementById('app')
);
