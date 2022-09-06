<template>
  <b-modal ref="my-modal-facture" size="lg" :hide-footer="true" :title="title">
    <form @submit.prevent="save">
      <div class="row">
        <div class="col-md-6">
          <b-form-group
              label="Code facture">
            <b-form-input readonly v-model="formData.code_facture"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
              label="Libelle facture">
            <b-form-input v-model="formData.libelle"></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b-form-group
              label="Date facture">
            <b-form-datepicker
                placeholder="selectionner une date"
                locale="fr-FR"
                v-model="formData.date_facture"
            >
            </b-form-datepicker>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
              label="Montant facture">
            <b-form-input type="number" v-model="formData.montant"></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b-form-group
              label="Monatant payé">
            <b-form-input type="number" v-model="formData.montant_paiement"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
              label="Reste à payer">
            <b-form-input type="number" readonly v-model="monnaie"></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b-form-group
              label="Date paiement">
            <b-form-datepicker
                placeholder="selectionner une date"
                locale="fr-FR"
                v-model="formData.date_paiement"
            >
            </b-form-datepicker>
          </b-form-group>
        </div>
      </div>
      <div class="row justify-content-end">
        <b-button variant="primary mr-1" type="submit">enregistrer</b-button>
        <b-button variant="danger mr-1" @click="closeModalFacture">fermer</b-button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "facture",
  props: {
    personne: null,
  },
  data() {
    return {
      apidata : 'http://127.0.0.1:8000/api/personne',
      selected : null,
      title:"Mise à jour facture",
      formData: {
        libelle: "",
        date_facture:moment().format('YYYY-MM-DD'),
        code_facture:'',
        montant:0,
        date_paiement:moment().format('YYYY-MM-DD'),
        montant_paiement:0,
        personne:this.personne
      }
    }
  },
  methods: {
    showModalFacture() {
      this.formData.personne = this.personne
      this.formData.code_facture = this.generateCode()
      this.$refs['my-modal-facture'].show()
    },
    closeModalFacture() {
      this.reset()
      this.$refs['my-modal-facture'].hide()
    },
    generateCode(){
        var suffixe = Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        var facture = 'FACTGCOBF'+suffixe
        return facture.toUpperCase()
    },
    async enregistrer(){},
    async save(){
      var data_facture = {
        libelle: this.formData.libelle,
        date_facture : this.formData.date_facture,
        code_facture : this.formData.code_facture,
        montant : this.formData.montant
      }
      var paiement = {
        personne: this.formData.personne,
        date_paiement : this.formData.date_paiement,
        code_facture : this.formData.code_facture,
        montant_paiement : this.formData.montant_paiement
      }
      await this.$http.post("http://127.0.0.1:8000/api/facture",data_facture).then(response=>{
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
      await this.$http.post("http://127.0.0.1:8000/api/paiement",paiement).then(response=>{
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
      this.closeModalFacture()
    },
    reset(){
      this.formData.libelle = ''
      this.formData.date_facture = moment().format('YYYY-MM-DD')
      this.formData.code_facture = ''
      this.formData.montant = 0
      this.formData.date_paiement = moment().format('YYYY-MM-DD')
      this.formData.montant_paiement = 0
    }
  },
  computed : {
    monnaie() {
      let val = 0;
      val = this.formData.montant - this.formData.montant_paiement ;
      if (val>=0){
        return val;
      }else{
        return 0;
      }
    },
  }

}
</script>

<style scoped>

</style>