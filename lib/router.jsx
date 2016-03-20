FlowRouter.route('/', {
  name: 'home',
  action: () => {
    renderMainLayoutWith(<JobsList />);
    setTitle('Jobs');
  }
});

FlowRouter.route('/jobs/add', {
  name: 'addJob',
  action: () => {
    renderMainLayoutWith(<AddJob />);
    setTitle('Add job');
  }
});

FlowRouter.route('/current', {
  name: 'currentJobs',
  action: () => {
    renderMainLayoutWith(<CurrentJobs />);
    setTitle('Current Jobs');
  }
});

FlowRouter.route('/teachers', {
  name: 'teachers',
  action: () => {
    renderMainLayoutWith(<TeachersCv />);
    setTitle('Teachers');
  }
});

FlowRouter.route('/exchange', {
  name: 'exchange',
  action: () => {
    renderMainLayoutWith(<Exchange />);
    setTitle('Linguistic <Exchange></Exchange>');
  }
});

FlowRouter.route('/job/:slug/:_id', {
  name: 'showJob',
  action: (params) => {
    renderMainLayoutWith((<ShowJob {...params} />));
    var jobTitle = 'Job';
    Tracker.autorun(() => {
      if (Jobs.findOne()) {
        jobTitle = (Jobs.findOne().title);
      }
      setTitle(jobTitle);
    });
  }
});

FlowRouter.route('/jobs/:identifier/activate', {
  name: 'activateJob',
  action: (params) => {
    renderMainLayoutWith(<ActivateJob {...params} />);
    setTitle('Activating job');
  }
});

FlowRouter.route('/jobs/:identifier/remove', {
  name: 'removeJob',
  action: (params) => {
    renderMainLayoutWith(<RemoveJob {...params}/>);
    setTitle('Removing job');
  }
});

FlowRouter.route('/jobs/:identifier/update', {
  name: 'updateJob',
  action: (params) => {
    renderMainLayoutWith(<UpdateJob {...params}/>);
    setTitle('Update job');
  }
});
FlowRouter.route('/jobs/search',{
  name: 'searchjob',
  //subscriptions: (queryParams) =>{
  //  this.register('search', Meteor.subscribe('search',queryParams.city,queryParams.key));
  //  console.log(queryParams.city+"   "
  //        +queryParams.key);
  //},
  action:(params,queryParams)=>{
    //this.register('search', Meteor.subscribe('search',queryParams.city,queryParams.key));
    console.log(queryParams.city+"   "
        +queryParams.key);
    Session.set('city',queryParams.city);
    Session.set('key',queryParams.key);
    ReactLayout.render(MainLayout,{component: <Result {...queryParams}/>});
    //renderMainLayoutWith(<Result {...params}/>);
    setTitle("result")
  }
  //action: (params,queryParams) =>{
  //  console.log(queryParams.city+"   "
  //      +queryParams.key);
  //  Meteor.subscribe("search",queryParams.city,queryParams.key);
  //  ReactLayout.render(MainLayout,{component: <Result />});
  //  console.log(queryParams.city+"   "
  //      +queryParams.key);
  // }
});
let renderMainLayoutWith = (component) => {
  ReactLayout.render(MainLayout, {
    component: component
  });
};
