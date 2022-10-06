<template>
  <div class="container-fluid p-3">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <b-breadcrumb>
        <b-breadcrumb-item>Gestion de caisse OBF</b-breadcrumb-item>
        <b-breadcrumb-item>Entrée de caisse</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <div class="text-right" >
      <b-button variant="primary" @click="openModalFacture" >Saisir une nouvelle entrée</b-button>
    </div>
    <br>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        Entrée de caisse
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
              :items="listes"
              :fields="fields"
              :filter="filter"
              :current-page="currentPage"
              :per-page="perPage"
          >
            <template v-slot:cell(justif)="row">
              <span type="button" class="text-info" @click="openModalJustif(row.item.code_entre)" v-if="row.item.justif"><i class="fas fa-fw fa-folder"></i></span>
            </template>
            <template v-slot:cell(montant_entre_caisse)="row">
              <span class="text-right font-weight-bold">{{new Intl.NumberFormat().format(row.item.montant_entre_caisse)}} FCFA</span>
            </template>
            <template v-slot:custom-foot="data">
              <b-tr>
                <b-td colspan="5" class="text-uppercase text-right text-danger font-weight-bold">TOTAL</b-td>
                <b-td class="text-uppercase text-right text-danger font-weight-bold">{{new Intl.NumberFormat().format(totalListes)}} FCFA</b-td>
              </b-tr>
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

    <Facture ref="modalFacture"></Facture>
  </div>
</template>

<script>
const axios = require('axios')
import Facture from "@/components/entree/facture";
export default {
  name: "index",
  data(){
    return {
      filter :"",
      currentPage: 1,
      loader : false,
      perPage: 20,
      listes:[],
      totalListes:0,
      totalRows: null,
      fields:[
        { key: 'code_entre',
          label: 'Code',
          sortable: true
        },
        { key: 'date_entre',
          label: 'Date',
          sortable: true
        },
        { key: 'libelle_entre_caisse',
          label: 'Libelle / Source',
          sortable: true
        },
        { key: 'observation',
          sortable: true
        },
        { key: 'justif',
          label: 'Justification',
          class: 'text-center',
          sortable: true
        },
        { key: 'montant_entre_caisse',
          label: 'Montant',
          class: 'text-right',
          sortable: true
        },

      ],

    }
  },
  components: {
   Facture
  },
  created() {
    this.fetchclients()
    //localStorage.removeItem('matricule')
    Fire.$on('creationok',()=>{
      this.fetchclients();
    })

  },
  methods: {
    async fetchclients(){
      this.loader = false
      let api = 'http://gcaisse.test/api/listes_entre'
      await axios.get(api).then(response=>{
        let statut = response.status
        if (statut === 200){
          this.listes = response.data.listes
          this.totalListes = response.data.total
          this.totalRows = this.listes.length
          console.log(this.totalRows)
        }
      }).catch((err) => {
        console.log(err)
      })
      this.loader = true
    },

    openModalJustif(id){
      console.log(id)
    },
    openModalFacture(id) {
      this.$refs.modalFacture.showModalFacture()
    },

    mounted(){
      $(this.$refs.modalJustif).on("bv::modal::hide")
    }

  },

}
</script>

<style scoped>

</style>
