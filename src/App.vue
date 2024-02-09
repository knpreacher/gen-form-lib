<script setup lang="ts">

import GenericForm from "./components/GenericForm.vue";
import {GenericFormData} from "./models";

const formData: GenericFormData = {
  groupsDefaults: {
    useSeparator: true,
    // icon: 'home',
  },
  fieldDefaults: {
    inputProps: {
      outlined: true,
      dense: true,
    }
  },
  fieldGroups: [
    {
      label: "kek",
      defaultGridProps: {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 4,
        xl: 3,
      },
      gutter: "sm",
      fields: [
        {
          dataKey: 'test1',
          dataType: 'string',
        },
        {
          dataKey: 'test2',
          dataType: 'int',
          inputProps: {
            label: 'kek',
            placeholder: '11223123'

          }
        }
      ]
    }
  ]
}
// import {GenericForm, createForm} from "gen-form-lib"
</script>

<template>
  <generic-form :form-data="formData"/>
</template>

<style scoped>

</style>
