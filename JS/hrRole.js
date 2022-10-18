app = Vue.createApp({
    data() {
        return {
            roleDict: []
        }
    },

    created() {
        this.getAllRole()
        console.log('testing')
    },

    methods: {
        getAllRole() {
            allRoleUrl = "../db/getAllRoles.php"

            axios.get(allRoleUrl).then(response => {
                var allRole = response.data
                console.log(allRole)
            })

        }
    }
})

const vm = app.mount('#hrRole')