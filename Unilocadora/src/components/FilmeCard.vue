<template>
    <q-card class="q-card" :key="movie.id" style="margin-bottom: 30px;">
          <img :src="getPoster(movie.poster_path)" alt="Poster do Filme" class="poster-filme" />
          <p class="titulo-filme">{{ movie.title }}</p>
          <p class="filme-preco"> Preço do aluguel: R$: 9,99</p>
          <q-btn @click="abrirSinopse(movie)" label="Sinopse" padding="xs lg" class="full-width"/>
          <q-btn @click="addCarrinho(movie)" label="Adicionar ao carrinho" padding="xs lg" class="full-width"/>
    </q-card>
</template>

<script>
    export default {
        props: {
            movie: Object
        },
        methods: {
            abrirSinopse(movie) {
                this.$emit('abrirSinopse', movie)
            },
            addCarrinho(movie) {
                this.$emit('addCarrinho', movie)
            },
            getPoster(posterPath) {
                if (posterPath) {
                    return `https://image.tmdb.org/t/p/w200${posterPath}`;
                 }
            }
        }
    }

</script>

<style scoped>
.q-card {
  max-width: 300px;
  max-height: 650px;
  margin: 0 auto;
  border-radius: 8px;
}

.titulo-filme {
  text-align: center;
  font-size: 20px;
}

.filme-preco {
  margin-bottom: 15px;
  text-align: center;
}

.full-width {
  width: 100%;
}
</style>