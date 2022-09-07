<template>
  <b-modal ref="my-modal-facture" size="lg" :hide-footer="true" :title="title">
    <form @submit.prevent="save">
      <div class="row">
        <div class="col-md-6">
          <b-form-group
              label="Motif">
            <b-form-input v-model="formData.libelle"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
              label="Observation">
            <b-form-input v-model="formData.observation"></b-form-input>
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
                v-model="formData.date_facture"
            >
            </b-form-datepicker>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
              label="Montant versement">
            <b-form-input type="number" v-model="formData.montant"></b-form-input>
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
      apidata: 'http://127.0.0.1:8000/api/personne',
      selected: null,
      title: "Mise à jour facture",
      formData: {
        libelle: "",
        date_facture: moment().format('YYYY-MM-DD'),
        observation: '',
        montant: 0,
        personne: this.personne
      }
    }
  },
  methods: {
    showModalFacture() {
      this.formData.personne = this.personne
      this.$refs['my-modal-facture'].show()
    },
    closeModalFacture() {
      this.reset()
      this.$refs['my-modal-facture'].hide()
    },
    generateCode() {
      var suffixe = Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      var facture = 'FACTGCOBF' + suffixe
      return facture.toUpperCase()
    },
    async enregistrer() {
    },
    async save() {

      var paiement = {
        personne: this.formData.personne,
        libelle: this.formData.libelle,
        date_sortie: this.formData.date_facture,
        observation: this.formData.observation,
        montant: this.formData.montant
      }

      await this.$http.post("http://127.0.0.1:8000/api/sortie", paiement).then(response => {
        this.closeModalFacture()
      }).catch((err) => {
        console.log(err)
      })


    },
    reset() {
      this.formData.libelle = ''
      this.formData.date_facture = moment().format('YYYY-MM-DD')
      this.formData.montant = 0
      this.formData.observation = ''
    }
  },
}
</script>