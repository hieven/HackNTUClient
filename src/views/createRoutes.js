import React        from 'react';
import {Route}      from 'react-router';
import App          from 'views/App';
import Mood         from 'views/Mood';
import MoodDepict   from 'views/MoodDepict';
import DailyReport  from 'views/DailyReport';
import WeeklyReport from 'views/WeeklyReport';
import Login        from 'views/Login';
import Register     from 'views/Register';
import RequireLogin from 'views/RequireLogin';
import LoginSuccess from 'views/LoginSuccess';
import NotFound     from 'views/NotFound';

export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={Mood} />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route component={RequireLogin} onEnter={RequireLogin.onEnter(store)}>
        <Route path="/mood/:emotion" component={MoodDepict} />
        <Route path="/mood/:id/dailyReport" component={DailyReport} />
        <Route path="/mood/:id/weeklyReport" component={WeeklyReport} />
        <Route path="/loginSuccess" component={LoginSuccess}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
