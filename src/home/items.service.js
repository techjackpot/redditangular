class ItemsService {
	/*@ngInject*/
	constructor($http, $q) {
		this.$http = $http;
		this.$q = $q;
	}

	getItems() {
		return this.$q.resolve(this.$http.get('https://www.reddit.com/r/all.json'));
	}
}

export default ItemsService;