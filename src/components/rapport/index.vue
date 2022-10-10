<template>
  <div class="container-fluid p-3">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <b-breadcrumb>
        <b-breadcrumb-item>Gestion de caisse OBF</b-breadcrumb-item>
        <b-breadcrumb-item>Rapport de caisse</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        Période de recherche
      </div>
      <div class="card-body">
        <form @submit.prevent="search">
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                  label="Date debut">
                <b-form-datepicker
                    placeholder="selectionner une date"
                    locale="fr-FR"
                    v-model="formData.date_debut"
                >
                </b-form-datepicker>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                  label="Date fin">
                <b-form-datepicker
                    placeholder="selectionner une date"
                    locale="fr-FR"
                    v-model="formData.date_fin"
                >
                </b-form-datepicker>
              </b-form-group>
            </div>
          </div>
          <div class="row justify-content-end">
            <b-button variant="primary mr-1" type="submit">Valider</b-button>
          </div>
        </form>
      </div>

    </div>
    <div class="card shadow mb-4" v-if="open === true">
      <div class="card-body">
        <template v-if="loader === false">
          <div class="text-center">
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
          </div>
        </template>
        <template v-else>
          <b-table-simple  bordered
                           hover
                           responsive="xl" >
            <b-thead>
              <b-tr>
                <b-th rowspan="2">Date</b-th>
                <b-th colspan="2">Entrée de caisse</b-th>
                <b-th colspan="2">Sortie de caisse</b-th>

              </b-tr>
              <b-tr>

                <b-th>Libelle</b-th>
                <b-th>Montant FCFA</b-th>
                <b-th>Libelle</b-th>
                <b-th>Montant FCFA</b-th>

              </b-tr>
            </b-thead>

            <b-tbody>
              <b-tr v-for="item in element" :key="element.id_rapport">
                <b-td v-if="item.date_entre === null && item.date_sortie != null">{{changerDate(item.date_sortie)}}</b-td>
                <b-td v-if="item.date_sortie === null && item.date_entre != null">{{changerDate(item.date_entre)}}</b-td>
                <b-td v-if="item.date_entre  != null && item.date_sortie != null">{{changerDate(item.date_entre)}}</b-td>
                <b-td>{{item.libelle_entre_caisse}}</b-td>
                <b-td>{{new Intl.NumberFormat().format(item.montant_entre_caisse)}}</b-td>
                <b-td>{{item.libelle_sortie_caisse}}</b-td>
                <b-td>{{new Intl.NumberFormat().format(item.montant_sortie_caisse)}}</b-td>

              </b-tr>
            </b-tbody>
            <b-tfoot>
              <b-tr class="text-right font-weight-bold text-danger">
                <b-td>TOTAL FCFA</b-td>
                <b-td colspan="2">{{new Intl.NumberFormat().format(total1)}}</b-td>
                <b-td colspan="2">{{new Intl.NumberFormat().format(total2)}}</b-td>

              </b-tr>
            </b-tfoot>
          </b-table-simple>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import moment from "moment/moment";

export default {
  name: "index",
  data() {
    return {
      apidata : 'http://gcaisse.test/api/facture',
      formData: {
        date_debut:moment().format('YYYY-MM-DD'),
        date_fin:moment().format('YYYY-MM-DD'),
      },
      element:[],
      total1:0,
      total2:0,
      open:false,
      title : '',
      loader:false
    }
  },
  methods: {
    async search(){
      this.open = true
      this.loader = false
      let data = {
        date_debut : this.formData.date_debut,
        date_fin:this.formData.date_fin
      }
      await this.$http.post("http://gcaisse.test/api/rapport",data).then(response=>{
        this.element = response.data.resultat
        this.total1 = response.data.entree
        this.total2 = response.data.sortie
      }).catch((err) => {
        console.log(err)
      })
      this.loader = true
    },
    changerDate(value){
      return moment(value).format("DD-MM-YYYY")
    }
  }
}
</script>

<style scoped>

</style>