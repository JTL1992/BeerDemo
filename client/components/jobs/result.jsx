/**
 * Created by nuonuo-jtl on 19/03/16.
 */
Result = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        let jobsSubscription = Meteor.subscribe('search', Session.get('city'), Session.get('key'));
        console.log(Session.get('city')+"   "+Session.get('key'))
        // sort jobs by score if a searchQuery is entered
        let jobs = (Session.get('key') !== '' ? Jobs.find({title: {$regex: Session.get('key')}}).fetch() : Jobs.find({}, { sort: { createdAt: -1 } }).fetch());
        return {
            subscription: jobsSubscription,
            jobs: jobs
        };
    },
    jobItems() {
        return _.map(this.data.jobs, (job) => {
            return <JobItem job={job}/>;
        });
    },

    loadMore() {
        if(Jobs.find({}, { limit: this.jobLimit }).count() === 0) {
            return <a className="button u-full-width" onClick={this.onLoadMore}>Load more</a>;
        }
    },
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="twelve columns">
                        {this.jobItems().length ? (
                            this.jobItems()
                        ) : <div className="alert danger">Actualmente no hay trabajos para mostrar.</div> }
                    </div>
                </div>
                <div className="row">
                    <div className="twelve columns">
                       /* {this.loadMore()}*/
                    </div>
                </div>
            </div>
        );
    }
});