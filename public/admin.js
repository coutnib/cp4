var app = new Vue({
  el: '#admin',
  data: {
  	title: "",
	file: null,
	story: "",
	addItem: null,
	items: [],
	findTitle: "",
	findItem: null,
	findStory: "",
  },
  created() {
  	this.getItems();
  },
  computed: {
	suggestions() {
		return this.suggestions = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
		}
	},
  methods: {
	async editItem(item) {
		try {
			let response = await axios.put("/api/items/" + item._id, {
				title: this.findItem.title,
				story: this.findItem.story,	
			});
			this.findItem = null;
			this.getItems();
			return true;
		} catch (error) {
		console.log(error);
		}
	},
	async deleteItem(item) {
		try {
			let response = axios.deleteOne("/api/items/" + item._id);
			this.findItem = null;
			this.getItems();
			return true;
		} catch (error) {
		console.log(error);
		}
	},
	selectItem(item) {
		this.findTitle = "";
		this.findItem = item;
		this.findStory = "";
	},
	async getItems() {
		try {
			let response = await axios.get("/api/items");
			this.items = response.data;
			return true;
		} catch (error) {
		console.log(error);
		}
	},
  	fileChanged(event) {
		this.file = event.target.files[0]
	},
	async upload() {
		try {
			const formData = new FormData();
			formData.append('photo', this.file, this.file.name)
			let r1 = await axios.post('/api/photos', formData);
			let r2 = await axios.post('/api/items', {
				title: this.title,
				path: r1.data.path,
				story: this.story,
			});
			this.addItem = r2.data;
		} catch (error) {
		console.log(error);
		}
	},
  }
});
