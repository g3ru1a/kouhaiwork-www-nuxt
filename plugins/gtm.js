export default function({ $gtm, store }) {
	if(store.state.use_cookies){
        $gtm.init(process.env.gtmID);
    }
}
