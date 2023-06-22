<template>
  <q-drawer v-model="mostrarCarrinhoLocal" side="right">
    <h4>Seu Carrinho</h4>
    <div>
      <div v-for="item in cartStore.cartItems" :key="item.id" style="margin-right: 20px;">
        <p>{{ item.title }}</p>
        <p>R$: 9.99</p>
        <p>Quantidade:{{ item.quantity }}</p>
        <q-btn @click="removerDoCarrinho(item)" label="Remover Filme"/>
      </div>
      <p>Total: R${{ cartStore.precoTotal }}</p>
      <q-btn class="botaoLimpar" @click="cartStore.limparCarrinho" label="Limpar carrinho"/>
      <q-btn class="botaoAlugar" @click="alugarFilmes"  label="Alugar"/>
      <q-btn class="botaoFechar" @click="fecharCarrinho" label="Fechar"/>
    </div>
  </q-drawer>  
</template>

<script>
import { useCartStore } from 'src/stores/cart';

export default {
  props: {
    mostrarCarrinho: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    mostrarCarrinho(value) {
      this.mostrarCarrinhoLocal = value
    }
  },
  setup() {
    const cartStore = useCartStore();
    return {
      cartStore
    }
  },
  computed: {
    cartItems() {
      return useCartStore().cartItems
    },
    precoTotal() {
      return useCartStore().precoTotal
    }
  },
  methods: {
    fecharCarrinho() {
      this.$emit('fechar')
    },
    removerDoCarrinho(item) {
      useCartStore().removerDoCarrinho(item)
    },
    limparCarrinho() {
      useCartStore().limparCarrinho()
    },
    alugarFilmes() {
      alert('Compra realizada com sucesso!');
      useCartStore().limparCarrinho()
    }
  }
}
</script>

<style>

  .botaoLimpar {
    width: 200px;
    height: 20px;
    margin-bottom: 20px;
  }

  .botaoAlugar {
    width: 200px;
    height: 20px;
    margin-bottom: 20px;
  }

  .botaoFechar {
    width: 200px;
    height: 20px;
  }

</style>