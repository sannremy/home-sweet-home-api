var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html className="no-js">
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <title>{this.props.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300:400,700" rel="stylesheet" />
            <link rel="stylesheet" href="/static/styles/main.css" />
        </head>

        <body>
            <div className="Site">
              {this.props.children}
            </div>
            <script src="/static/scripts/main.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;
