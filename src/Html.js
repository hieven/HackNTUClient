import React, {Component, PropTypes} from 'react';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';
const cdn = '//cdnjs.cloudflare.com/ajax/libs/';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  }

  render() {
    const {assets, component, store} = this.props;
    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          {DocumentMeta.rewind({asReact: true})}
          <meta name="viewport" content="width=device-width;minimum-scale=0.5,maximum-scale=1.0; user-scalable=1;" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link href={cdn + 'materialize/0.97.0/css/materialize.min.css'}
                media="screen, projection" rel="stylesheet" type="text/css" />
          <link href={cdn + 'font-awesome/4.3.0/css/font-awesome.min.css'}
                media="screen, projection" rel="stylesheet" type="text/css" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, i) =>
            <link href={assets.styles[style]} key={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>
          )}

        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(component)}}/>

          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} />
          <script src="//code.jquery.com/jquery-2.1.4.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/js/materialize.min.js"></script>
          <script src="http://code.highcharts.com/highcharts.js"></script>
          <script src="http://code.highcharts.com/modules/data.js"></script>
          <script src="http://code.highcharts.com/modules/drilldown.js"></script>
          <script src="https://dl.dropboxusercontent.com/u/100126980/nome-0.1.9.js"></script>
          <script src={assets.javascript.main}/>
        </body>
      </html>
    );
  }
}
