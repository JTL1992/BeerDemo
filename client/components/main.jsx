MainLayout = React.createClass({
  render() {
    return (
      <div>
        <main>{this.props.component}</main>
        <Footer />
      </div>
    );
  }
});