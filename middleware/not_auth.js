export default function ({ store, redirect  }) {
    if(store.authenticated) return redirect('/');
}