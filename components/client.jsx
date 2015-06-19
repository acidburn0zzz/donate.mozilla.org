import React from 'react';
import Router from 'react-router';
import { currencies } from '../scripts/currencies.js';
import { routes } from './routes.jsx';
import {locales} from '../locales';


Router.run(routes, Router.HistoryLocation, function (Handler, state) {
	var values = {};
	if(state.params.currencies) {
		values = currencies[state.params.currency];
	}
	if(state.params.locale) {
	  values = Object.assign(values, {messages: require('../locales/' + state.params.locale +'.json')});
	} else {
		values = Object.assign(values, {messages: require('../locales/en.json')});
	}
	console.log(values)
  React.render(<Handler {...values} />, document.querySelector("#my-app"));
});
