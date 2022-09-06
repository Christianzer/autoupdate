<template>
  <b-modal ref="my-modal" size="lg" :hide-footer="true" :title="title">
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
            <b-form-input readonly v-model="formData.libelle"></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b-form-group
              label="Montant à payer">
            <b-form-input type="number" readonly v-model="formData.montant_paiement"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
              label="Versement">
            <b-form-input type="number" v-model="formData.versement"></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b-form-group
              label="Date versement">
            <b-form-datepicker
                placeholder="selectionner une date"
                locale="fr-FR"
                v-model="formData.date_paiement"
            >
            </b-form-datepicker>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
              label="Reste à payer">
            <b-form-input type="number" readonly v-model="monnaie"></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="row justify-content-end">
        <b-button variant="primary mr-1" type="submit">enregistrer</b-button>
        <b-button variant="danger mr-1" @click="closeModal">fermer</b-button>
      </div>
    </form>
  </b-modal>

</template>

<script>
import moment from "moment/moment";

const axios = require('axios')
export default {
  name: "versement",
  props: {
    item:{}
  },
  data() {
    return {
      apidata : 'http://127.0.0.1:8000/api/personne',
      selected : null,
      title:"Faire un versement",
      formData: {
        libelle: "",
        code_facture:'',
        versement:0,
        date_paiement:moment().format('YYYY-MM-DD'),
        montant_paiement:0,
        personne:null
      }
    }
  },
  methods: {
    showModal() {
      this.formData.personne = this.item.id_personne
      this.formData.code_facture = this.item.code_facture_entre
      this.formData.montant_paiement = this.item.reste_payer
      this.formData.libelle = this.item.libelle_facture_entre
      this.$refs['my-modal'].show()
    },
    closeModal() {
      this.$refs['my-modal'].hide()
    },
    async save(){
      var paiement = {
        personne: this.formData.personne,
        date_paiement : this.formData.date_paiement,
        code_facture : this.formData.code_facture,
        montant_paiement : this.formData.versement
      }
      await this.$http.post("http://127.0.0.1:8000/api/paiement",paiement).then(response=>{
        let statut = response.status
        if (statut === 201){
          Fire.$emit('paiement');
          this.closeModal()//custom events
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  computed : {
    monnaie() {
      let val = 0;
      val = this.formData.montant_paiement - this.formData.versement;
      if (val >= 0) {
        return val;
      } else {
        return 0;
      }
    },
  }

}
</script>

<style scoped>

</style>
