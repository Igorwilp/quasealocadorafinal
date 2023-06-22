<template>
    <q-dialog v-model="mostrarSinopseLocal">
      <q-card class="q-card2">
        <q-card-section>
          <h2>{{ filmeEscolhido.title }}</h2>
          <p>{{ filmeEscolhido.overview }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Fechar" color="primary" @click="fecharSinopse" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
    export default {
        props: {
            mostrarSinopse: Boolean,
            filmeEscolhido: Object,
        },
        data() {
            return {
                mostrarSinopseLocal: false,
                FilmeEscolhidoLocal: null,
            }
        },
        watch: {
            mostrarSinopse(value) {
                this.mostrarSinopseLocal = value;
            },
            filmeEscolhido(value) {
                this.filmeEscolhidoLocal = value;
            }
        },
        methods: {
            fecharSinopse() {
                this.$emit('fecharSinopse');
            }
        }
    }
</script>

<style>
 .q-card2 {
    max-width: 500px;
  }
</style>