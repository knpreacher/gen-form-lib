<script setup lang="ts">

import GenericForm from "./components/GenericForm.vue";
import {ApiObjectGenericFormFieldData, GenericFormData} from "./models";

const formData: GenericFormData = {
  groupsDefaults: {
    useSeparator: true,
    gutter: "sm",
    defaultGridProps: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 4,
      xl: 3,
    },
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
    },
    {
      label: "lol",
      fields: [
        {
          dataKey: 'api_t',
          dataType: 'api_object',
          fetchOptions: {
            fetchItemsGetter: res => res.results,
            fetchCountGetter: res => res.count,
            fetchFuncGetter: (offset, limit) => {
              return new Promise(resolve => {
                fetch(
                    `http://127.0.0.1:8008/ru/api/v1/c_data/material?offset=${offset}&limit=${limit}`,
                    {
                      method: 'get',
                      headers: {
                        'ContentType': 'application/json'
                      }
                    }
                ).then(resp => {
                  resp.json().then(resolve)
                })
              })
            }
            // fetchItemsGetter: res => {}
          }
        }
      ]
    }
  ]
}

// fetch(
//     "http://127.0.0.1:8008/ru/api/v1/c_data/material?limit=20",
//     {
//       method: 'get',
//       headers: {
//         'ContentType': 'application/json'
//       }
//     }
// ).then(resp => {
//   console.log(resp.json().then(data => {
//     console.log(data)
//   }))
// })
// import {GenericForm, createForm} from "gen-form-lib"
</script>

<template>
  <generic-form :form-data="formData"/>
</template>

<style scoped>

</style>
