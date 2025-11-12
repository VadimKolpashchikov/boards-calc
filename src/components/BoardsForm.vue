<template>
  <Form>
    <div class="buttons">
      <Button @click="submit" severity="success" label="Рассчитать" />
      <Button @click="addBoard" severity="info">+ Добавить доску</Button>
      <Button @click="clear" severity="danger">Очистить</Button>
    </div>

    <div class="controls-wrap">
      <label class="form-group">
        <span>Базовая доска, размер см.</span>
        <InputNumber v-model="baseBoardSize" mode="decimal" showButtons :min="0" fluid />
      </label>

      <div class="divider"></div>

      <div class="table">
        <DataTable :value="boards" tableStyle="min-width: 50rem" >
        <Column header="#">
          <template #body="{ index }">#{{ index + 1 }}</template>
        </Column>
        <Column field="size" header="Размер, см">
          <template #body="{ data }">
            <InputNumber v-model="data.size" mode="decimal" showButtons :min="0" fluid />
          </template>
        </Column>
        <Column field="count" header="Количество, шт">
          <template #body="{ data }">
            <InputNumber v-model="data.count" mode="decimal" showButtons :min="0" fluid />
          </template>
        </Column>
        <Column header="надрез, см">
          <template #body="{ data }">
            <InputNumber v-model="data.gash" mode="decimal" showButtons :min="0" fluid />
          </template>
        </Column>
        <Column header="Действия">
          <template #body="{ data }">
            <Button @click="deleteBoard(data.id)" severity="danger">Del</Button>
            <Button @click="copyBoard(data)" severity="help" class="ml-1">Copy</Button>
          </template>
        </Column>
      </DataTable>
      </div>
    </div>
  </Form>
</template>

<script>
import { Form } from '@primevue/forms';
import InputNumber from 'primevue/inputnumber';
import Button from "primevue/button"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: 'BoardsForm',
  components: {
    Form,
    Button,
    InputNumber,
    DataTable,
    Column,
  },
  data() {
    return {
      baseBoardSize: 600,
      boards: [{
        id: Date.now(),
        size: 10,
        count: 1,
        gash: 0,
      }],
    }
  },
  methods: {
    addBoard() {
      this.boards.push({
        id: Date.now(),
        size: 10,
        count: 1,
        gash: 0,
      })
    },
    deleteBoard(id) {
      this.boards = this.boards.filter((board) => id !== board.id)
    },
    copyBoard(data) {
      this.boards.push({
        ...data,
        id: Date.now(),
      })
    },
    clear() {
      this.boards = [];
    },
    submit() {
      this.$emit('submit', {
        baseBoardSize: this.baseBoardSize,
        boards: this.boards,
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form-group {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 8px;
  align-items: center;

  span {
    font-size: 20px;
  }
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.controls-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
}

.divider {
  width: 100%;
  border-bottom: 1px solid rgb(131, 119, 119);
}

.table {
  max-height: 100%;
}
</style>
