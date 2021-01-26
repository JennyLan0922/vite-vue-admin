const getters = {
	getToken:(state:{user: {token: string}}) => {
		return state.user.token
	},
	getMenus:(state:{user: {menus: []}}) => {
		return state.user.menus
	}
}

export default getters