JobItem = React.createClass({
  createdAt() {
    return moment(this.props.job.createdAt).format('L');
  },

  jobPath() {
    return FlowRouter.path('showJob', { slug: this.props.job.slug, _id: this.props.job._id });
  },

  render() {
    let jobPath = FlowRouter.path('showJob', this.props.job);
    return (
      <div>
        <div className="alert jobs">
          <div className="row">
            <div className="twelve columns headline">
              <a className="title" href={this.jobPath()}>{this.props.job.title}</a>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="three columns">
              <i className="fa fa-calendar-check-o"></i><span className="created-at">Posted on: {this.createdAt()}</span>
            </div>
            <div className="nine columns left">
              <span className="created-at">{this.props.job.description}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
