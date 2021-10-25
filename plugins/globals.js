export default ({ app }, inject) => {
	inject("mediaPage", pageurl => {
		let apiUrlWV = process.env.apiURL;
		let apiurl = apiUrlWV.substring(0, apiUrlWV.length - 3) + "storage/";
		return apiurl + pageurl;
	});
};
