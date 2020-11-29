export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    let toPath = to.name;

    if(toPath === 'login') {
      if(to.query.to) {
        next();
      }else {
        let fromPath = from ? from.fullPath : '/';
        next(`/login?to=${encodeURIComponent(fromPath)}`);
      }
      return;
    } 

    next()
  })
}