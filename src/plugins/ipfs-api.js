import ipfsClient from 'ipfs-http-client'

const plugin = {
    install(Vue, address = '/ip4/127.0.0.1/tcp/5001') {
        Vue.prototype.$ipfs = ipfsClient(address);
    },
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}

export default plugin
