<template>
  <div class="container-fluid p-3">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <b-breadcrumb>
        <b-breadcrumb-item>Gestion de caisse OBF</b-breadcrumb-item>
        <b-breadcrumb-item>Listes des versements </b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <br>
    <div class="card shadow mb-4">
      <div class="card-header py-3 font-weight-bold text-danger text-uppercase">
       Versement factures : {{title.libelle_facture_entre}}
      </div>
      <div class="card-body">
        <template v-if="loader === false">
          <div class="text-center">
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
          </div>
        </template>
        <template v-else>
          <b-col md="3" align="right">
            <b-form-input type="search" id="filterInput" v-model="filter" placeholder="Rechercher....."></b-form-input>
          </b-col>
          <br>
          <b-table
              head-variant="light"
              bordered
              hover
              responsive="xl"
              :items="all_clients"
              :fields="fields"
              :filter="filter"
              :current-page="currentPage"
              :per-page="perPage"
          >
            <template v-slot:cell(montant_paiement)="row">
              {{new Intl.NumberFormat().format(row.item.montant_paiement)}} FCFA
            </template>
          </b-table>
          <b-pagination
              :total-rows="totalRows"
              :per-page="perPage"
              v-model="currentPage"
              class="my-0 pagination-sm"
          />
        </template>
      </div>

    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data(){
    return {
      filter :"",
      title : "",
      all_clients:[],
      currentPage: 1,
      loader : false,
      perPage: 10,
      totalRows: null,
      selectedCode: null,
      fields : [


        {
          key:'montant_paiement',
          label: 'Versement',
          sortable:true,
        },
        {
          key:'date_montant_paiement',
          label: 'Date versement',
          sortable:true,
        },

      ]
    }
  },
  created() {
    this.fetchclients()
    //localStorage.removeItem('matricule')
    Fire.$on('paiement',()=>{
      this.fetchclients();
    })

  },
  methods: {
    async fetchclients() {
      this.loader = false
      let api = 'http://gcaisse.test/api/versements/'+this.$route.params.id
      await axios.get(api).then(response => {
        console.log(response.data)
        this.all_clients = response.data.listes_paiement
        this.title = response.data.info
      }).catch((err) => {
        console.log(err)
      })
      this.loader = true
    },
  }
}
</script>

<style scoped>

</style>