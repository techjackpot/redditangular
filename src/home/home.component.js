var moment = require('moment');

class HomeController {
	/*@ngInject*/
	constructor(ItemsService) {
		this.itemsService = ItemsService;
		this.items = [];
		this.currentTime = new Date().getTime();
	}

	ValidURL(s) {
	   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	   return regexp.test(s);
	}

	$onInit() {
		this.itemsService
			.getItems()
			.then((response) => this.items = response.data.data.children.map((item) => {
				return {
					ups: item.data.ups,
					url: item.data.url,
					preview: this.ValidURL(item.data.thumbnail)?item.data.thumbnail:null,
					title: item.data.title,
					comments: item.data.num_comments,
					author: item.data.author,
					to: item.data.subreddit_name_prefixed,
					created: moment(item.data.created_utc*1000).fromNow()
				};
			}));
	}
}

const homeComponent = {
	template: require('./home.html'),
	controller: HomeController
};

export default homeComponent;