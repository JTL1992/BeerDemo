JobsList = React.createClass({
  //mixins: [ReactMeteorData],

  getInitialState() {
    // save the searchQuery if the user has searched for something
    let searchQuery = '';
    if (window.location.hash.length !== 0) {
      searchQuery = window.location.hash.substring(1);
    }
    return {
      searchQuery: searchQuery,
      jobLimit: parseInt(this.props.limit) || this.increment()
    };
  },

  getMeteorData() {
    let jobsSubscription = Meteor.subscribe('jobs', this.state.searchQuery, this.state.jobLimit);
    // sort jobs by score if a searchQuery is entered
    let jobs = (this.state.searchQuery !== '' ? Jobs.find({}, { sort: [['score', 'desc']] }).fetch() : Jobs.find({}, { sort: { createdAt: -1 } }).fetch());
    return {
      subscription: jobsSubscription,
      jobs: jobs
    };
  },

  searchJobs(event) {
    event.preventDefault();
      /*var city = React.getElementById('search-query-city').value;*/
    var city = React.findDOMNode(this.refs.searchQueryCity).value.trim();
    var key = React.findDOMNode(this.refs.searchQueryKey).value.trim();
    var router = '/jobs/search?city='+city+'&key='+key;
    FlowRouter.go(router);
  },

  watchSearchQuery(event) {
    event.preventDefault();
    let searchQuery = document.getElementById('search-query').value;
    // store the searchQuery in the hash
    window.location.hash = searchQuery;
    // reset the searchQuery-Variable if nothing is entered
    if (searchQuery.length === 0) {
      this.setState({ searchQuery: '' });
    }
    console.log('fdsafajkflsajf')
  },

  increment() {
    return 20;
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.filter !== this.props.filter) {
      this.setState({jobLimit: nextProps.limit});
    }
  },

  jobItems() {
    return _.map(this.data.jobs, (job) => {
      return <JobItem job={job}/>;
    });
  },

  loadMore() {
    if(Jobs.find({}, { limit: this.jobLimit }).count() === this.state.jobLimit) {
      return <a className="button u-full-width" onClick={this.onLoadMore}>Load more</a>;
    }
  },

  onLoadMore() {
    this.setState({ jobLimit: this.state.jobLimit + this.increment() });
  },

  componentDidMount() {
    if (window.location.hash.length !== 0) {
      document.getElementById('search-query').value = this.state.searchQuery;
    }
  },
  getBuscador(){
    //if (window.location.hash.length !== 0) {
      var city = document.getElementById('search-query').value;
      var key = this.document.getElementById('search-query').value;
    return city+key;
    //}
  },
    handleClick(){
       if(this.myCity != null && this.myKey != null){
           var city = React.findDOMNode(this.myCity).value.trim();
           var key = React.findDOMNode(this.myKey).value.trim();
           console.log(city,key);
           var router = '/jobs/search?city='+city+'&key='+key;
           FlowRouter.go(router);
       }else {
           window.alert("please fill a city and teacher");
       }
    },
  render() {
    return (
        <div>
        <div className="container">
          <h2 id="subtitulo" className="text-center">Teaching for a better world</h2>
        </div>
        <div className="container">
          <div className="bloque">
            <div className="row">
              <div className="col-sx-12 col-sm-5 col-md-2 col-lg-2">
                <form >
                  <input type="text" ref={(ref) => this.myCity = ref} id="search-query" className="twelve columns" placeholder="City, State... " />
                </form>
              </div>
              <div className="col-sx-12 col-sm-5 col-md-8 col-lg-8">
                <form >
                  <input type="text" ref={(ref) => this.myKey = ref} id="search-query" className="twelve columns" placeholder="Enter a job..." />
                </form>
              </div>
              <div className="col-sx-12 col-sm-2 col-md-2 col-lg-2">
                 <a className="button add-job twelve columns"  onClick={this.handleClick}>Search</a>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }
});