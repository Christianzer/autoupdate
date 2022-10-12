<template>
  <div class="container-fluid p-3">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <b-breadcrumb>
        <b-breadcrumb-item>Gestion de caisse OBF</b-breadcrumb-item>
        <b-breadcrumb-item>Tableau de bord</b-breadcrumb-item>
      </b-breadcrumb>
    </div>

    <template v-if="isLoading === false">
      <div class="row">
        <div class="col-md-12">
          <div class="text-center">
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="col-xl-3 col-md-3 mb-4">
          <div class="card border-left-success-perso shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs-perso font-weight-bold text-primary text-uppercase mb-1">Entree de caisse</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">{{dashboard.entree}} FCFA</div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-3 mb-4">
          <div class="card border-left-success-perso shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs-perso font-weight-bold text-primary text-uppercase mb-1">Sortie de caisse</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">{{dashboard.sortie}} FCFA</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
const axios = require('axios')
//import moment from "moment";
export default {
  name: "index",
  data(){
    return {
      isLoading : false,
      dashboard : []
    }
  },
  methods:{
    async fetchdata(){
      this.isLoading = false
      await this.$http.get("http://127.0.0.1:8000/api/dashboard").then((response) => {
        this.dashboard = response.data
      }).catch((err) => {
        console.log(err)
      })
      this.isLoading = true
    },
  },
  created() {
    this.fetchdata()
  },

}
</script>

<style scoped>
.border-left-success-perso {
  border-left: 0.50rem solid #1cc88a !important;
}
.text-xs-perso {
  font-size: .8rem;
}

</style>
