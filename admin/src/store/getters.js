export default ({
    users: state => state.user.users,
    tags: state => state.tag.tags,
    activeIndex: state => state.tag.activeIndex,
    mainColor: state => state.theme.mainColor,
    // variables: state => state.theme.variables
    routerList: state => state.routes.routerList
})