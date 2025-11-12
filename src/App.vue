<template>
  <div class="head">
    <h1>Расчёт досок</h1>
  </div>

  <div class="content">
    <BForm @submit="onSubmit" />
    
    <ResultTable 
      v-if="result" 
      :data="result"
      @close="result = null"
    />
  </div>
</template>

<script>
import Button from "primevue/button"
import BForm from './components/BoardsForm.vue';
import ResultTable from './components/ResultTable.vue';
import { calculateOptimalCut } from './utils.js';

export default {
  name: 'App',
  components: {
    BForm,
    ResultTable,
    Button
  },
  data() {
    return {
      result: null,
    }
  },
  methods: {
    onSubmit({ baseBoardSize, boards }) {
      
      const preparedItems = boards.map((board, idx) => ({
        name: `#${idx + 1}`,
        size: board.size + board.gash,
        quantity: board.count
      }))

      this.result = calculateOptimalCut(baseBoardSize, preparedItems)
    }
  },
  
}
</script>