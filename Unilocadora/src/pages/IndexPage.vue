<template>
  <div class="container">
    <div class="header">
      <div class="header-texto">
        <h3>Locadora</h3>
      </div>
      <q-btn color="black" label="Abrir carrinho" @click="mostrarCarrinho = true"/>
      <q-btn class="logout-btn" color="negative" label="Sair" @click="logout" />
    </div>
    <div>
      <h4>Filmes disponíveis:</h4>
      <div class="row justify-evenly">
        <FilmeCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @abrirSinopse="abrirSinopse"
        @addCarrinho="addCarrinho"
        />
        <SinopseFilme
        :mostrarSinopse="mostrarSinopse"
        :filmeEscolhido="filmeEscolhido"
        @fecharSinopse="fecharSinopse"
        />
      </div>
      
      <CarrinhoDrawer
      v-model="mostrarCarrinho"
      :cart-store="cartStore"
      @fechar="mostrarCarrinho = false"
      />
    </div>
  </div>
</template>

<script>
import CarrinhoDrawer from 'src/components/CarrinhoDrawer.vue';
import FilmeCard from 'src/components/FilmeCard.vue';
import SinopseFilme from 'src/components/SinopseFilme.vue';
import { useCartStore } from '../stores/cart';
import axios from 'axios';
import { ref } from 'vue';

export default {
  components: {
    CarrinhoDrawer,
    FilmeCard,
    SinopseFilme
  },
  data() {
    return {
      mostrarSinopse: false,
      filmeEscolhido: null,
      mostrarCarrinho: false
    };
  },
  setup() {
    const cartStore = useCartStore();
    const movies = ref([]);

    const addCarrinho = (movie) => {
      cartStore.adicionarCarrinho(movie);
    };

    const removerDoCarrinho = (item) => {
      cartStore.removerDoCarrinho(item);
    };

    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: 'd9d668175947b1be1e71ca9ca68f6022',
            language: 'pt-BR',
          },
        });
        movies.value = response.data.results;
      } catch (error) {
        console.error('Algo deu errado!', error)
      }
    };

    fetchMovies();

    return {
      movies,
      cartStore,
      fetchMovies,
      addCarrinho,
      removerDoCarrinho
    };
  },
  mounted() {
    this.fetchMovies()
  },
  methods: {
    abrirSinopse(movie) {
      this.filmeEscolhido = movie;
      this.mostrarSinopse = true
    },
    fecharSinopse() {
      this.mostrarSinopse = false
    },
    logout() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>

  .container {
    margin-top: -40px;
    background-color: cadetblue;
 
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-texto {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .logout-btn {
    margin-left: auto;
  }
</style>