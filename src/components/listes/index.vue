<template>
  <div class="container-fluid p-3">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <b-breadcrumb>
        <b-breadcrumb-item>Gestion de caisse OBF</b-breadcrumb-item>
        <b-breadcrumb-item>Factures</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <br>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        Listes des factures
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
            <template v-slot:cell(total_payer)="row">
              {{new Intl.NumberFormat().format(row.item.total_payer)}} FCFA
            </template>
            <template v-slot:cell(montant_facture_entre)="row">
              {{new Intl.NumberFormat().format(row.item.montant_facture_entre)}} FCFA
            </template>
            <template v-slot:cell(reste_payer)="row">
              {{new Intl.NumberFormat().format(row.item.reste_payer)}} FCFA
            </template>
            <template v-slot:cell(actions)="row">
              <b-button
                  size="sm"
                  variant="outline-success"
                  class="mr-1"
                  @click="openModalVersement(row.item)"
                  v-if="row.item.reste_payer > 0"
              >
                faire un versement
              </b-button>
              <b-button
                  size="sm"
                  variant="outline-info"
                  class="mr-1"
              >
                listes des versements
              </b-button>
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
    <Versement ref="versementmodal"></Versement>
  </div>
</template>

<script>
const axios = require('axios')
import Versement from "@/components/listes/versement";
export default {
  name: "index",
  components : {
    Versement
  },
  data(){
    return {
      filter :"",
      all_clients:[],
      currentPage: 1,
      loader : false,
      perPage: 10,
      totalRows: null,
      selectedCode: null,
      fields : [
        {
          key:'code_facture_entre',
          label: 'Code Facture',
          sortable:true,
        },
        {
          key:'libelle_facture_entre',
          label: 'Libelle Facture',
          sortable:true,
        },
        {
          key:'date_facture_entre',
          label: 'Date facture',
          sortable:true,
        },
        {
          key:'montant_facture_entre',
          label: 'Montant Facture',
          sortable:true,
        },
        {
          key:'total_payer',
          label: 'Montant Total Versé',
          sortable:true,
        },
        {
          key:'reste_payer',
          label: 'Reste à payer',
          sortable:true,
        },

        {
          key: 'actions'
        }
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
      let api = 'http://127.0.0.1:8000/api/factures_caisses/'+this.$route.params.id
      await axios.get(api).then(response => {
        this.all_clients = response.data
      }).catch((err) => {
        console.log(err)
      })
      this.loader = true
    },
    openModalVersement(item) {
      this.$refs.versementmodal.item = item
      this.$refs.versementmodal.showModal()
    },
  }
}
</script>

<style scoped>

</style>
