const state = {
    name:'',
    isAdmin: 0,
    userHead:''
}

const mutations = {
    getUserName(state,data){
        state.name = data.name
        state.isAdmin = data.isAdmin
        state.userHead = data.userHead
    },
    updateUserHead(state,data){
        state.userHead = data.userHead
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}