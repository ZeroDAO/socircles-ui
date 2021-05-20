// import Vue from 'vue'
import localstorage from '@/util/localstorage';
import { post } from "@/util/http";

// Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        nonceList: []
    },

    mutations: {
        SET_NONCE_LIST: (state, payload) => {
            state.nonceList = payload;
        }
    },
    actions: {
        SetNonceList({
            commit
        }) {
            return new Promise((resolve, reject) => {
                if (!this.state.nonceList.lenght) {
                    post("sys/list")
                    .then((res)=>{
                        commit('SET_NONCE_LIST', res);
                        const sysInfo = localstorage.fetch('SYS_INFO');
                        // 如果sysInfo过旧则删除
                        if (sysInfo.status && sysInfo.data.nonce < res[0].nonce) {
                            localstorage.remove('SYS_INFO');
                        }
                        resolve(res[0].nonce)
                    })
                    .catch(error => {
                        reject(error)
                    })
                }
            })
        }
    }
})
