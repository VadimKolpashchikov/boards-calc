<template>
  <Dialog v-model:visible="visible" modal header="Результаты результатики" :style="{ width: '80%' }">

    <h4 class="mb-3">Всего нужно <b>{{ data.length }} шт.</b></h4>

    <DataTable :value="data" tableStyle="min-width: 50rem">
      <Column header="#">
        <template #body="{ index }">Доска {{ index + 1 }}</template>
      </Column>

      <Column field="boardUsage" header="Используется, см"></Column>

      <Column field="waste" header="Остаток, см"></Column>

      <Column field="itemsOnBoard" header="Изделия"></Column>
    </DataTable>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from "primevue/button"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: 'ResultTable',
  components: {
    Dialog,
    Button,
    DataTable,
    Column,
  },
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
  computed: {
    visible: {
      get() {
        return !!this.data
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>
